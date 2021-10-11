import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  NgbActiveModal,
  NgbModal,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MODAL_CONFIG } from './constants';
import { Product } from './models/product/product.model';
import { FormActionMode } from './models/utils/form-action-mode.model';
import { UtilsService } from './services/utils.service';
import { AppState } from './store/app.state';
import {
  AddProduct,
  GetAllProducts,
  RemoveProduct,
  UpdateProduct,
} from './store/products.actions';
import {
  errorMessage,
  getAllProducts,
  getCreateError,
  getDeleteError,
  getProductsError,
  getUpdateError,
  isCreated,
  isDeleted,
  isDone,
  isUpdated,
} from './store/products.reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [NgbActiveModal],
})
export class AppComponent implements OnInit {
  title = 'angular-crud-product';
  products: Observable<Product[]>;
  isLoading: Observable<boolean>;
  error?: string;
  isToastShown: boolean = false;
  modalReference: NgbModalRef;
  productForm = this.fb.group({
    id: [null],
    name: [
      null,
      [Validators.required, Validators.minLength(2), Validators.maxLength(40)],
    ],
    price: ['', [Validators.required]],
    madeInCountry: [
      null,
      [Validators.required, Validators.minLength(2), Validators.maxLength(40)],
    ],
    isInStock: [false],
    createdDate: [null],
  });

  get name() {
    return this.productForm.get('name');
  }
  get price() {
    return this.productForm.get('price');
  }
  get madeInCountry() {
    return this.productForm.get('madeInCountry');
  }

  formActionMode: FormActionMode = 'save';

  constructor(
    private fb: FormBuilder,
    private utilsService: UtilsService,
    private store: Store<AppState>,
    public closeModalService: NgbActiveModal,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new GetAllProducts());
    this.products = this.store.select(getAllProducts);
    this.isLoading = this.store.select(isDone);
    this.store.select(errorMessage).subscribe((error) => (this.error = error));

    // subscriptions when success or error action
    this.store
      .select(getProductsError)
      .subscribe((error) => this.utilsService.loadingError(error));

    // DELETE
    this.store
      .select(isDeleted)
      .pipe(filter((done) => done))
      .subscribe((done) => (this.isToastShown = true));

    this.store
      .select(getDeleteError)
      .pipe(filter((error) => !!error))
      .subscribe((error) => {
        this.isToastShown = true;
      });

    // UPDATE
    this.store
      .select(isUpdated)
      .pipe(filter((done) => done))
      .subscribe((done) => {
        this.productForm.reset();
        this.closeModal();
        this.isToastShown = true;
      });
    this.store
      .select(getUpdateError)
      .pipe(filter((error) => !!error))
      .subscribe((error) => {
        this.isToastShown = true;
      });

    // CREATE
    this.store
      .select(isCreated)
      .pipe(filter((done) => done))
      .subscribe((done) => {
        this.productForm.reset();
        this.closeModal();
        this.isToastShown = true;
      });
    this.store
      .select(getCreateError)
      .pipe(filter((error) => !!error))
      .subscribe((error) => {
        this.isToastShown = true;
      });
  }

  saveClick() {
    if (this.formActionMode === 'save') {
      this.store.dispatch(
        new AddProduct({
          ...this.productForm.value,
          createdDate: new Date(),
        })
      );
    } else if (this.formActionMode === 'update') {
      this.store.dispatch(
        new UpdateProduct({
          ...this.productForm.value,
          modifiedDate: new Date(),
        })
      );
    }
  }

  openModalForUpdate(content: any, product: Product) {
    this.formActionMode = 'update';
    const { id, name, price, madeInCountry, isInStock, createdDate } = product;
    this.productForm.setValue({
      id,
      name,
      price,
      madeInCountry,
      isInStock,
      createdDate,
    });
    this.modalReference = this.modalService.open(content, MODAL_CONFIG);
  }

  openModalForCreate(content: any) {
    this.formActionMode = 'save';
    this.modalReference = this.modalService.open(content, MODAL_CONFIG);
  }

  closeModal() {
    this.modalReference.close();
  }

  deleteProduct(id: number) {
    this.store.dispatch(new RemoveProduct(id));
  }
}

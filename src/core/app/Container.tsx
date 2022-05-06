import { createContainer, asClass } from 'awilix';
// App
import { AppBloc } from '@core/app/AppBloc';
import { ModalBloc } from '@core/components/modal/ModalBloc';
import { NotificationBarBloc } from '@core/components/notification-bar/NotificationBarBloc';
// User
import { UserBloc } from '@core/user/presentation/UserBloc';
import UserApiRepository from '@core/user/data/UserApiRepository';
import SignInUseCase from '@core/user/domain/usecases/SignInUseCase';
import SignUpUseCase from '@core/user/domain/usecases/SignUpUseCase';
import SignOutUseCase from '@core/user/domain/usecases/SignOutUseCase';
import GetCredentialsUserCase from '@core/user/domain/usecases/GetCredentialsUserCase';
// Cart
import Cart from '@core/cart/domain/Cart';
import { CartBloc } from '@core/cart/presentation/CartBloc';
import CartApiRepository from '@core/cart/data/CartApiRepository';
import AddProductToCartUseCase from '@core/cart/domain/usecases/AddProductToCartUseCase';
import UpdateProductToCartUseCase from '@core/cart/domain/usecases/UpdateProductToCartUseCase';
import EditQuantityOfCartItemUseCase from '@core/cart/domain/usecases/EditQuantityOfCartItemUseCase';
import GetCartUseCase from '@core/cart/domain/usecases/GetCartUseCase';
import RemoveItemFromCartUseCase from '@core/cart/domain/usecases/RemoveItemFromCartUseCase';
import PaidCartUseCase from '@core/cart/domain/usecases/PaidCartUseCase';
import CreateCheckoutSession from '@core/cart/domain/usecases/CreateCheckoutSessionUseCase';
// Product
import { ProductBloc } from '@core/product/presentation/ProductBloc';
import ProductApiRepository from '@core/product/data/ProductApiRepository';
import GetProductsUseCase from '@core/product/domain/GetProductsUseCase';
// Services
import Http from '@core/services/Http';
import Response from '@core/services/Response';
// Utils
import { HistoryHandlerUtils } from '@core/utils/';

interface ContainerInterface {
  // App
  AppBloc: AppBloc;
  ModalBloc: ModalBloc;
  NotificationBarBloc: NotificationBarBloc;
  // User
  UserBloc: UserBloc;
  UserRepository: UserApiRepository;
  SignInUseCase: SignInUseCase;
  SignUpUseCase: SignUpUseCase;
  SignOutUseCase: SignOutUseCase;
  GetCredentialsUserCase: GetCredentialsUserCase;
  // Cart
  Cart: Cart;
  CartBloc: CartBloc;
  CartRepository: CartApiRepository;
  AddProductToCartUseCase: AddProductToCartUseCase;
  UpdateProductToCartUseCase: UpdateProductToCartUseCase;
  EditQuantityOfCartItemUseCase: EditQuantityOfCartItemUseCase;
  GetCartUseCase: GetCartUseCase;
  RemoveItemFromCartUseCase: RemoveItemFromCartUseCase;
  PaidCartUseCase: PaidCartUseCase;
  CreateCheckoutSession: CreateCheckoutSession;
  // Product
  ProductBloc: ProductBloc;
  ProductRepository: ProductApiRepository;
  GetProductsUseCase: GetProductsUseCase;
  // Services
  Http: Http;
  Response: Response;
  // Utils
  HistoryHandlerUtils: HistoryHandlerUtils;
}

// Create the container
const container = createContainer<ContainerInterface>();

// Register the classes
container
  .register({
    // App
    AppBloc: asClass(AppBloc).singleton(),
    ModalBloc: asClass(ModalBloc).singleton(),
    NotificationBarBloc: asClass(NotificationBarBloc).singleton()
  })
  .register({
    // User
    UserBloc: asClass(UserBloc).singleton(),
    UserRepository: asClass(UserApiRepository).singleton(),
    SignInUseCase: asClass(SignInUseCase).singleton(),
    SignUpUseCase: asClass(SignUpUseCase).singleton(),
    SignOutUseCase: asClass(SignOutUseCase).singleton(),
    GetCredentialsUserCase: asClass(GetCredentialsUserCase).singleton()
  })
  .register({
    // Cart
    Cart: asClass(Cart).singleton(),
    CartBloc: asClass(CartBloc).singleton(),
    CartRepository: asClass(CartApiRepository).singleton(),
    AddProductToCartUseCase: asClass(AddProductToCartUseCase).singleton(),
    UpdateProductToCartUseCase: asClass(UpdateProductToCartUseCase).singleton(),
    EditQuantityOfCartItemUseCase: asClass(
      EditQuantityOfCartItemUseCase
    ).singleton(),
    GetCartUseCase: asClass(GetCartUseCase).singleton(),
    RemoveItemFromCartUseCase: asClass(RemoveItemFromCartUseCase).singleton(),
    PaidCartUseCase: asClass(PaidCartUseCase).singleton(),
    CreateCheckoutSession: asClass(CreateCheckoutSession).singleton()
  })
  .register({
    // Product
    ProductBloc: asClass(ProductBloc).singleton(),
    ProductRepository: asClass(ProductApiRepository).singleton(),
    GetProductsUseCase: asClass(GetProductsUseCase).singleton()
  })
  .register({
    // Services
    Http: asClass(Http).singleton(),
    Response: asClass(Response).singleton()
  })
  .register({
    // Utils
    HistoryHandlerUtils: asClass(HistoryHandlerUtils).singleton()
  });

export default container;

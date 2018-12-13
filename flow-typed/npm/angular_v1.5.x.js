// flow-typed signature: d27f045262809aeea90a7dadeb395775
// flow-typed version: 45acb9a3f7/angular_v1.5.x/flow_>=v0.47.x

/**
 * Credit to @faceleg for some of the typedefs seen here:
 * https://github.com/solnet-aquarium/flow-interfaces-angular/blob/master/interfaces/angular.js
 */

declare module angular {
  // NOTE: if you don't use named scope bindings, remove string type in the end
  // for stricter types
  declare type ScopeBindings = "<" | "=" | "&" | "<?" | "=?" | "&?" | string;
  declare type Scope = { [key: string]: ScopeBindings };
  declare type ControllerFunction = (...a: Array<*>) => void;

  // I'm not sure how represent this properly: Angular DI declarations are a
  // list of strings with a single function at the end. The function can vary,
  // so it is a type param.
  //
  // NOTE: if you use compile step to mangle array, replace below with
  // declare type $npm$angular$DependencyInjection<T> = T
  declare type $npm$angular$DependencyInjection<T> = Array<string | T> | Function;

  // Extending Array<Element> allows us to do the `jq[0]` expression and friends
  // to get the actual underlying Element.
  // TODO: This is supposed to be interchangeable with JQuery. Can we possibly
  // check to see if JQuery's types are already defined?
  declare interface JqliteElement extends Array<Element> {
    remove: () => JqliteElement;
    contents: () => JqliteElement;
    injector: Function;
  }

  declare type AngularLinkFunction = (
    scope: $Scope<*>,
    element: JqliteElement,
    attrs: mixed,
    controller: mixed
  ) => void;

  declare type AngularCompileLink = {
    post?: AngularLinkFunction,
    pre?: AngularLinkFunction
  };

  declare function bootstrap(
	element: string|HTMLElement,
	modules?: Array<string|Function|any[]>,
	config?: any
  ): any;

  // TODO: Attrs and controller should be properly typed.
  declare function CompileFunction(
    element: JqliteElement,
    attrs: mixed,
    controller: ControllerFunction
  ): AngularLinkFunction;

  // TODO: Expand to cover the whole matrix of AECM, in any order. Probably
  // should write something to handle it.
  declare type DirectiveRestrict = "A" | "E" | "AE" | "EA";
  declare type Directive = {|
	restrict?: DirectiveRestrict,
	replace?: boolean,
    template?: string,
    templateUrl?: string,
    scope?: Scope,
    controller?: ControllerFunction,
    link?: AngularLinkFunction,
    controllerAs?: string,
    bindToController?: boolean,
    // TODO: flesh out this definition
    compile?: (...a: any) => AngularCompileLink
  |};

  declare type DirectiveDeclaration = (
    name: string,
    di: $npm$angular$DependencyInjection<(...a: Array<*>) => Directive>
  ) => AngularModule;

  declare type Component = {|
    bindings?: Scope,
    template?: string,
    templateUrl?: string,
    controllerAs?: string,
    controller?: $npm$angular$DependencyInjection<
      Class<*> | ControllerFunction
    >,
    transclude?: boolean
  |};

  declare type ComponentDeclaration = (
    name: string,
    component: Component
  ) => AngularModule;

  declare type ControllerDeclaration = (
    name: string,
    di: $npm$angular$DependencyInjection<ControllerFunction>
  ) => AngularModule;

  declare type ConfigDeclaration = (
    di: $npm$angular$DependencyInjection<(...a: Array<*>) => void>
  ) => AngularModule;

  declare type FactoryDeclaration = (
    name: string,
    di: $npm$angular$DependencyInjection<Object>
  ) => AngularModule;

  declare type FilterDeclaration = (
    name: string,
    di: $npm$angular$DependencyInjection<Function>
  ) => AngularModule;

  declare type ServiceDeclaration = (
    name: string,
    di: $npm$angular$DependencyInjection<Function | Object>
  ) => AngularModule;

  declare type RunDeclaration = (
    fn: $npm$angular$DependencyInjection<(...a: Array<*>) => void>
  ) => AngularModule;

  declare type ValueDeclaration = (name: string, value: mixed) => AngularModule;

  declare type ConstantDeclaration = (
    name: string,
    value: mixed
  ) => AngularModule;

  declare type AngularModule = {|
    controller: ControllerDeclaration,
    component: ComponentDeclaration,
    directive: DirectiveDeclaration,
    run: RunDeclaration,
    config: ConfigDeclaration,
    factory: FactoryDeclaration,
    filter: FilterDeclaration,
    service: ServiceDeclaration,
    value: ValueDeclaration,
    constant: ConstantDeclaration,
    name: string
  |};

  declare type Dependency = AngularModule | string;

  declare function module(
    name: string,
    deps?: ?Array<Dependency>
  ): AngularModule;

  declare function element(html: string | Element | Document): JqliteElement;
  declare function copy<T>(object: T): T;
  declare function extend<A, B>(a: A, b: B): A & B;
  declare function extend<A, B, C>(a: A, b: B, c: C): A & B & C;
  declare function extend<A, B, C, D>(a: A, b: B, c: C, d: D): A & B & C & D;
  declare function extend<A, B, C, D, E>(
    a: A,
    b: B,
    c: C,
    d: D,
    e: E
  ): A & B & C & D & E;

  declare function forEach<T>(
    obj: Object,
    iterator: (value: T, key: string) => void
  ): void;
  declare function forEach<T>(
    obj: Array<T>,
    iterator: (value: T, key: number) => void
  ): void;
  declare function fromJson(json: string): Object | Array<*> | string | number;
  declare function toJson(
    obj: Object | Array<any> | string | Date | number | boolean,
    pretty?: boolean | number
  ): string;
  declare function isDefined(val: any): boolean;
  declare function isArray(value: Array<any>): true;
  declare function isArray(value: any): false;
  declare function noop(): void;
  declare type AngularQ = {
    when: <T>(value: T) => AngularPromise<T>
  };

  declare type AngularPromise<T> = {
    then: <U>(a: (resolve: U) => T) => AngularPromise<*>,
    catch: <U>(a: (e: Error) => U) => AngularPromise<*>,
    finally: <U>(a: (result: U | typeof Error) => T) => AngularPromise<*>
  };

  //****************************************************************************
  // Angular testing tools
  //****************************************************************************

  declare type AngularMock = {
    inject: (...a: Array<*>) => Function,
    module: (...a: Array<string | Function | Object>) => () => void
  };
  declare var mock: AngularMock;

  declare type StateProviderParams = {
    url?: string,
    abstract?: boolean,
    params?: Object,
    views?: Object,
    data?: Object,
    templateUrl?: string,
    template?: string,
    controller?: string | ControllerFunction,
    resolve?: Object
  };

  declare type $StateProvider = {
    state: (name: string, conf: StateProviderParams) => $StateProvider
  };

  //----------------------------------------------------------------------------
  // Service specific stuff
  //----------------------------------------------------------------------------

  declare type AngularHttpService = {
	get: AngularHttpGet<*>;
    post: AngularHttpPost<*>;
  };

  declare type AngularHttpGet<T> = (
	  url: string
  ) => AngularPromise<T>

  declare type AngularHttpPost<T> = (
    url: string,
    data: mixed
  ) => AngularPromise<T>;

  declare type AngularResourceResult<T> = {
    $promise: AngularPromise<T>
  };

  declare type AngularResource = {
    get: <T>(options?: Object, callback?: Function) => AngularResourceResult<T>
  };

  declare function AngularResourceFactory(
    url: string,
    defaultParams?: Object,
    actions?: Object,
    options?: Object
  ): AngularResource;

  declare function AngularCompileService(a: JqliteElement): JqliteElement;

  declare type WatchExpression<T> = string | ((scope: $Scope<T>) => any);
  declare type EvalExpression = string | (() => void);
  declare type ApplyExpression = string | (() => void);
  declare type Listener<T> = (
    newValue: *,
    oldValue: *,
    $scope: $Scope<T>
  ) => any;

  declare type _Watch1<T> = (
    expression: WatchExpression<T>,
    listener: Listener<T>,
    objectEquality?: boolean
  ) => () => void;
  declare type _Watch2<T> = (
    listener: Listener<T>,
    objectEquality?: boolean
  ) => () => void;

  declare type $Scope<T: Object> = {|
    $new(isolate: boolean, parent: $Scope<T>): $Scope<T>,
    $watch: _Watch1<T> & _Watch2<T>,
    $watchGroup(
      expressions: Array<WatchExpression<T>>,
      listener: Listener<T>
    ): () => void,
    $watchCollection(
      expression: WatchExpression<T>,
      listener: Listener<T>
    ): () => void,
    $digest(): void,
    $destroy(): void,
    $eval(expression: EvalExpression, locals?: Object): void,
    $evalAsync(expression: EvalExpression, locals?: Object): void,
    $apply(expression?: ApplyExpression): void,
    $applyAsync(expression?: ApplyExpression): void,
    $on(name: string, listener: (event: *, ...Array<*>) => void): () => void,
    $emit(name: string, ...Array<*>): void,
    $broadcast(name: string, ...Array<*>): void,

    $$postDigest(cb: () => void): void,

    $id: string,
    $parent: $Scope<*>,
    $root: $Scope<*>
  |} & T;

  declare type $Timeout = (
    fn?: Function,
    delay?: number,
    invokeApply?: boolean,
    additionalParams?: *
  ) => AngularPromise<*>;

  declare type $Log = {
	log(...Array<*>): void;
	info(...Array<*>): void;
	warn(...Array<*>): void;
	error(...Array<*>): void;
	debug(...Array<*>): void;
  }

  declare type $Location = {
	absUrl(): string;
	url(url?: string): string;
	protocol(): string;
	host(): string;
	port(): number;
	path(path: string|number): string|Object;
	search(search:any, paramValue?: string|number|Array<string>|boolean): Object;
	hash(hash: string|number): string;
	replace(): void;
	state(state?: Object): Object;
  }
  declare type CompiledExpression = (context: Object, locals: Object) => string;
  declare type $Sce = {
	isEnabled(): boolean;
	parseAs(type: string, expression: string): CompiledExpression;
	trustAs<T>(type: string, value: T): T;
	trustAsHtml<T>(value: T): T;
	trustAsCss<T>(value: T): T;
	trustAsUrl<T>(value: T): T;
	trustAsResourceUrl<T>(value: T): T;
	trustAsJs<T>(value: T): T;
	getTrusted<T>(type: string, maybeTrusted: T): T;
	getTrustedHtml<T>(value: T): T;
	getTrustedCss<T>(value: T): T;
	getTrustedUrl<T>(value: T): T;
	getTrustedResourceUrl<T>(value: T): T;
	getTrustedJs<T>(value: T): T;
	parseAsHtml(expression: string): CompiledExpression;
	parseAsCss(expression: string): CompiledExpression;
	parseAsUrl(expression: string): CompiledExpression;
	parseAsResourceUrl(expression: string): CompiledExpression;
	parseAsJs(expression: string): CompiledExpression;
  }

  declare type $Http = AngularHttpService;

  declare type $Filter = (name: string) => Function;
}
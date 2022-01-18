/** A window containing a DOM document; the document property points to the DOM document loaded in that window. */
// @ts-expect-error TS2320
export interface Window extends EventTarget, AnimationFrameProvider, GlobalEventHandlers, WindowEventHandlers, WindowLocalStorage, WindowOrWorkerGlobalScope, WindowSessionStorage {
    /** @deprecated This is a legacy alias of `navigator`. */
    readonly clientInformation: Navigator;
    /** Returns true if the window has been closed, false otherwise. */
    readonly closed: boolean;
    /** Defines a new custom element, mapping the given name to the given constructor as an autonomous custom element. */
    readonly customElements: CustomElementRegistry;
    readonly devicePixelRatio: number;
    readonly document: Document;
    /** @deprecated */
    readonly event: Event | undefined;
    /** @deprecated */
    readonly external: External;
    readonly frameElement: Element | null;
    readonly frames: WindowProxy;
    readonly history: History;
    readonly innerHeight: number;
    readonly innerWidth: number;
    readonly length: number;
}

/** Any web page loaded in the browser and serves as an entry point into the web page's content, which is the DOM tree. */
// @ts-expect-error TS2320
export interface Document extends HTMLElement, Node, DocumentAndElementEventHandlers, DocumentOrShadowRoot, FontFaceSource, GlobalEventHandlers, NonElementParentNode, ParentNode, XPathEvaluatorBase {
    /** Sets or gets the URL for the current document. */
    readonly URL: string;
    /**
     * Sets or gets the color of all active links in the document.
     * @deprecated
     */
    alinkColor: string;
    /**
     * Returns a reference to the collection of elements contained by the object.
     * @deprecated
     */
    readonly all: HTMLAllCollection;
    /**
     * Retrieves a collection of all a objects that have a name and/or id property. Objects in this collection are in HTML source order.
     * @deprecated
     */
    readonly anchors: HTMLCollectionOf<HTMLAnchorElement>;
    /**
     * Retrieves a collection of all applet objects in the document.
     * @deprecated
     */
    readonly applets: HTMLCollection;
    /**
     * Deprecated. Sets or retrieves a value that indicates the background color behind the object.
     * @deprecated
     */
    bgColor: string;
    /** Specifies the beginning and end of the document body. */
    body: HTMLElement;
    /** Returns document's encoding. */
    readonly characterSet: string;
    /**
     * Gets or sets the character set used to encode the object.
     * @deprecated This is a legacy alias of `characterSet`.
     */
    readonly charset: string;
    /** Gets a value that indicates whether standards-compliant mode is switched on for the object. */
    readonly compatMode: string;
    /** Returns document's content type. */
    readonly contentType: string;
    /**
     * Returns the HTTP cookies that apply to the Document. If there are no cookies or cookies can't be applied to this resource, the empty string will be returned.
     *
     * Can be set, to add a new cookie to the element's set of HTTP cookies.
     *
     * If the contents are sandboxed into a unique origin (e.g. in an iframe with the sandbox attribute), a "SecurityError" DOMException will be thrown on getting and setting.
     */
    cookie: string;
    /**
     * Returns the script element, or the SVG script element, that is currently executing, as long as the element represents a classic script. In the case of reentrant script execution, returns the one that most recently started executing amongst those that have not yet finished executing.
     *
     * Returns null if the Document is not currently executing a script or SVG script element (e.g., because the running script is an event handler, or a timeout), or if the currently executing script or SVG script element represents a module script.
     */
    readonly currentScript: HTMLOrSVGScriptElement | null;
    /** Returns the Window object of the active document. */
    readonly defaultView: (WindowProxy & typeof globalThis) | null;
    /** Sets or gets a value that indicates whether the document can be edited. */
    designMode: string;
    /** Sets or retrieves a value that indicates the reading order of the object. */
    dir: string;
    /** Gets an object representing the document type declaration associated with the current document. */
    readonly doctype: DocumentType | null;
    /** Gets a reference to the root node of the document. */
    readonly documentElement: HTMLElement;
    /** Returns document's URL. */
    readonly documentURI: string;
    /** Sets or gets the security domain of the document. */
    domain: string;
    /** Retrieves a collection of all embed objects in the document. */
    readonly embeds: HTMLCollectionOf<HTMLEmbedElement>;
    /**
     * Sets or gets the foreground (text) color of the document.
     * @deprecated
     */
    fgColor: string;
    /** Retrieves a collection, in source order, of all form objects in the document. */
    readonly forms: HTMLCollectionOf<HTMLFormElement>;
    /** @deprecated */
    readonly fullscreen: boolean;
    /** Returns true if document has the ability to display elements fullscreen and fullscreen is supported, or false otherwise. */
    readonly fullscreenEnabled: boolean;
    /** Returns the head element. */
    readonly head: HTMLHeadElement;
    readonly hidden: boolean;
    /** Retrieves a collection, in source order, of img objects in the document. */
    readonly images: HTMLCollectionOf<HTMLImageElement>;
    /** Gets the implementation object of the current document. */
    readonly implementation: DOMImplementation;
    /**
     * Returns the character encoding used to create the webpage that is loaded into the document object.
     * @deprecated This is a legacy alias of `characterSet`.
     */
    readonly inputEncoding: string;
    /** Gets the date that the page was last modified, if the page supplies one. */
    readonly lastModified: string;
    /**
     * Sets or gets the color of the document links.
     * @deprecated
     */
    linkColor: string;
    /** Retrieves a collection of all a objects that specify the href property and all area objects in the document. */
    readonly links: HTMLCollectionOf<HTMLAnchorElement | HTMLAreaElement>;
}

/** The state and the identity of the user agent. It allows scripts to query it and to register themselves to carry on some activities. */
export interface Navigator extends NavigatorAutomationInformation, NavigatorConcurrentHardware, NavigatorContentUtils, NavigatorCookies, NavigatorID, NavigatorLanguage, NavigatorNetworkInformation, NavigatorOnLine, NavigatorPlugins, NavigatorStorage {
    /** Available only in secure contexts. */
    readonly clipboard: Clipboard;
    /** Available only in secure contexts. */
    readonly credentials: CredentialsContainer;
    readonly doNotTrack: string | null;
    readonly geolocation: Geolocation;
    readonly maxTouchPoints: number;
    readonly mediaCapabilities: MediaCapabilities;
    /** Available only in secure contexts. */
    readonly mediaDevices: MediaDevices;
    readonly mediaSession: MediaSession;
    readonly permissions: Permissions;
    /** Available only in secure contexts. */
    readonly serviceWorker: ServiceWorkerContainer;
    /** Available only in secure contexts. */
    canShare(data?: ShareData): boolean;
    getGamepads(): (Gamepad | null)[];
    /** Available only in secure contexts. */
    requestMediaKeySystemAccess(keySystem: string, supportedConfigurations: MediaKeySystemConfiguration[]): Promise<MediaKeySystemAccess>;
    sendBeacon(url: string | URL, data?: BodyInit | null): boolean;
    /** Available only in secure contexts. */
    share(data?: ShareData): Promise<void>;
    vibrate(pattern: VibratePattern): boolean;
}

/** EventTarget is a DOM interface implemented by objects that can receive events and may have listeners for them. */
export interface EventTarget {
    /**
     * Appends an event listener for events whose type attribute value is type. The callback argument sets the callback that will be invoked when the event is dispatched.
     *
     * The options argument sets listener-specific options. For compatibility this can be a boolean, in which case the method behaves exactly as if the value was specified as options's capture.
     *
     * When set to true, options's capture prevents callback from being invoked when the event's eventPhase attribute value is BUBBLING_PHASE. When false (or not present), callback will not be invoked when event's eventPhase attribute value is CAPTURING_PHASE. Either way, callback will be invoked if event's eventPhase attribute value is AT_TARGET.
     *
     * When set to true, options's passive indicates that the callback will not cancel the event by invoking preventDefault(). This is used to enable performance optimizations described in § 2.8 Observing event listeners.
     *
     * When set to true, options's once indicates that the callback will only be invoked once after which the event listener will be removed.
     *
     * If an AbortSignal is passed for options's signal, then the event listener will be removed when signal is aborted.
     *
     * The event listener is appended to target's event listener list and is not appended if it has the same type, callback, and capture.
     */
    addEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: AddEventListenerOptions | boolean): void;
    /** Dispatches a synthetic event event to target and returns true if either event's cancelable attribute value is false or its preventDefault() method was not invoked, and false otherwise. */
    dispatchEvent(event: Event): boolean;
    /** Removes the event listener in target's event listener list with the same type, callback, and options. */
    removeEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: EventListenerOptions | boolean): void;
}

export interface AnimationFrameProvider {
    cancelAnimationFrame(handle: number): void;
    requestAnimationFrame(callback: FrameRequestCallback): number;
}

export interface GlobalEventHandlers {
    /**
     * Fires when the user aborts the download.
     * @param ev The event.
     */
    onabort: ((this: GlobalEventHandlers, ev: UIEvent) => any) | null;
    onanimationcancel: ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null;
    onanimationend: ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null;
    onanimationiteration: ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null;
    onanimationstart: ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null;
    onauxclick: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
    /**
     * Fires when the object loses the input focus.
     * @param ev The focus event.
     */
    onblur: ((this: GlobalEventHandlers, ev: FocusEvent) => any) | null;
    /**
     * Occurs when playback is possible, but would require further buffering.
     * @param ev The event.
     */
    oncanplay: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    oncanplaythrough: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Fires when the contents of the object or selection have changed.
     * @param ev The event.
     */
    onchange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Fires when the user clicks the left mouse button on the object
     * @param ev The mouse event.
     */
    onclick: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
    onclose: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Fires when the user clicks the right mouse button in the client area, opening the context menu.
     * @param ev The mouse event.
     */
    oncontextmenu: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
    oncuechange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Fires when the user double-clicks the object.
     * @param ev The mouse event.
     */
    ondblclick: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
    /**
     * Fires on the source object continuously during a drag operation.
     * @param ev The event.
     */
    ondrag: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
    /**
     * Fires on the source object when the user releases the mouse at the close of a drag operation.
     * @param ev The event.
     */
    ondragend: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
    /**
     * Fires on the target element when the user drags the object to a valid drop target.
     * @param ev The drag event.
     */
    ondragenter: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
    /**
     * Fires on the target object when the user moves the mouse out of a valid drop target during a drag operation.
     * @param ev The drag event.
     */
    ondragleave: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
    /**
     * Fires on the target element continuously while the user drags the object over a valid drop target.
     * @param ev The event.
     */
    ondragover: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
    /**
     * Fires on the source object when the user starts to drag a text selection or selected object.
     * @param ev The event.
     */
    ondragstart: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
    ondrop: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
    /**
     * Occurs when the duration attribute is updated.
     * @param ev The event.
     */
    ondurationchange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Occurs when the media element is reset to its initial state.
     * @param ev The event.
     */
    onemptied: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Occurs when the end of playback is reached.
     * @param ev The event
     */
    onended: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Fires when an error occurs during object loading.
     * @param ev The event.
     */
    onerror: OnErrorEventHandler;
    /**
     * Fires when the object receives focus.
     * @param ev The event.
     */
    onfocus: ((this: GlobalEventHandlers, ev: FocusEvent) => any) | null;
    onformdata: ((this: GlobalEventHandlers, ev: FormDataEvent) => any) | null;
    ongotpointercapture: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
    oninput: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    oninvalid: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Fires when the user presses a key.
     * @param ev The keyboard event
     */
    onkeydown: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null;
    /**
     * Fires when the user presses an alphanumeric key.
     * @param ev The event.
     * @deprecated
     */
    onkeypress: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null;
    /**
     * Fires when the user releases a key.
     * @param ev The keyboard event
     */
    onkeyup: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null;
    /**
     * Fires immediately after the browser loads the object.
     * @param ev The event.
     */
    onload: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Occurs when media data is loaded at the current playback position.
     * @param ev The event.
     */
    onloadeddata: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Occurs when the duration and dimensions of the media have been determined.
     * @param ev The event.
     */
    onloadedmetadata: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Occurs when Internet Explorer begins looking for media data.
     * @param ev The event.
     */
    onloadstart: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onlostpointercapture: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
    /**
     * Fires when the user clicks the object with either mouse button.
     * @param ev The mouse event.
     */
    onmousedown: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
    onmouseenter: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
    onmouseleave: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
    /**
     * Fires when the user moves the mouse over the object.
     * @param ev The mouse event.
     */
    onmousemove: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
    /**
     * Fires when the user moves the mouse pointer outside the boundaries of the object.
     * @param ev The mouse event.
     */
    onmouseout: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
    /**
     * Fires when the user moves the mouse pointer into the object.
     * @param ev The mouse event.
     */
    onmouseover: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
    /**
     * Fires when the user releases a mouse button while the mouse is over the object.
     * @param ev The mouse event.
     */
    onmouseup: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
    /**
     * Occurs when playback is paused.
     * @param ev The event.
     */
    onpause: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Occurs when the play method is requested.
     * @param ev The event.
     */
    onplay: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Occurs when the audio or video has started playing.
     * @param ev The event.
     */
    onplaying: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onpointercancel: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
    onpointerdown: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
    onpointerenter: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
    onpointerleave: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
    onpointermove: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
    onpointerout: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
    onpointerover: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
    onpointerup: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
    /**
     * Occurs to indicate progress while downloading media data.
     * @param ev The event.
     */
    onprogress: ((this: GlobalEventHandlers, ev: ProgressEvent) => any) | null;
    /**
     * Occurs when the playback rate is increased or decreased.
     * @param ev The event.
     */
    onratechange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Fires when the user resets a form.
     * @param ev The event.
     */
    onreset: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onresize: ((this: GlobalEventHandlers, ev: UIEvent) => any) | null;
    /**
     * Fires when the user repositions the scroll box in the scroll bar on the object.
     * @param ev The event.
     */
    onscroll: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Occurs when the seek operation ends.
     * @param ev The event.
     */
    onseeked: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Occurs when the current playback position is moved.
     * @param ev The event.
     */
    onseeking: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Fires when the current selection changes.
     * @param ev The event.
     */
    onselect: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onselectionchange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onselectstart: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Occurs when the download has stopped.
     * @param ev The event.
     */
    onstalled: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onsubmit: ((this: GlobalEventHandlers, ev: SubmitEvent) => any) | null;
    /**
     * Occurs if the load operation has been intentionally halted.
     * @param ev The event.
     */
    onsuspend: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Occurs to indicate the current playback position.
     * @param ev The event.
     */
    ontimeupdate: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    ontoggle: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    ontouchcancel?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
    ontouchend?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
    ontouchmove?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
    ontouchstart?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
    ontransitioncancel: ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null;
    ontransitionend: ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null;
    ontransitionrun: ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null;
    ontransitionstart: ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null;
    /**
     * Occurs when the volume is changed, or playback is muted or unmuted.
     * @param ev The event.
     */
    onvolumechange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Occurs when playback stops because the next frame of a video resource is not available.
     * @param ev The event.
     */
    onwaiting: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /** @deprecated This is a legacy alias of `onanimationend`. */
    onwebkitanimationend: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /** @deprecated This is a legacy alias of `onanimationiteration`. */
    onwebkitanimationiteration: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /** @deprecated This is a legacy alias of `onanimationstart`. */
    onwebkitanimationstart: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /** @deprecated This is a legacy alias of `ontransitionend`. */
    onwebkittransitionend: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onwheel: ((this: GlobalEventHandlers, ev: WheelEvent) => any) | null;
    addEventListener<K extends keyof GlobalEventHandlersEventMap>(type: K, listener: (this: GlobalEventHandlers, ev: GlobalEventHandlersEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof GlobalEventHandlersEventMap>(type: K, listener: (this: GlobalEventHandlers, ev: GlobalEventHandlersEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

export interface WindowEventHandlers {
    onafterprint: ((this: WindowEventHandlers, ev: Event) => any) | null;
    onbeforeprint: ((this: WindowEventHandlers, ev: Event) => any) | null;
    onbeforeunload: ((this: WindowEventHandlers, ev: BeforeUnloadEvent) => any) | null;
    ongamepadconnected: ((this: WindowEventHandlers, ev: GamepadEvent) => any) | null;
    ongamepaddisconnected: ((this: WindowEventHandlers, ev: GamepadEvent) => any) | null;
    onhashchange: ((this: WindowEventHandlers, ev: HashChangeEvent) => any) | null;
    onlanguagechange: ((this: WindowEventHandlers, ev: Event) => any) | null;
    onmessage: ((this: WindowEventHandlers, ev: MessageEvent) => any) | null;
    onmessageerror: ((this: WindowEventHandlers, ev: MessageEvent) => any) | null;
    onoffline: ((this: WindowEventHandlers, ev: Event) => any) | null;
    ononline: ((this: WindowEventHandlers, ev: Event) => any) | null;
    onpagehide: ((this: WindowEventHandlers, ev: PageTransitionEvent) => any) | null;
    onpageshow: ((this: WindowEventHandlers, ev: PageTransitionEvent) => any) | null;
    onpopstate: ((this: WindowEventHandlers, ev: PopStateEvent) => any) | null;
    onrejectionhandled: ((this: WindowEventHandlers, ev: PromiseRejectionEvent) => any) | null;
    onstorage: ((this: WindowEventHandlers, ev: StorageEvent) => any) | null;
    onunhandledrejection: ((this: WindowEventHandlers, ev: PromiseRejectionEvent) => any) | null;
    onunload: ((this: WindowEventHandlers, ev: Event) => any) | null;
    addEventListener<K extends keyof WindowEventHandlersEventMap>(type: K, listener: (this: WindowEventHandlers, ev: WindowEventHandlersEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof WindowEventHandlersEventMap>(type: K, listener: (this: WindowEventHandlers, ev: WindowEventHandlersEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

export interface WindowLocalStorage {
    readonly localStorage: Storage;
}

export interface WindowOrWorkerGlobalScope {
    /** Available only in secure contexts. */
    readonly caches: CacheStorage;
    readonly crossOriginIsolated: boolean;
    readonly crypto: Crypto;
    readonly indexedDB: IDBFactory;
    readonly isSecureContext: boolean;
    readonly origin: string;
    readonly performance: Performance;
    atob(data: string): string;
    btoa(data: string): string;
    clearInterval(handle?: number): void;
    clearTimeout(handle?: number): void;
    createImageBitmap(image: ImageBitmapSource, options?: ImageBitmapOptions): Promise<ImageBitmap>;
    createImageBitmap(image: ImageBitmapSource, sx: number, sy: number, sw: number, sh: number, options?: ImageBitmapOptions): Promise<ImageBitmap>;
    fetch(input: RequestInfo, init?: RequestInit): Promise<Response>;
    queueMicrotask(callback: VoidFunction): void;
    // @ts-expect-error TS1215
    setInterval(handler: TimerHandler, timeout?: number, ...arguments: any[]): number;
    // @ts-expect-error TS1215
    setTimeout(handler: TimerHandler, timeout?: number, ...arguments: any[]): number;
}

export interface WindowSessionStorage {
    readonly sessionStorage: Storage;
}

export interface CustomElementRegistry {
    define(name: string, constructor: CustomElementConstructor, options?: ElementDefinitionOptions): void;
    get(name: string): CustomElementConstructor | undefined;
    upgrade(root: Node): void;
    whenDefined(name: string): Promise<CustomElementConstructor>;
}

/** An event which takes place in the DOM. */
export interface Event {
    /** Returns true or false depending on how event was initialized. True if event goes through its target's ancestors in reverse tree order, and false otherwise. */
    readonly bubbles: boolean;
    cancelBubble: boolean;
    /** Returns true or false depending on how event was initialized. Its return value does not always carry meaning, but true can indicate that part of the operation during which event was dispatched, can be canceled by invoking the preventDefault() method. */
    readonly cancelable: boolean;
    /** Returns true or false depending on how event was initialized. True if event invokes listeners past a ShadowRoot node that is the root of its target, and false otherwise. */
    readonly composed: boolean;
    /** Returns the object whose event listener's callback is currently being invoked. */
    readonly currentTarget: EventTarget | null;
    /** Returns true if preventDefault() was invoked successfully to indicate cancelation, and false otherwise. */
    readonly defaultPrevented: boolean;
    /** Returns the event's phase, which is one of NONE, CAPTURING_PHASE, AT_TARGET, and BUBBLING_PHASE. */
    readonly eventPhase: number;
    /** Returns true if event was dispatched by the user agent, and false otherwise. */
    readonly isTrusted: boolean;
    /** @deprecated */
    returnValue: boolean;
    /** @deprecated */
    readonly srcElement: EventTarget | null;
    /** Returns the object to which event is dispatched (its target). */
    readonly target: EventTarget | null;
    /** Returns the event's timestamp as the number of milliseconds measured relative to the time origin. */
    readonly timeStamp: DOMHighResTimeStamp;
    /** Returns the type of event, e.g. "click", "hashchange", or "submit". */
    readonly type: string;
    readonly AT_TARGET: number;
    readonly BUBBLING_PHASE: number;
    readonly CAPTURING_PHASE: number;
    readonly NONE: number;
    /** Returns the invocation target objects of event's path (objects on which listeners will be invoked), except for any nodes in shadow trees of which the shadow root's mode is "closed" that are not reachable from event's currentTarget. */
    composedPath(): EventTarget[];
    /** @deprecated */
    initEvent(type: string, bubbles?: boolean, cancelable?: boolean): void;
    /** If invoked when the cancelable attribute value is true, and while executing a listener for the event with passive set to false, signals to the operation that caused event to be dispatched that it needs to be canceled. */
    preventDefault(): void;
    /** Invoking this method prevents event from reaching any registered event listeners after the current one finishes running and, when dispatched in a tree, also prevents event from reaching any other objects. */
    stopImmediatePropagation(): void;
    /** When dispatched in a tree, invoking this method prevents event from reaching any objects other than the current object. */
    stopPropagation(): void;
}

/** @deprecated */
export interface External {
    /** @deprecated */
    AddSearchProvider(): void;
    /** @deprecated */
    IsSearchProviderInstalled(): void;
}

/** Element is the most general base class from which all objects in a Document inherit. It only has methods and properties common to all kinds of elements. More specific classes inherit from Element. */
export interface Element extends Node, ARIAMixin, Animatable, ChildNode, InnerHTML, NonDocumentTypeChildNode, ParentNode, Slottable {
    readonly attributes: NamedNodeMap;
    /** Allows for manipulation of element's class content attribute as a set of whitespace-separated tokens through a DOMTokenList object. */
    readonly classList: DOMTokenList;
    /** Returns the value of element's class content attribute. Can be set to change it. */
    className: string;
    readonly clientHeight: number;
    readonly clientLeft: number;
    readonly clientTop: number;
    readonly clientWidth: number;
    /** Returns the value of element's id content attribute. Can be set to change it. */
    id: string;
    /** Returns the local name. */
    readonly localName: string;
    /** Returns the namespace. */
    readonly namespaceURI: string | null;
    onfullscreenchange: ((this: Element, ev: Event) => any) | null;
    onfullscreenerror: ((this: Element, ev: Event) => any) | null;
    outerHTML: string;
    readonly ownerDocument: Document;
    readonly part: DOMTokenList;
    /** Returns the namespace prefix. */
    readonly prefix: string | null;
    readonly scrollHeight: number;
    scrollLeft: number;
    scrollTop: number;
    readonly scrollWidth: number;
    /** Returns element's shadow root, if any, and if shadow root's mode is "open", and null otherwise. */
    readonly shadowRoot: ShadowRoot | null;
    /** Returns the value of element's slot content attribute. Can be set to change it. */
    slot: string;
    /** Returns the HTML-uppercased qualified name. */
    readonly tagName: string;
    /** Creates a shadow root for element and returns it. */
    attachShadow(init: ShadowRootInit): ShadowRoot;
    /** Returns the first (starting at element) inclusive ancestor that matches selectors, and null otherwise. */
    closest<K extends keyof HTMLElementTagNameMap>(selector: K): HTMLElementTagNameMap[K] | null;
    closest<K extends keyof SVGElementTagNameMap>(selector: K): SVGElementTagNameMap[K] | null;
    closest<E extends Element = Element>(selectors: string): E | null;
    /** Returns element's first attribute whose qualified name is qualifiedName, and null if there is no such attribute otherwise. */
    getAttribute(qualifiedName: string): string | null;
    /** Returns element's attribute whose namespace is namespace and local name is localName, and null if there is no such attribute otherwise. */
    getAttributeNS(namespace: string | null, localName: string): string | null;
    /** Returns the qualified names of all element's attributes. Can contain duplicates. */
    getAttributeNames(): string[];
    getAttributeNode(qualifiedName: string): Attr | null;
    getAttributeNodeNS(namespace: string | null, localName: string): Attr | null;
    getBoundingClientRect(): DOMRect;
    getClientRects(): DOMRectList;
    /** Returns a HTMLCollection of the elements in the object on which the method was invoked (a document or an element) that have all the classes given by classNames. The classNames argument is interpreted as a space-separated list of classes. */
    getElementsByClassName(classNames: string): HTMLCollectionOf<Element>;
    getElementsByTagName<K extends keyof HTMLElementTagNameMap>(qualifiedName: K): HTMLCollectionOf<HTMLElementTagNameMap[K]>;
    getElementsByTagName<K extends keyof SVGElementTagNameMap>(qualifiedName: K): HTMLCollectionOf<SVGElementTagNameMap[K]>;
    getElementsByTagName(qualifiedName: string): HTMLCollectionOf<Element>;
    getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1999/xhtml", 
        localName: string): HTMLCollectionOf<HTMLElement>;
    getElementsByTagNameNS(namespaceURI: "http://www.w3.org/2000/svg", 
        localName: string): HTMLCollectionOf<SVGElement>;
    getElementsByTagNameNS(namespace: string | null, localName: string): HTMLCollectionOf<Element>;
    /** Returns true if element has an attribute whose qualified name is qualifiedName, and false otherwise. */
    hasAttribute(qualifiedName: string): boolean;
    /** Returns true if element has an attribute whose namespace is namespace and local name is localName. */
    hasAttributeNS(namespace: string | null, localName: string): boolean;
    /** Returns true if element has attributes, and false otherwise. */
    hasAttributes(): boolean;
    hasPointerCapture(pointerId: number): boolean;
    insertAdjacentElement(where: InsertPosition, element: Element): Element | null;
    insertAdjacentHTML(position: InsertPosition, text: string): void;
    insertAdjacentText(where: InsertPosition, data: string): void;
    /** Returns true if matching selectors against element's root yields element, and false otherwise. */
    matches(selectors: string): boolean;
    releasePointerCapture(pointerId: number): void;
    /** Removes element's first attribute whose qualified name is qualifiedName. */
    removeAttribute(qualifiedName: string): void;
    /** Removes element's attribute whose namespace is namespace and local name is localName. */
    removeAttributeNS(namespace: string | null, localName: string): void;
    removeAttributeNode(attr: Attr): Attr;
    /**
     * Displays element fullscreen and resolves promise when done.
     *
     * When supplied, options's navigationUI member indicates whether showing navigation UI while in fullscreen is preferred or not. If set to "show", navigation simplicity is preferred over screen space, and if set to "hide", more screen space is preferred. User agents are always free to honor user preference over the application's. The default value "auto" indicates no application preference.
     */
    requestFullscreen(options?: FullscreenOptions): Promise<void>;
    requestPointerLock(): void;
    scroll(options?: ScrollToOptions): void;
    scroll(x: number, y: number): void;
    scrollBy(options?: ScrollToOptions): void;
    scrollBy(x: number, y: number): void;
    scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void;
    scrollTo(options?: ScrollToOptions): void;
    scrollTo(x: number, y: number): void;
    /** Sets the value of element's first attribute whose qualified name is qualifiedName to value. */
    setAttribute(qualifiedName: string, value: string): void;
    /** Sets the value of element's attribute whose namespace is namespace and local name is localName to value. */
    setAttributeNS(namespace: string | null, qualifiedName: string, value: string): void;
    setAttributeNode(attr: Attr): Attr | null;
    setAttributeNodeNS(attr: Attr): Attr | null;
    setPointerCapture(pointerId: number): void;
    /**
     * If force is not given, "toggles" qualifiedName, removing it if it is present and adding it if it is not present. If force is true, adds qualifiedName. If force is false, removes qualifiedName.
     *
     * Returns true if qualifiedName is now present, and false otherwise.
     */
    toggleAttribute(qualifiedName: string, force?: boolean): boolean;
    /** @deprecated This is a legacy alias of `matches`. */
    webkitMatchesSelector(selectors: string): boolean;
    addEventListener<K extends keyof ElementEventMap>(type: K, listener: (this: Element, ev: ElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof ElementEventMap>(type: K, listener: (this: Element, ev: ElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Allows manipulation of the browser session history, that is the pages visited in the tab or frame that the current page is loaded in. */
export interface History {
    readonly length: number;
    scrollRestoration: ScrollRestoration;
    readonly state: any;
    back(): void;
    forward(): void;
    go(delta?: number): void;
    pushState(data: any, unused: string, url?: string | URL | null): void;
    replaceState(data: any, unused: string, url?: string | URL | null): void;
}

/** Node is an interface from which a number of DOM API object types inherit. It allows those types to be treated similarly; for example, inheriting the same set of methods, or being tested in the same way. */
export interface Node extends EventTarget {
    /** Returns node's node document's document base URL. */
    readonly baseURI: string;
    /** Returns the children. */
    readonly childNodes: NodeListOf<ChildNode>;
    /** Returns the first child. */
    readonly firstChild: ChildNode | null;
    /** Returns true if node is connected and false otherwise. */
    readonly isConnected: boolean;
    /** Returns the last child. */
    readonly lastChild: ChildNode | null;
    /** Returns the next sibling. */
    readonly nextSibling: ChildNode | null;
    /** Returns a string appropriate for the type of node. */
    readonly nodeName: string;
    /** Returns the type of node. */
    readonly nodeType: number;
    nodeValue: string | null;
    /** Returns the node document. Returns null for documents. */
    readonly ownerDocument: Document | null;
    /** Returns the parent element. */
    readonly parentElement: HTMLElement | null;
    /** Returns the parent. */
    readonly parentNode: ParentNode | null;
    /** Returns the previous sibling. */
    readonly previousSibling: ChildNode | null;
    textContent: string | null;
    readonly ATTRIBUTE_NODE: number;
    /** node is a CDATASection node. */
    readonly CDATA_SECTION_NODE: number;
    /** node is a Comment node. */
    readonly COMMENT_NODE: number;
    /** node is a DocumentFragment node. */
    readonly DOCUMENT_FRAGMENT_NODE: number;
    /** node is a document. */
    readonly DOCUMENT_NODE: number;
    /** Set when other is a descendant of node. */
    readonly DOCUMENT_POSITION_CONTAINED_BY: number;
    /** Set when other is an ancestor of node. */
    readonly DOCUMENT_POSITION_CONTAINS: number;
    /** Set when node and other are not in the same tree. */
    readonly DOCUMENT_POSITION_DISCONNECTED: number;
    /** Set when other is following node. */
    readonly DOCUMENT_POSITION_FOLLOWING: number;
    readonly DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: number;
    /** Set when other is preceding node. */
    readonly DOCUMENT_POSITION_PRECEDING: number;
    /** node is a doctype. */
    readonly DOCUMENT_TYPE_NODE: number;
    /** node is an element. */
    readonly ELEMENT_NODE: number;
    readonly ENTITY_NODE: number;
    readonly ENTITY_REFERENCE_NODE: number;
    readonly NOTATION_NODE: number;
    /** node is a ProcessingInstruction node. */
    readonly PROCESSING_INSTRUCTION_NODE: number;
    /** node is a Text node. */
    readonly TEXT_NODE: number;
    appendChild<T extends Node>(node: T): T;
    /** Returns a copy of node. If deep is true, the copy also includes the node's descendants. */
    cloneNode(deep?: boolean): Node;
    /** Returns a bitmask indicating the position of other relative to node. */
    compareDocumentPosition(other: Node): number;
    /** Returns true if other is an inclusive descendant of node, and false otherwise. */
    contains(other: Node | null): boolean;
    /** Returns node's root. */
    getRootNode(options?: GetRootNodeOptions): Node;
    /** Returns whether node has children. */
    hasChildNodes(): boolean;
    insertBefore<T extends Node>(node: T, child: Node | null): T;
    isDefaultNamespace(namespace: string | null): boolean;
    /** Returns whether node and otherNode have the same properties. */
    isEqualNode(otherNode: Node | null): boolean;
    isSameNode(otherNode: Node | null): boolean;
    lookupNamespaceURI(prefix: string | null): string | null;
    lookupPrefix(namespace: string | null): string | null;
    /** Removes empty exclusive Text nodes and concatenates the data of remaining contiguous exclusive Text nodes into the first of their nodes. */
    normalize(): void;
    removeChild<T extends Node>(child: T): T;
    replaceChild<T extends Node>(node: Node, child: T): T;
}

export interface DocumentAndElementEventHandlers {
    oncopy: ((this: DocumentAndElementEventHandlers, ev: ClipboardEvent) => any) | null;
    oncut: ((this: DocumentAndElementEventHandlers, ev: ClipboardEvent) => any) | null;
    onpaste: ((this: DocumentAndElementEventHandlers, ev: ClipboardEvent) => any) | null;
    addEventListener<K extends keyof DocumentAndElementEventHandlersEventMap>(type: K, listener: (this: DocumentAndElementEventHandlers, ev: DocumentAndElementEventHandlersEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof DocumentAndElementEventHandlersEventMap>(type: K, listener: (this: DocumentAndElementEventHandlers, ev: DocumentAndElementEventHandlersEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

export interface DocumentOrShadowRoot {
    /**
     * Returns the deepest element in the document through which or to which key events are being routed. This is, roughly speaking, the focused element in the document.
     *
     * For the purposes of this API, when a child browsing context is focused, its container is focused in the parent browsing context. For example, if the user moves the focus to a text control in an iframe, the iframe is the element returned by the activeElement API in the iframe's node document.
     *
     * Similarly, when the focused element is in a different node tree than documentOrShadowRoot, the element returned will be the host that's located in the same node tree as documentOrShadowRoot if documentOrShadowRoot is a shadow-including inclusive ancestor of the focused element, and null if not.
     */
    readonly activeElement: Element | null;
    /** Returns document's fullscreen element. */
    readonly fullscreenElement: Element | null;
    readonly pictureInPictureElement: Element | null;
    readonly pointerLockElement: Element | null;
    /** Retrieves a collection of styleSheet objects representing the style sheets that correspond to each instance of a link or style object in the document. */
    readonly styleSheets: StyleSheetList;
    /**
     * Returns the element for the specified x coordinate and the specified y coordinate.
     * @param x The x-offset
     * @param y The y-offset
     */
    elementFromPoint(x: number, y: number): Element | null;
    elementsFromPoint(x: number, y: number): Element[];
    getAnimations(): Animation[];
}

export interface FontFaceSource {
    readonly fonts: FontFaceSet;
}

export interface NonElementParentNode {
    /** Returns the first element within node's descendants whose ID is elementId. */
    getElementById(elementId: string): Element | null;
}

export interface ParentNode extends Node {
    readonly childElementCount: number;
    /** Returns the child elements. */
    readonly children: HTMLCollection;
    /** Returns the first child that is an element, and null otherwise. */
    readonly firstElementChild: Element | null;
    /** Returns the last child that is an element, and null otherwise. */
    readonly lastElementChild: Element | null;
    /**
     * Inserts nodes after the last child of node, while replacing strings in nodes with equivalent Text nodes.
     *
     * Throws a "HierarchyRequestError" DOMException if the constraints of the node tree are violated.
     */
    append(...nodes: (Node | string)[]): void;
    /**
     * Inserts nodes before the first child of node, while replacing strings in nodes with equivalent Text nodes.
     *
     * Throws a "HierarchyRequestError" DOMException if the constraints of the node tree are violated.
     */
    prepend(...nodes: (Node | string)[]): void;
    /** Returns the first element that is a descendant of node that matches selectors. */
    querySelector<K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K] | null;
    querySelector<K extends keyof SVGElementTagNameMap>(selectors: K): SVGElementTagNameMap[K] | null;
    querySelector<E extends Element = Element>(selectors: string): E | null;
    /** Returns all element descendants of node that match selectors. */
    querySelectorAll<K extends keyof HTMLElementTagNameMap>(selectors: K): NodeListOf<HTMLElementTagNameMap[K]>;
    querySelectorAll<K extends keyof SVGElementTagNameMap>(selectors: K): NodeListOf<SVGElementTagNameMap[K]>;
    querySelectorAll<E extends Element = Element>(selectors: string): NodeListOf<E>;
    /**
     * Replace all children of node with nodes, while replacing strings in nodes with equivalent Text nodes.
     *
     * Throws a "HierarchyRequestError" DOMException if the constraints of the node tree are violated.
     */
    replaceChildren(...nodes: (Node | string)[]): void;
}

export interface XPathEvaluatorBase {
    createExpression(expression: string, resolver?: XPathNSResolver | null): XPathExpression;
    createNSResolver(nodeResolver: Node): XPathNSResolver;
    evaluate(expression: string, contextNode: Node, resolver?: XPathNSResolver | null, type?: number, result?: XPathResult | null): XPathResult;
}

export interface HTMLAllCollection {
    [index: number]: Element;
    /** Returns the number of elements in the collection. */
    readonly length: number;
    /** Returns the item with index index from the collection (determined by tree order). */
    item(nameOrIndex?: string): HTMLCollection | Element | null;
    /**
     * Returns the item with ID or name name from the collection.
     *
     * If there are multiple matching items, then an HTMLCollection object containing all those elements is returned.
     *
     * Only button, form, iframe, input, map, meta, object, select, and textarea elements can have a name for the purpose of this method; their name is given by the value of their name attribute.
     */
    namedItem(name: string): HTMLCollection | Element | null;
}

export interface HTMLCollectionOf<T extends Element> extends HTMLCollectionBase {
    [index: number]: T;
    item(index: number): T | null;
    namedItem(name: string): T | null;
}

/** Hyperlink elements and provides special properties and methods (beyond those of the regular HTMLElement object interface that they inherit from) for manipulating the layout and presentation of such elements. */
export interface HTMLAnchorElement extends HTMLElement, HTMLHyperlinkElementUtils {
    /**
     * Sets or retrieves the character set used to encode the object.
     * @deprecated
     */
    charset: string;
    /**
     * Sets or retrieves the coordinates of the object.
     * @deprecated
     */
    coords: string;
    download: string;
    /** Sets or retrieves the language code of the object. */
    hreflang: string;
    /**
     * Sets or retrieves the shape of the object.
     * @deprecated
     */
    name: string;
    ping: string;
    referrerPolicy: string;
    /** Sets or retrieves the relationship between the object and the destination of the link. */
    rel: string;
    readonly relList: DOMTokenList;
    /**
     * Sets or retrieves the relationship between the object and the destination of the link.
     * @deprecated
     */
    rev: string;
    /**
     * Sets or retrieves the shape of the object.
     * @deprecated
     */
    shape: string;
    /** Sets or retrieves the window or frame at which to target content. */
    target: string;
    /** Retrieves or sets the text of the object as a string. */
    text: string;
    type: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLAnchorElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLAnchorElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

export interface HTMLCollection extends HTMLCollectionBase {
    /** Retrieves a select object or an object from an options collection. */
    namedItem(name: string): Element | null;
}

/** Any HTML element. Some elements directly implement this interface, while others implement it via an interface that inherits it. */
export interface HTMLElement extends Element, DocumentAndElementEventHandlers, ElementCSSInlineStyle, ElementContentEditable, GlobalEventHandlers, HTMLOrSVGElement {
    accessKey: string;
    readonly accessKeyLabel: string;
    autocapitalize: string;
    dir: string;
    draggable: boolean;
    hidden: boolean;
    innerText: string;
    lang: string;
    readonly offsetHeight: number;
    readonly offsetLeft: number;
    readonly offsetParent: Element | null;
    readonly offsetTop: number;
    readonly offsetWidth: number;
    outerText: string;
    spellcheck: boolean;
    title: string;
    translate: boolean;
    attachInternals(): ElementInternals;
    click(): void;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** A Node containing a doctype. */
export interface DocumentType extends Node, ChildNode {
    readonly name: string;
    readonly ownerDocument: Document;
    readonly publicId: string;
    readonly systemId: string;
}

/** Provides special properties (beyond the regular HTMLElement interface it also has available to it by inheritance) for manipulating <embed> elements. */
export interface HTMLEmbedElement extends HTMLElement {
    /** @deprecated */
    align: string;
    /** Sets or retrieves the height of the object. */
    height: string;
    /**
     * Sets or retrieves the name of the object.
     * @deprecated
     */
    name: string;
    /** Sets or retrieves a URL to be loaded by the object. */
    src: string;
    type: string;
    /** Sets or retrieves the width of the object. */
    width: string;
    getSVGDocument(): Document | null;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLEmbedElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLEmbedElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** A <form> element in the DOM; it allows access to and in some cases modification of aspects of the form, as well as access to its component elements. */
export interface HTMLFormElement extends HTMLElement {
    [index: number]: Element;
    [name: string]: any;
    /** Sets or retrieves a list of character encodings for input data that must be accepted by the server processing the form. */
    acceptCharset: string;
    /** Sets or retrieves the URL to which the form content is sent for processing. */
    action: string;
    /** Specifies whether autocomplete is applied to an editable text field. */
    autocomplete: string;
    /** Retrieves a collection, in source order, of all controls in a given form. */
    readonly elements: HTMLFormControlsCollection;
    /** Sets or retrieves the MIME encoding for the form. */
    encoding: string;
    /** Sets or retrieves the encoding type for the form. */
    enctype: string;
    /** Sets or retrieves the number of objects in a collection. */
    readonly length: number;
    /** Sets or retrieves how to send the form data to the server. */
    method: string;
    /** Sets or retrieves the name of the object. */
    name: string;
    /** Designates a form that is not validated when submitted. */
    noValidate: boolean;
    /** Sets or retrieves the window or frame at which to target content. */
    target: string;
    /** Returns whether a form will validate when it is submitted, without having to submit it. */
    checkValidity(): boolean;
    reportValidity(): boolean;
    requestSubmit(submitter?: HTMLElement | null): void;
    /** Fires when the user resets a form. */
    reset(): void;
    /** Fires when a FORM is about to be submitted. */
    submit(): void;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLFormElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLFormElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Contains the descriptive information, or metadata, for a document. This object inherits all of the properties and methods described in the HTMLElement interface. */
export interface HTMLHeadElement extends HTMLElement {
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLHeadElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLHeadElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Provides special properties and methods for manipulating <img> elements. */
export interface HTMLImageElement extends HTMLElement {
    /**
     * Sets or retrieves how the object is aligned with adjacent text.
     * @deprecated
     */
    align: string;
    /** Sets or retrieves a text alternative to the graphic. */
    alt: string;
    /**
     * Specifies the properties of a border drawn around an object.
     * @deprecated
     */
    border: string;
    /** Retrieves whether the object is fully loaded. */
    readonly complete: boolean;
    crossOrigin: string | null;
    readonly currentSrc: string;
    decoding: "async" | "sync" | "auto";
    /** Sets or retrieves the height of the object. */
    height: number;
    /**
     * Sets or retrieves the width of the border to draw around the object.
     * @deprecated
     */
    hspace: number;
    /** Sets or retrieves whether the image is a server-side image map. */
    isMap: boolean;
    loading: string;
    /**
     * Sets or retrieves a Uniform Resource Identifier (URI) to a long description of the object.
     * @deprecated
     */
    longDesc: string;
    /** @deprecated */
    lowsrc: string;
    /**
     * Sets or retrieves the name of the object.
     * @deprecated
     */
    name: string;
    /** The original height of the image resource before sizing. */
    readonly naturalHeight: number;
    /** The original width of the image resource before sizing. */
    readonly naturalWidth: number;
    referrerPolicy: string;
    sizes: string;
    /** The address or URL of the a media resource that is to be considered. */
    src: string;
    srcset: string;
    /** Sets or retrieves the URL, often with a bookmark extension (#name), to use as a client-side image map. */
    useMap: string;
    /**
     * Sets or retrieves the vertical margin for the object.
     * @deprecated
     */
    vspace: number;
    /** Sets or retrieves the width of the object. */
    width: number;
    readonly x: number;
    readonly y: number;
    decode(): Promise<void>;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLImageElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLImageElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** An object providing methods which are not dependent on any particular document. Such an object is returned by the Document.implementation property. */
export interface DOMImplementation {
    createDocument(namespace: string | null, qualifiedName: string | null, doctype?: DocumentType | null): XMLDocument;
    createDocumentType(qualifiedName: string, publicId: string, systemId: string): DocumentType;
    createHTMLDocument(title?: string): Document;
    /** @deprecated */
    hasFeature(...args: any[]): true;
}

/** Provides special properties and methods (beyond those of the regular object HTMLElement interface it also has available to it by inheritance) for manipulating the layout and presentation of <area> elements. */
export interface HTMLAreaElement extends HTMLElement, HTMLHyperlinkElementUtils {
    /** Sets or retrieves a text alternative to the graphic. */
    alt: string;
    /** Sets or retrieves the coordinates of the object. */
    coords: string;
    download: string;
    /**
     * Sets or gets whether clicks in this region cause action.
     * @deprecated
     */
    noHref: boolean;
    ping: string;
    referrerPolicy: string;
    rel: string;
    readonly relList: DOMTokenList;
    /** Sets or retrieves the shape of the object. */
    shape: string;
    /** Sets or retrieves the window or frame at which to target content. */
    target: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLAreaElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLAreaElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

export interface NavigatorAutomationInformation {
    readonly webdriver: boolean;
}

export interface NavigatorConcurrentHardware {
    readonly hardwareConcurrency: number;
}

export interface NavigatorContentUtils {
    /** Available only in secure contexts. */
    registerProtocolHandler(scheme: string, url: string | URL): void;
}

export interface NavigatorCookies {
    readonly cookieEnabled: boolean;
}

export interface NavigatorID {
    /** @deprecated */
    readonly appCodeName: string;
    /** @deprecated */
    readonly appName: string;
    /** @deprecated */
    readonly appVersion: string;
    /** @deprecated */
    readonly platform: string;
    /** @deprecated */
    readonly product: string;
    /** @deprecated */
    readonly productSub: string;
    readonly userAgent: string;
    readonly vendor: string;
    /** @deprecated */
    readonly vendorSub: string;
}

export interface NavigatorLanguage {
    readonly language: string;
    readonly languages: ReadonlyArray<string>;
}

export interface NavigatorNetworkInformation {
    readonly connection: NetworkInformation;
}

export interface NavigatorOnLine {
    readonly onLine: boolean;
}

export interface NavigatorPlugins {
    /** @deprecated */
    readonly mimeTypes: MimeTypeArray;
    /** @deprecated */
    readonly plugins: PluginArray;
    /** @deprecated */
    javaEnabled(): boolean;
}

/** Available only in secure contexts. */
export interface NavigatorStorage {
    readonly storage: StorageManager;
}

/** Available only in secure contexts. */
export interface Clipboard extends EventTarget {
    read(): Promise<ClipboardItems>;
    readText(): Promise<string>;
    write(data: ClipboardItems): Promise<void>;
    writeText(data: string): Promise<void>;
}

/** Available only in secure contexts. */
export interface CredentialsContainer {
    create(options?: CredentialCreationOptions): Promise<Credential | null>;
    get(options?: CredentialRequestOptions): Promise<Credential | null>;
    preventSilentAccess(): Promise<void>;
    store(credential: Credential): Promise<Credential>;
}

/** An object able to programmatically obtain the position of the device. It gives Web content access to the location of the device. This allows a Web site or app to offer customized results based on the user's location. */
export interface Geolocation {
    clearWatch(watchId: number): void;
    getCurrentPosition(successCallback: PositionCallback, errorCallback?: PositionErrorCallback | null, options?: PositionOptions): void;
    watchPosition(successCallback: PositionCallback, errorCallback?: PositionErrorCallback | null, options?: PositionOptions): number;
}

export interface MediaCapabilities {
    decodingInfo(configuration: MediaDecodingConfiguration): Promise<MediaCapabilitiesDecodingInfo>;
    encodingInfo(configuration: MediaEncodingConfiguration): Promise<MediaCapabilitiesEncodingInfo>;
}

/**
 * Provides access to connected media input devices like cameras and microphones, as well as screen sharing. In essence, it lets you obtain access to any hardware source of media data.
 * Available only in secure contexts.
 */
export interface MediaDevices extends EventTarget {
    ondevicechange: ((this: MediaDevices, ev: Event) => any) | null;
    enumerateDevices(): Promise<MediaDeviceInfo[]>;
    getDisplayMedia(constraints?: DisplayMediaStreamConstraints): Promise<MediaStream>;
    getSupportedConstraints(): MediaTrackSupportedConstraints;
    getUserMedia(constraints?: MediaStreamConstraints): Promise<MediaStream>;
    addEventListener<K extends keyof MediaDevicesEventMap>(type: K, listener: (this: MediaDevices, ev: MediaDevicesEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof MediaDevicesEventMap>(type: K, listener: (this: MediaDevices, ev: MediaDevicesEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

export interface MediaSession {
    metadata: MediaMetadata | null;
    playbackState: MediaSessionPlaybackState;
    setActionHandler(action: MediaSessionAction, handler: MediaSessionActionHandler | null): void;
    setPositionState(state?: MediaPositionState): void;
}

export interface Permissions {
    query(permissionDesc: PermissionDescriptor): Promise<PermissionStatus>;
}

/**
 * The ServiceWorkerContainer interface of the ServiceWorker API provides an object representing the service worker as an overall unit in the network ecosystem, including facilities to register, unregister and update service workers, and access the state of service workers and their registrations.
 * Available only in secure contexts.
 */
export interface ServiceWorkerContainer extends EventTarget {
    readonly controller: ServiceWorker | null;
    oncontrollerchange: ((this: ServiceWorkerContainer, ev: Event) => any) | null;
    onmessage: ((this: ServiceWorkerContainer, ev: MessageEvent) => any) | null;
    onmessageerror: ((this: ServiceWorkerContainer, ev: MessageEvent) => any) | null;
    readonly ready: Promise<ServiceWorkerRegistration>;
    getRegistration(clientURL?: string | URL): Promise<ServiceWorkerRegistration | undefined>;
    getRegistrations(): Promise<ReadonlyArray<ServiceWorkerRegistration>>;
    register(scriptURL: string | URL, options?: RegistrationOptions): Promise<ServiceWorkerRegistration>;
    startMessages(): void;
    addEventListener<K extends keyof ServiceWorkerContainerEventMap>(type: K, listener: (this: ServiceWorkerContainer, ev: ServiceWorkerContainerEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof ServiceWorkerContainerEventMap>(type: K, listener: (this: ServiceWorkerContainer, ev: ServiceWorkerContainerEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

export interface ShareData {
    files?: File[];
    text?: string;
    title?: string;
    url?: string;
}

/**
 * This Gamepad API interface defines an individual gamepad or other controller, allowing access to information such as button presses, axis positions, and id.
 * Available only in secure contexts.
 */
export interface Gamepad {
    readonly axes: ReadonlyArray<number>;
    readonly buttons: ReadonlyArray<GamepadButton>;
    readonly connected: boolean;
    readonly hapticActuators: ReadonlyArray<GamepadHapticActuator>;
    readonly id: string;
    readonly index: number;
    readonly mapping: GamepadMappingType;
    readonly timestamp: DOMHighResTimeStamp;
}

export interface MediaKeySystemConfiguration {
    audioCapabilities?: MediaKeySystemMediaCapability[];
    distinctiveIdentifier?: MediaKeysRequirement;
    initDataTypes?: string[];
    label?: string;
    persistentState?: MediaKeysRequirement;
    sessionTypes?: string[];
    videoCapabilities?: MediaKeySystemMediaCapability[];
}

/**
 * This EncryptedMediaExtensions API interface provides access to a Key System for decryption and/or a content protection provider. You can request an instance of this object using the Navigator.requestMediaKeySystemAccess method.
 * Available only in secure contexts.
 */
export interface MediaKeySystemAccess {
    readonly keySystem: string;
    createMediaKeys(): Promise<MediaKeys>;
    getConfiguration(): MediaKeySystemConfiguration;
}

/** The URL interface represents an object providing static methods used for creating object URLs. */
export interface URL {
    hash: string;
    host: string;
    hostname: string;
    href: string;
    readonly origin: string;
    password: string;
    pathname: string;
    port: string;
    protocol: string;
    search: string;
    readonly searchParams: URLSearchParams;
    username: string;
    toString(): string;
    toJSON(): string;
}

export interface AddEventListenerOptions extends EventListenerOptions {
    once?: boolean;
    passive?: boolean;
    signal?: AbortSignal;
}

export interface EventListenerOptions {
    capture?: boolean;
}

export interface FrameRequestCallback {
    (time: DOMHighResTimeStamp): void;
}

/** Simple user interface events. */
export interface UIEvent extends Event {
    readonly detail: number;
    readonly view: Window | null;
    /** @deprecated */
    readonly which: number;
    /** @deprecated */
    initUIEvent(typeArg: string, bubblesArg?: boolean, cancelableArg?: boolean, viewArg?: Window | null, detailArg?: number): void;
}

/** Events providing information related to animations. */
export interface AnimationEvent extends Event {
    readonly animationName: string;
    readonly elapsedTime: number;
    readonly pseudoElement: string;
}

/** Events that occur due to the user interacting with a pointing device (such as a mouse). Common events using this interface include click, dblclick, mouseup, mousedown. */
export interface MouseEvent extends UIEvent {
    readonly altKey: boolean;
    readonly button: number;
    readonly buttons: number;
    readonly clientX: number;
    readonly clientY: number;
    readonly ctrlKey: boolean;
    readonly metaKey: boolean;
    readonly movementX: number;
    readonly movementY: number;
    readonly offsetX: number;
    readonly offsetY: number;
    readonly pageX: number;
    readonly pageY: number;
    readonly relatedTarget: EventTarget | null;
    readonly screenX: number;
    readonly screenY: number;
    readonly shiftKey: boolean;
    readonly x: number;
    readonly y: number;
    getModifierState(keyArg: string): boolean;
    /** @deprecated */
    initMouseEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, viewArg: Window, detailArg: number, screenXArg: number, screenYArg: number, clientXArg: number, clientYArg: number, ctrlKeyArg: boolean, altKeyArg: boolean, shiftKeyArg: boolean, metaKeyArg: boolean, buttonArg: number, relatedTargetArg: EventTarget | null): void;
}

/** Focus-related events like focus, blur, focusin, or focusout. */
export interface FocusEvent extends UIEvent {
    readonly relatedTarget: EventTarget | null;
}

/** A DOM event that represents a drag and drop interaction. The user initiates a drag by placing a pointer device (such as a mouse) on the touch surface and then dragging the pointer to a new location (such as another DOM element). Applications are free to interpret a drag and drop interaction in an application-specific way. */
export interface DragEvent extends MouseEvent {
    /** Returns the DataTransfer object for the event. */
    readonly dataTransfer: DataTransfer | null;
}

export interface FormDataEvent extends Event {
    /** Returns a FormData object representing names and values of elements associated to the target form. Operations on the FormData object will affect form data to be submitted. */
    readonly formData: FormData;
}

/** The state of a DOM event produced by a pointer such as the geometry of the contact point, the device type that generated the event, the amount of pressure that was applied on the contact surface, etc. */
export interface PointerEvent extends MouseEvent {
    readonly height: number;
    readonly isPrimary: boolean;
    readonly pointerId: number;
    readonly pointerType: string;
    readonly pressure: number;
    readonly tangentialPressure: number;
    readonly tiltX: number;
    readonly tiltY: number;
    readonly twist: number;
    readonly width: number;
    /** Available only in secure contexts. */
    getCoalescedEvents(): PointerEvent[];
    getPredictedEvents(): PointerEvent[];
}

/** KeyboardEvent objects describe a user interaction with the keyboard; each event describes a single interaction between the user and a key (or combination of a key with modifier keys) on the keyboard. */
export interface KeyboardEvent extends UIEvent {
    readonly altKey: boolean;
    /** @deprecated */
    readonly charCode: number;
    readonly code: string;
    readonly ctrlKey: boolean;
    readonly isComposing: boolean;
    readonly key: string;
    /** @deprecated */
    readonly keyCode: number;
    readonly location: number;
    readonly metaKey: boolean;
    readonly repeat: boolean;
    readonly shiftKey: boolean;
    readonly DOM_KEY_LOCATION_LEFT: number;
    readonly DOM_KEY_LOCATION_NUMPAD: number;
    readonly DOM_KEY_LOCATION_RIGHT: number;
    readonly DOM_KEY_LOCATION_STANDARD: number;
    getModifierState(keyArg: string): boolean;
    /** @deprecated */
    initKeyboardEvent(typeArg: string, bubblesArg?: boolean, cancelableArg?: boolean, viewArg?: Window | null, keyArg?: string, locationArg?: number, ctrlKey?: boolean, altKey?: boolean, shiftKey?: boolean, metaKey?: boolean): void;
}

/** Events measuring progress of an underlying process, like an HTTP request (for an XMLHttpRequest, or the loading of the underlying resource of an <img>, <audio>, <video>, <style> or <link>). */
export interface ProgressEvent<T extends EventTarget = EventTarget> extends Event {
    readonly lengthComputable: boolean;
    readonly loaded: number;
    readonly target: T | null;
    readonly total: number;
}

export interface SubmitEvent extends Event {
    /** Returns the element representing the submit button that triggered the form submission, or null if the submission was not triggered by a button. */
    readonly submitter: HTMLElement | null;
}

/** An event sent when the state of contacts with a touch-sensitive surface changes. This surface can be a touch screen or trackpad, for example. The event can describe one or more points of contact with the screen and includes support for detecting movement, addition and removal of contact points, and so forth. */
export interface TouchEvent extends UIEvent {
    readonly altKey: boolean;
    readonly changedTouches: TouchList;
    readonly ctrlKey: boolean;
    readonly metaKey: boolean;
    readonly shiftKey: boolean;
    readonly targetTouches: TouchList;
    readonly touches: TouchList;
}

/** Events providing information related to transitions. */
export interface TransitionEvent extends Event {
    readonly elapsedTime: number;
    readonly propertyName: string;
    readonly pseudoElement: string;
}

/** Events that occur due to the user moving a mouse wheel or similar input device. */
export interface WheelEvent extends MouseEvent {
    readonly deltaMode: number;
    readonly deltaX: number;
    readonly deltaY: number;
    readonly deltaZ: number;
    readonly DOM_DELTA_LINE: number;
    readonly DOM_DELTA_PAGE: number;
    readonly DOM_DELTA_PIXEL: number;
}

export interface GlobalEventHandlersEventMap {
    "abort": UIEvent;
    "animationcancel": AnimationEvent;
    "animationend": AnimationEvent;
    "animationiteration": AnimationEvent;
    "animationstart": AnimationEvent;
    "auxclick": MouseEvent;
    "beforeinput": InputEvent;
    "blur": FocusEvent;
    "canplay": Event;
    "canplaythrough": Event;
    "change": Event;
    "click": MouseEvent;
    "close": Event;
    "compositionend": CompositionEvent;
    "compositionstart": CompositionEvent;
    "compositionupdate": CompositionEvent;
    "contextmenu": MouseEvent;
    "cuechange": Event;
    "dblclick": MouseEvent;
    "drag": DragEvent;
    "dragend": DragEvent;
    "dragenter": DragEvent;
    "dragleave": DragEvent;
    "dragover": DragEvent;
    "dragstart": DragEvent;
    "drop": DragEvent;
    "durationchange": Event;
    "emptied": Event;
    "ended": Event;
    "error": ErrorEvent;
    "focus": FocusEvent;
    "focusin": FocusEvent;
    "focusout": FocusEvent;
    "formdata": FormDataEvent;
    "gotpointercapture": PointerEvent;
    "input": Event;
    "invalid": Event;
    "keydown": KeyboardEvent;
    "keypress": KeyboardEvent;
    "keyup": KeyboardEvent;
    "load": Event;
    "loadeddata": Event;
    "loadedmetadata": Event;
    "loadstart": Event;
    "lostpointercapture": PointerEvent;
    "mousedown": MouseEvent;
    "mouseenter": MouseEvent;
    "mouseleave": MouseEvent;
    "mousemove": MouseEvent;
    "mouseout": MouseEvent;
    "mouseover": MouseEvent;
    "mouseup": MouseEvent;
    "pause": Event;
    "play": Event;
    "playing": Event;
    "pointercancel": PointerEvent;
    "pointerdown": PointerEvent;
    "pointerenter": PointerEvent;
    "pointerleave": PointerEvent;
    "pointermove": PointerEvent;
    "pointerout": PointerEvent;
    "pointerover": PointerEvent;
    "pointerup": PointerEvent;
    "progress": ProgressEvent;
    "ratechange": Event;
    "reset": Event;
    "resize": UIEvent;
    "scroll": Event;
    "securitypolicyviolation": SecurityPolicyViolationEvent;
    "seeked": Event;
    "seeking": Event;
    "select": Event;
    "selectionchange": Event;
    "selectstart": Event;
    "stalled": Event;
    "submit": SubmitEvent;
    "suspend": Event;
    "timeupdate": Event;
    "toggle": Event;
    "touchcancel": TouchEvent;
    "touchend": TouchEvent;
    "touchmove": TouchEvent;
    "touchstart": TouchEvent;
    "transitioncancel": TransitionEvent;
    "transitionend": TransitionEvent;
    "transitionrun": TransitionEvent;
    "transitionstart": TransitionEvent;
    "volumechange": Event;
    "waiting": Event;
    "webkitanimationend": Event;
    "webkitanimationiteration": Event;
    "webkitanimationstart": Event;
    "webkittransitionend": Event;
    "wheel": WheelEvent;
}

/** The beforeunload event is fired when the window, the document and its resources are about to be unloaded. */
export interface BeforeUnloadEvent extends Event {
    returnValue: any;
}

/**
 * This Gamepad API interface contains references to gamepads connected to the system, which is what the gamepad events Window.gamepadconnected and Window.gamepaddisconnected are fired in response to.
 * Available only in secure contexts.
 */
export interface GamepadEvent extends Event {
    readonly gamepad: Gamepad;
}

/** Events that fire when the fragment identifier of the URL has changed. */
export interface HashChangeEvent extends Event {
    /** Returns the URL of the session history entry that is now current. */
    readonly newURL: string;
    /** Returns the URL of the session history entry that was previously current. */
    readonly oldURL: string;
}

/** A message received by a target object. */
export interface MessageEvent<T = any> extends Event {
    /** Returns the data of the message. */
    readonly data: T;
    /** Returns the last event ID string, for server-sent events. */
    readonly lastEventId: string;
    /** Returns the origin of the message, for server-sent events and cross-document messaging. */
    readonly origin: string;
    /** Returns the MessagePort array sent with the message, for cross-document messaging and channel messaging. */
    readonly ports: ReadonlyArray<MessagePort>;
    /** Returns the WindowProxy of the source window, for cross-document messaging, and the MessagePort being attached, in the connect event fired at SharedWorkerGlobalScope objects. */
    readonly source: MessageEventSource | null;
    /** @deprecated */
    initMessageEvent(type: string, bubbles?: boolean, cancelable?: boolean, data?: any, origin?: string, lastEventId?: string, source?: MessageEventSource | null, ports?: MessagePort[]): void;
}

/** The PageTransitionEvent is fired when a document is being loaded or unloaded. */
export interface PageTransitionEvent extends Event {
    /**
     * For the pageshow event, returns false if the page is newly being loaded (and the load event will fire). Otherwise, returns true.
     *
     * For the pagehide event, returns false if the page is going away for the last time. Otherwise, returns true, meaning that (if nothing conspires to make the page unsalvageable) the page might be reused if the user navigates back to this page.
     *
     * Things that can cause the page to be unsalvageable include:
     *
     * The user agent decided to not keep the Document alive in a session history entry after unload
     * Having iframes that are not salvageable
     * Active WebSocket objects
     * Aborting a Document
     */
    readonly persisted: boolean;
}

/** PopStateEvent is an event handler for the popstate event on the window. */
export interface PopStateEvent extends Event {
    /** Returns a copy of the information that was provided to pushState() or replaceState(). */
    readonly state: any;
}

export interface PromiseRejectionEvent extends Event {
    readonly promise: Promise<any>;
    readonly reason: any;
}

/** A StorageEvent is sent to a window when a storage area it has access to is changed within the context of another document. */
export interface StorageEvent extends Event {
    /** Returns the key of the storage item being changed. */
    readonly key: string | null;
    /** Returns the new value of the key of the storage item whose value is being changed. */
    readonly newValue: string | null;
    /** Returns the old value of the key of the storage item whose value is being changed. */
    readonly oldValue: string | null;
    /** Returns the Storage object that was affected. */
    readonly storageArea: Storage | null;
    /** Returns the URL of the document whose storage item changed. */
    readonly url: string;
    initStorageEvent(type: string, bubbles?: boolean, cancelable?: boolean, key?: string | null, oldValue?: string | null, newValue?: string | null, url?: string | URL, storageArea?: Storage | null): void;
}

export interface WindowEventHandlersEventMap {
    "afterprint": Event;
    "beforeprint": Event;
    "beforeunload": BeforeUnloadEvent;
    "gamepadconnected": GamepadEvent;
    "gamepaddisconnected": GamepadEvent;
    "hashchange": HashChangeEvent;
    "languagechange": Event;
    "message": MessageEvent;
    "messageerror": MessageEvent;
    "offline": Event;
    "online": Event;
    "pagehide": PageTransitionEvent;
    "pageshow": PageTransitionEvent;
    "popstate": PopStateEvent;
    "rejectionhandled": PromiseRejectionEvent;
    "storage": StorageEvent;
    "unhandledrejection": PromiseRejectionEvent;
    "unload": Event;
}

/** This Web Storage API interface provides access to a particular domain's session or local storage. It allows, for example, the addition, modification, or deletion of stored data items. */
export interface Storage {
    [name: string]: any;
    /** Returns the number of key/value pairs. */
    readonly length: number;
    /**
     * Removes all key/value pairs, if there are any.
     *
     * Dispatches a storage event on Window objects holding an equivalent Storage object.
     */
    clear(): void;
    /** Returns the current value associated with the given key, or null if the given key does not exist. */
    getItem(key: string): string | null;
    /** Returns the name of the nth key, or null if n is greater than or equal to the number of key/value pairs. */
    key(index: number): string | null;
    /**
     * Removes the key/value pair with the given key, if a key/value pair with the given key exists.
     *
     * Dispatches a storage event on Window objects holding an equivalent Storage object.
     */
    removeItem(key: string): void;
    /**
     * Sets the value of the pair identified by key to value, creating a new key/value pair if none existed for key previously.
     *
     * Throws a "QuotaExceededError" DOMException exception if the new value couldn't be set. (Setting could fail if, e.g., the user has disabled storage for the site, or if the quota has been exceeded.)
     *
     * Dispatches a storage event on Window objects holding an equivalent Storage object.
     */
    setItem(key: string, value: string): void;
}

/**
 * The storage for Cache objects.
 * Available only in secure contexts.
 */
export interface CacheStorage {
    delete(cacheName: string): Promise<boolean>;
    has(cacheName: string): Promise<boolean>;
    keys(): Promise<string[]>;
    match(request: RequestInfo, options?: MultiCacheQueryOptions): Promise<Response | undefined>;
    open(cacheName: string): Promise<Cache>;
}

/** Basic cryptography features available in the current context. It allows access to a cryptographically strong random number generator and to cryptographic primitives. */
export interface Crypto {
    /** Available only in secure contexts. */
    readonly subtle: SubtleCrypto;
    getRandomValues<T extends ArrayBufferView | null>(array: T): T;
}

/** In the following code snippet, we make a request to open a database, and include handlers for the success and error cases. For a full working example, see our To-do Notifications app (view example live.) */
export interface IDBFactory {
    /**
     * Compares two values as keys. Returns -1 if key1 precedes key2, 1 if key2 precedes key1, and 0 if the keys are equal.
     *
     * Throws a "DataError" DOMException if either input is not a valid key.
     */
    cmp(first: any, second: any): number;
    databases(): Promise<IDBDatabaseInfo[]>;
    /** Attempts to delete the named database. If the database already exists and there are open connections that don't close in response to a versionchange event, the request will be blocked until all they close. If the request is successful request's result will be null. */
    deleteDatabase(name: string): IDBOpenDBRequest;
    /** Attempts to open a connection to the named database with the current version, or 1 if it does not already exist. If the request is successful request's result will be the connection. */
    open(name: string, version?: number): IDBOpenDBRequest;
}

/** Provides access to performance-related information for the current page. It's part of the High Resolution Time API, but is enhanced by the Performance Timeline API, the Navigation Timing API, the User Timing API, and the Resource Timing API. */
export interface Performance extends EventTarget {
    /** @deprecated */
    readonly navigation: PerformanceNavigation;
    onresourcetimingbufferfull: ((this: Performance, ev: Event) => any) | null;
    readonly timeOrigin: DOMHighResTimeStamp;
    /** @deprecated */
    readonly timing: PerformanceTiming;
    clearMarks(markName?: string): void;
    clearMeasures(measureName?: string): void;
    clearResourceTimings(): void;
    getEntries(): PerformanceEntryList;
    getEntriesByName(name: string, type?: string): PerformanceEntryList;
    getEntriesByType(type: string): PerformanceEntryList;
    mark(markName: string, markOptions?: PerformanceMarkOptions): PerformanceMark;
    measure(measureName: string, startOrMeasureOptions?: string | PerformanceMeasureOptions, endMark?: string): PerformanceMeasure;
    now(): DOMHighResTimeStamp;
    setResourceTimingBufferSize(maxSize: number): void;
    toJSON(): any;
    addEventListener<K extends keyof PerformanceEventMap>(type: K, listener: (this: Performance, ev: PerformanceEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof PerformanceEventMap>(type: K, listener: (this: Performance, ev: PerformanceEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

export interface ImageBitmapOptions {
    colorSpaceConversion?: ColorSpaceConversion;
    imageOrientation?: ImageOrientation;
    premultiplyAlpha?: PremultiplyAlpha;
    resizeHeight?: number;
    resizeQuality?: ResizeQuality;
    resizeWidth?: number;
}

export interface ImageBitmap {
    /** Returns the intrinsic height of the image, in CSS pixels. */
    readonly height: number;
    /** Returns the intrinsic width of the image, in CSS pixels. */
    readonly width: number;
    /** Releases imageBitmap's underlying bitmap data. */
    close(): void;
}

export interface RequestInit {
    /** A BodyInit object or null to set request's body. */
    body?: BodyInit | null;
    /** A string indicating how the request will interact with the browser's cache to set request's cache. */
    cache?: RequestCache;
    /** A string indicating whether credentials will be sent with the request always, never, or only when sent to a same-origin URL. Sets request's credentials. */
    credentials?: RequestCredentials;
    /** A Headers object, an object literal, or an array of two-item arrays to set request's headers. */
    headers?: HeadersInit;
    /** A cryptographic hash of the resource to be fetched by request. Sets request's integrity. */
    integrity?: string;
    /** A boolean to set request's keepalive. */
    keepalive?: boolean;
    /** A string to set request's method. */
    method?: string;
    /** A string to indicate whether the request will use CORS, or will be restricted to same-origin URLs. Sets request's mode. */
    mode?: RequestMode;
    /** A string indicating whether request follows redirects, results in an error upon encountering a redirect, or returns the redirect (in an opaque fashion). Sets request's redirect. */
    redirect?: RequestRedirect;
    /** A string whose value is a same-origin URL, "about:client", or the empty string, to set request's referrer. */
    referrer?: string;
    /** A referrer policy to set request's referrerPolicy. */
    referrerPolicy?: ReferrerPolicy;
    /** An AbortSignal to set request's signal. */
    signal?: AbortSignal | null;
    /** Can only be null. Used to disassociate request from any Window. */
    window?: null;
}

/** This Fetch API interface represents the response to a request. */
export interface Response extends Body {
    readonly headers: Headers;
    readonly ok: boolean;
    readonly redirected: boolean;
    readonly status: number;
    readonly statusText: string;
    readonly type: ResponseType;
    readonly url: string;
    clone(): Response;
}

export interface VoidFunction {
    (): void;
}

export interface CustomElementConstructor {
    new(...params: any[]): HTMLElement;
}

export interface ElementDefinitionOptions {
    extends?: string;
}

export interface ARIAMixin {
    ariaAtomic: string;
    ariaAutoComplete: string;
    ariaBusy: string;
    ariaChecked: string;
    ariaColCount: string;
    ariaColIndex: string;
    ariaColSpan: string;
    ariaCurrent: string;
    ariaDisabled: string;
    ariaExpanded: string;
    ariaHasPopup: string;
    ariaHidden: string;
    ariaKeyShortcuts: string;
    ariaLabel: string;
    ariaLevel: string;
    ariaLive: string;
    ariaModal: string;
    ariaMultiLine: string;
    ariaMultiSelectable: string;
    ariaOrientation: string;
    ariaPlaceholder: string;
    ariaPosInSet: string;
    ariaPressed: string;
    ariaReadOnly: string;
    ariaRequired: string;
    ariaRoleDescription: string;
    ariaRowCount: string;
    ariaRowIndex: string;
    ariaRowSpan: string;
    ariaSelected: string;
    ariaSetSize: string;
    ariaSort: string;
    ariaValueMax: string;
    ariaValueMin: string;
    ariaValueNow: string;
    ariaValueText: string;
}

export interface Animatable {
    animate(keyframes: Keyframe[] | PropertyIndexedKeyframes | null, options?: number | KeyframeAnimationOptions): Animation;
    getAnimations(options?: GetAnimationsOptions): Animation[];
}

export interface ChildNode extends Node {
    /**
     * Inserts nodes just after node, while replacing strings in nodes with equivalent Text nodes.
     *
     * Throws a "HierarchyRequestError" DOMException if the constraints of the node tree are violated.
     */
    after(...nodes: (Node | string)[]): void;
    /**
     * Inserts nodes just before node, while replacing strings in nodes with equivalent Text nodes.
     *
     * Throws a "HierarchyRequestError" DOMException if the constraints of the node tree are violated.
     */
    before(...nodes: (Node | string)[]): void;
    /** Removes node. */
    remove(): void;
    /**
     * Replaces node with nodes, while replacing strings in nodes with equivalent Text nodes.
     *
     * Throws a "HierarchyRequestError" DOMException if the constraints of the node tree are violated.
     */
    replaceWith(...nodes: (Node | string)[]): void;
}

export interface InnerHTML {
    innerHTML: string;
}

export interface NonDocumentTypeChildNode {
    /** Returns the first following sibling that is an element, and null otherwise. */
    readonly nextElementSibling: Element | null;
    /** Returns the first preceding sibling that is an element, and null otherwise. */
    readonly previousElementSibling: Element | null;
}

export interface Slottable {
    readonly assignedSlot: HTMLSlotElement | null;
}

/** A collection of Attr objects. Objects inside a NamedNodeMap are not in any particular order, unlike NodeList, although they may be accessed by an index as in an array. */
export interface NamedNodeMap {
    [index: number]: Attr;
    readonly length: number;
    getNamedItem(qualifiedName: string): Attr | null;
    getNamedItemNS(namespace: string | null, localName: string): Attr | null;
    item(index: number): Attr | null;
    removeNamedItem(qualifiedName: string): Attr;
    removeNamedItemNS(namespace: string | null, localName: string): Attr;
    setNamedItem(attr: Attr): Attr | null;
    setNamedItemNS(attr: Attr): Attr | null;
}

/** A set of space-separated tokens. Such a set is returned by Element.classList, HTMLLinkElement.relList, HTMLAnchorElement.relList, HTMLAreaElement.relList, HTMLIframeElement.sandbox, or HTMLOutputElement.htmlFor. It is indexed beginning with 0 as with JavaScript Array objects. DOMTokenList is always case-sensitive. */
export interface DOMTokenList {
    [index: number]: string;
    /** Returns the number of tokens. */
    readonly length: number;
    /**
     * Returns the associated set as string.
     *
     * Can be set, to change the associated attribute.
     */
    value: string;
    toString(): string;
    /**
     * Adds all arguments passed, except those already present.
     *
     * Throws a "SyntaxError" DOMException if one of the arguments is the empty string.
     *
     * Throws an "InvalidCharacterError" DOMException if one of the arguments contains any ASCII whitespace.
     */
    add(...tokens: string[]): void;
    /** Returns true if token is present, and false otherwise. */
    contains(token: string): boolean;
    /** Returns the token with index index. */
    item(index: number): string | null;
    /**
     * Removes arguments passed, if they are present.
     *
     * Throws a "SyntaxError" DOMException if one of the arguments is the empty string.
     *
     * Throws an "InvalidCharacterError" DOMException if one of the arguments contains any ASCII whitespace.
     */
    remove(...tokens: string[]): void;
    /**
     * Replaces token with newToken.
     *
     * Returns true if token was replaced with newToken, and false otherwise.
     *
     * Throws a "SyntaxError" DOMException if one of the arguments is the empty string.
     *
     * Throws an "InvalidCharacterError" DOMException if one of the arguments contains any ASCII whitespace.
     */
    replace(token: string, newToken: string): boolean;
    /**
     * Returns true if token is in the associated attribute's supported tokens. Returns false otherwise.
     *
     * Throws a TypeError if the associated attribute has no supported tokens defined.
     */
    supports(token: string): boolean;
    /**
     * If force is not given, "toggles" token, removing it if it's present and adding it if it's not present. If force is true, adds token (same as add()). If force is false, removes token (same as remove()).
     *
     * Returns true if token is now present, and false otherwise.
     *
     * Throws a "SyntaxError" DOMException if token is empty.
     *
     * Throws an "InvalidCharacterError" DOMException if token contains any spaces.
     */
    toggle(token: string, force?: boolean): boolean;
    forEach(callbackfn: (value: string, key: number, parent: DOMTokenList) => void, thisArg?: any): void;
}

export interface ShadowRoot extends DocumentFragment, DocumentOrShadowRoot, InnerHTML {
    readonly delegatesFocus: boolean;
    readonly host: Element;
    readonly mode: ShadowRootMode;
}

export interface ShadowRootInit {
    delegatesFocus?: boolean;
    mode: ShadowRootMode;
    slotAssignment?: SlotAssignmentMode;
}

export interface HTMLElementTagNameMap {
    "a": HTMLAnchorElement;
    "abbr": HTMLElement;
    "address": HTMLElement;
    "area": HTMLAreaElement;
    "article": HTMLElement;
    "aside": HTMLElement;
    "audio": HTMLAudioElement;
    "b": HTMLElement;
    "base": HTMLBaseElement;
    "bdi": HTMLElement;
    "bdo": HTMLElement;
    "blockquote": HTMLQuoteElement;
    "body": HTMLBodyElement;
    "br": HTMLBRElement;
    "button": HTMLButtonElement;
    "canvas": HTMLCanvasElement;
    "caption": HTMLTableCaptionElement;
    "cite": HTMLElement;
    "code": HTMLElement;
    "col": HTMLTableColElement;
    "colgroup": HTMLTableColElement;
    "data": HTMLDataElement;
    "datalist": HTMLDataListElement;
    "dd": HTMLElement;
    "del": HTMLModElement;
    "details": HTMLDetailsElement;
    "dfn": HTMLElement;
    "dialog": HTMLDialogElement;
    "dir": HTMLDirectoryElement;
    "div": HTMLDivElement;
    "dl": HTMLDListElement;
    "dt": HTMLElement;
    "em": HTMLElement;
    "embed": HTMLEmbedElement;
    "fieldset": HTMLFieldSetElement;
    "figcaption": HTMLElement;
    "figure": HTMLElement;
    "font": HTMLFontElement;
    "footer": HTMLElement;
    "form": HTMLFormElement;
    "frame": HTMLFrameElement;
    "frameset": HTMLFrameSetElement;
    "h1": HTMLHeadingElement;
    "h2": HTMLHeadingElement;
    "h3": HTMLHeadingElement;
    "h4": HTMLHeadingElement;
    "h5": HTMLHeadingElement;
    "h6": HTMLHeadingElement;
    "head": HTMLHeadElement;
    "header": HTMLElement;
    "hgroup": HTMLElement;
    "hr": HTMLHRElement;
    "html": HTMLHtmlElement;
    "i": HTMLElement;
    "iframe": HTMLIFrameElement;
    "img": HTMLImageElement;
    "input": HTMLInputElement;
    "ins": HTMLModElement;
    "kbd": HTMLElement;
    "label": HTMLLabelElement;
    "legend": HTMLLegendElement;
    "li": HTMLLIElement;
    "link": HTMLLinkElement;
    "main": HTMLElement;
    "map": HTMLMapElement;
    "mark": HTMLElement;
    "marquee": HTMLMarqueeElement;
    "menu": HTMLMenuElement;
    "meta": HTMLMetaElement;
    "meter": HTMLMeterElement;
    "nav": HTMLElement;
    "noscript": HTMLElement;
    "object": HTMLObjectElement;
    "ol": HTMLOListElement;
    "optgroup": HTMLOptGroupElement;
    "option": HTMLOptionElement;
    "output": HTMLOutputElement;
    "p": HTMLParagraphElement;
    "param": HTMLParamElement;
    "picture": HTMLPictureElement;
    "pre": HTMLPreElement;
    "progress": HTMLProgressElement;
    "q": HTMLQuoteElement;
    "rp": HTMLElement;
    "rt": HTMLElement;
    "ruby": HTMLElement;
    "s": HTMLElement;
    "samp": HTMLElement;
    "script": HTMLScriptElement;
    "section": HTMLElement;
    "select": HTMLSelectElement;
    "slot": HTMLSlotElement;
    "small": HTMLElement;
    "source": HTMLSourceElement;
    "span": HTMLSpanElement;
    "strong": HTMLElement;
    "style": HTMLStyleElement;
    "sub": HTMLElement;
    "summary": HTMLElement;
    "sup": HTMLElement;
    "table": HTMLTableElement;
    "tbody": HTMLTableSectionElement;
    "td": HTMLTableCellElement;
    "template": HTMLTemplateElement;
    "textarea": HTMLTextAreaElement;
    "tfoot": HTMLTableSectionElement;
    "th": HTMLTableCellElement;
    "thead": HTMLTableSectionElement;
    "time": HTMLTimeElement;
    "title": HTMLTitleElement;
    "tr": HTMLTableRowElement;
    "track": HTMLTrackElement;
    "u": HTMLElement;
    "ul": HTMLUListElement;
    "var": HTMLElement;
    "video": HTMLVideoElement;
    "wbr": HTMLElement;
}

export interface SVGElementTagNameMap {
    "a": SVGAElement;
    "animate": SVGAnimateElement;
    "animateMotion": SVGAnimateMotionElement;
    "animateTransform": SVGAnimateTransformElement;
    "circle": SVGCircleElement;
    "clipPath": SVGClipPathElement;
    "defs": SVGDefsElement;
    "desc": SVGDescElement;
    "ellipse": SVGEllipseElement;
    "feBlend": SVGFEBlendElement;
    "feColorMatrix": SVGFEColorMatrixElement;
    "feComponentTransfer": SVGFEComponentTransferElement;
    "feComposite": SVGFECompositeElement;
    "feConvolveMatrix": SVGFEConvolveMatrixElement;
    "feDiffuseLighting": SVGFEDiffuseLightingElement;
    "feDisplacementMap": SVGFEDisplacementMapElement;
    "feDistantLight": SVGFEDistantLightElement;
    "feDropShadow": SVGFEDropShadowElement;
    "feFlood": SVGFEFloodElement;
    "feFuncA": SVGFEFuncAElement;
    "feFuncB": SVGFEFuncBElement;
    "feFuncG": SVGFEFuncGElement;
    "feFuncR": SVGFEFuncRElement;
    "feGaussianBlur": SVGFEGaussianBlurElement;
    "feImage": SVGFEImageElement;
    "feMerge": SVGFEMergeElement;
    "feMergeNode": SVGFEMergeNodeElement;
    "feMorphology": SVGFEMorphologyElement;
    "feOffset": SVGFEOffsetElement;
    "fePointLight": SVGFEPointLightElement;
    "feSpecularLighting": SVGFESpecularLightingElement;
    "feSpotLight": SVGFESpotLightElement;
    "feTile": SVGFETileElement;
    "feTurbulence": SVGFETurbulenceElement;
    "filter": SVGFilterElement;
    "foreignObject": SVGForeignObjectElement;
    "g": SVGGElement;
    "image": SVGImageElement;
    "line": SVGLineElement;
    "linearGradient": SVGLinearGradientElement;
    "marker": SVGMarkerElement;
    "mask": SVGMaskElement;
    "metadata": SVGMetadataElement;
    "mpath": SVGMPathElement;
    "path": SVGPathElement;
    "pattern": SVGPatternElement;
    "polygon": SVGPolygonElement;
    "polyline": SVGPolylineElement;
    "radialGradient": SVGRadialGradientElement;
    "rect": SVGRectElement;
    "script": SVGScriptElement;
    "set": SVGSetElement;
    "stop": SVGStopElement;
    "style": SVGStyleElement;
    "svg": SVGSVGElement;
    "switch": SVGSwitchElement;
    "symbol": SVGSymbolElement;
    "text": SVGTextElement;
    "textPath": SVGTextPathElement;
    "title": SVGTitleElement;
    "tspan": SVGTSpanElement;
    "use": SVGUseElement;
    "view": SVGViewElement;
}

/** A DOM element's attribute as an object. In most DOM methods, you will probably directly retrieve the attribute as a string (e.g., Element.getAttribute(), but certain functions (e.g., Element.getAttributeNode()) or means of iterating give Attr types. */
export interface Attr extends Node {
    readonly localName: string;
    readonly name: string;
    readonly namespaceURI: string | null;
    readonly ownerDocument: Document;
    readonly ownerElement: Element | null;
    readonly prefix: string | null;
    readonly specified: boolean;
    value: string;
}

export interface DOMRect extends DOMRectReadOnly {
    height: number;
    width: number;
    x: number;
    y: number;
}

export interface DOMRectList {
    [index: number]: DOMRect;
    readonly length: number;
    item(index: number): DOMRect | null;
}

/** All of the SVG DOM interfaces that correspond directly to elements in the SVG language derive from the SVGElement interface. */
export interface SVGElement extends Element, DocumentAndElementEventHandlers, ElementCSSInlineStyle, GlobalEventHandlers, HTMLOrSVGElement {
    /** @deprecated */
    readonly className: any;
    readonly ownerSVGElement: SVGSVGElement | null;
    readonly viewportElement: SVGElement | null;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

export interface FullscreenOptions {
    navigationUI?: FullscreenNavigationUI;
}

export interface ScrollToOptions extends ScrollOptions {
    left?: number;
    top?: number;
}

export interface ScrollIntoViewOptions extends ScrollOptions {
    block?: ScrollLogicalPosition;
    inline?: ScrollLogicalPosition;
}

export interface ElementEventMap {
    "fullscreenchange": Event;
    "fullscreenerror": Event;
}

export interface NodeListOf<TNode extends Node> extends NodeList {
    [index: number]: TNode;
    item(index: number): TNode;
    /**
     * Performs the specified action for each node in an list.
     * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the list.
     * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    forEach(callbackfn: (value: TNode, key: number, parent: NodeListOf<TNode>) => void, thisArg?: any): void;
}

export interface GetRootNodeOptions {
    composed?: boolean;
}

/** Events providing information related to modification of the clipboard, that is cut, copy, and paste events. */
export interface ClipboardEvent extends Event {
    readonly clipboardData: DataTransfer | null;
}

export interface DocumentAndElementEventHandlersEventMap {
    "copy": ClipboardEvent;
    "cut": ClipboardEvent;
    "paste": ClipboardEvent;
}

/** A list of StyleSheet. */
export interface StyleSheetList {
    [index: number]: CSSStyleSheet;
    readonly length: number;
    item(index: number): CSSStyleSheet | null;
}

export interface Animation extends EventTarget {
    currentTime: CSSNumberish | null;
    effect: AnimationEffect | null;
    readonly finished: Promise<Animation>;
    id: string;
    oncancel: ((this: Animation, ev: AnimationPlaybackEvent) => any) | null;
    onfinish: ((this: Animation, ev: AnimationPlaybackEvent) => any) | null;
    onremove: ((this: Animation, ev: Event) => any) | null;
    readonly pending: boolean;
    readonly playState: AnimationPlayState;
    playbackRate: number;
    readonly ready: Promise<Animation>;
    readonly replaceState: AnimationReplaceState;
    startTime: CSSNumberish | null;
    timeline: AnimationTimeline | null;
    cancel(): void;
    commitStyles(): void;
    finish(): void;
    pause(): void;
    persist(): void;
    play(): void;
    reverse(): void;
    updatePlaybackRate(playbackRate: number): void;
    addEventListener<K extends keyof AnimationEventMap>(type: K, listener: (this: Animation, ev: AnimationEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof AnimationEventMap>(type: K, listener: (this: Animation, ev: AnimationEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

export interface FontFaceSet extends EventTarget {
    onloading: ((this: FontFaceSet, ev: Event) => any) | null;
    onloadingdone: ((this: FontFaceSet, ev: Event) => any) | null;
    onloadingerror: ((this: FontFaceSet, ev: Event) => any) | null;
    readonly ready: Promise<FontFaceSet>;
    readonly status: FontFaceSetLoadStatus;
    check(font: string, text?: string): boolean;
    load(font: string, text?: string): Promise<FontFace[]>;
    forEach(callbackfn: (value: FontFace, key: FontFace, parent: FontFaceSet) => void, thisArg?: any): void;
    addEventListener<K extends keyof FontFaceSetEventMap>(type: K, listener: (this: FontFaceSet, ev: FontFaceSetEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof FontFaceSetEventMap>(type: K, listener: (this: FontFaceSet, ev: FontFaceSetEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** This interface is a compiled XPath expression that can be evaluated on a document or specific node to return information its DOM tree. */
export interface XPathExpression {
    evaluate(contextNode: Node, type?: number, result?: XPathResult | null): XPathResult;
}

/** The results generated by evaluating an XPath expression within the context of a given node. */
export interface XPathResult {
    readonly booleanValue: boolean;
    readonly invalidIteratorState: boolean;
    readonly numberValue: number;
    readonly resultType: number;
    readonly singleNodeValue: Node | null;
    readonly snapshotLength: number;
    readonly stringValue: string;
    readonly ANY_TYPE: number;
    readonly ANY_UNORDERED_NODE_TYPE: number;
    readonly BOOLEAN_TYPE: number;
    readonly FIRST_ORDERED_NODE_TYPE: number;
    readonly NUMBER_TYPE: number;
    readonly ORDERED_NODE_ITERATOR_TYPE: number;
    readonly ORDERED_NODE_SNAPSHOT_TYPE: number;
    readonly STRING_TYPE: number;
    readonly UNORDERED_NODE_ITERATOR_TYPE: number;
    readonly UNORDERED_NODE_SNAPSHOT_TYPE: number;
    iterateNext(): Node | null;
    snapshotItem(index: number): Node | null;
}

/** A generic collection (array-like object similar to arguments) of elements (in document order) and offers methods and properties for selecting from the list. */
export interface HTMLCollectionBase {
    [index: number]: Element;
    /** Sets or retrieves the number of objects in a collection. */
    readonly length: number;
    /** Retrieves an object from various collections. */
    item(index: number): Element | null;
}

export interface HTMLHyperlinkElementUtils {
    /**
     * Returns the hyperlink's URL's fragment (includes leading "#" if non-empty).
     *
     * Can be set, to change the URL's fragment (ignores leading "#").
     */
    hash: string;
    /**
     * Returns the hyperlink's URL's host and port (if different from the default port for the scheme).
     *
     * Can be set, to change the URL's host and port.
     */
    host: string;
    /**
     * Returns the hyperlink's URL's host.
     *
     * Can be set, to change the URL's host.
     */
    hostname: string;
    /**
     * Returns the hyperlink's URL.
     *
     * Can be set, to change the URL.
     */
    href: string;
    /** Returns the hyperlink's URL's origin. */
    readonly origin: string;
    /**
     * Returns the hyperlink's URL's password.
     *
     * Can be set, to change the URL's password.
     */
    password: string;
    /**
     * Returns the hyperlink's URL's path.
     *
     * Can be set, to change the URL's path.
     */
    pathname: string;
    /**
     * Returns the hyperlink's URL's port.
     *
     * Can be set, to change the URL's port.
     */
    port: string;
    /**
     * Returns the hyperlink's URL's scheme.
     *
     * Can be set, to change the URL's scheme.
     */
    protocol: string;
    /**
     * Returns the hyperlink's URL's query (includes leading "?" if non-empty).
     *
     * Can be set, to change the URL's query (ignores leading "?").
     */
    search: string;
    /**
     * Returns the hyperlink's URL's username.
     *
     * Can be set, to change the URL's username.
     */
    username: string;
    toString(): string;
}

export interface HTMLElementEventMap extends ElementEventMap, DocumentAndElementEventHandlersEventMap, GlobalEventHandlersEventMap {
}

export interface ElementCSSInlineStyle {
    readonly style: CSSStyleDeclaration;
}

export interface ElementContentEditable {
    contentEditable: string;
    enterKeyHint: string;
    inputMode: string;
    readonly isContentEditable: boolean;
}

export interface HTMLOrSVGElement {
    autofocus: boolean;
    readonly dataset: DOMStringMap;
    nonce?: string;
    tabIndex: number;
    blur(): void;
    focus(options?: FocusOptions): void;
}

export interface ElementInternals extends ARIAMixin {
    /** Returns the ShadowRoot for internals's target element, if the target element is a shadow host, or null otherwise. */
    readonly shadowRoot: ShadowRoot | null;
}

/** HTML <script> elements expose the HTMLScriptElement interface, which provides special properties and methods for manipulating the behavior and execution of <script> elements (beyond the inherited HTMLElement interface). */
export interface HTMLScriptElement extends HTMLElement {
    async: boolean;
    /**
     * Sets or retrieves the character set used to encode the object.
     * @deprecated
     */
    charset: string;
    crossOrigin: string | null;
    /** Sets or retrieves the status of the script. */
    defer: boolean;
    /**
     * Sets or retrieves the event for which the script is written.
     * @deprecated
     */
    event: string;
    /**
     * Sets or retrieves the object that is bound to the event script.
     * @deprecated
     */
    htmlFor: string;
    integrity: string;
    noModule: boolean;
    referrerPolicy: string;
    /** Retrieves the URL to an external file that contains the source code or data. */
    src: string;
    /** Retrieves or sets the text of the object as a string. */
    text: string;
    /** Sets or retrieves the MIME type for the associated scripting engine. */
    type: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLScriptElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLScriptElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Corresponds to the SVG <script> element. */
export interface SVGScriptElement extends SVGElement, SVGURIReference {
    type: string;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGScriptElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGScriptElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** A collection of HTML form control elements. */
export interface HTMLFormControlsCollection extends HTMLCollectionBase {
    /**
     * Returns the item with ID or name name from the collection.
     *
     * If there are multiple matching items, then a RadioNodeList object containing all those elements is returned.
     */
    namedItem(name: string): RadioNodeList | Element | null;
}

/** An XML document. It inherits from the generic Document and does not add any specific methods or properties to it: nevertheless, several algorithms behave differently with the two types of documents. */
export interface XMLDocument extends Document {
    addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: XMLDocument, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: XMLDocument, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

export interface NetworkInformation extends EventTarget {
    readonly type: ConnectionType;
}

/**
 * Returns an array of MimeType instances, each of which contains information about a supported browser plugins. This object is returned by NavigatorPlugins.mimeTypes.
 * @deprecated
 */
export interface MimeTypeArray {
    [index: number]: MimeType;
    /** @deprecated */
    readonly length: number;
    /** @deprecated */
    item(index: number): MimeType | null;
    /** @deprecated */
    namedItem(name: string): MimeType | null;
}

/**
 * Used to store a list of Plugin objects describing the available plugins; it's returned by the window.navigator.plugins property. The PluginArray is not a JavaScript array, but has the length property and supports accessing individual items using bracket notation (plugins[2]), as well as via item(index) and namedItem("name") methods.
 * @deprecated
 */
export interface PluginArray {
    [index: number]: Plugin;
    /** @deprecated */
    readonly length: number;
    /** @deprecated */
    item(index: number): Plugin | null;
    /** @deprecated */
    namedItem(name: string): Plugin | null;
    /** @deprecated */
    refresh(): void;
}

/** Available only in secure contexts. */
export interface StorageManager {
    estimate(): Promise<StorageEstimate>;
    persist(): Promise<boolean>;
    persisted(): Promise<boolean>;
}

export interface CredentialCreationOptions {
    publicKey?: PublicKeyCredentialCreationOptions;
    signal?: AbortSignal;
}

/** Available only in secure contexts. */
export interface Credential {
    readonly id: string;
    readonly type: string;
}

export interface CredentialRequestOptions {
    mediation?: CredentialMediationRequirement;
    publicKey?: PublicKeyCredentialRequestOptions;
    signal?: AbortSignal;
}

export interface PositionCallback {
    (position: GeolocationPosition): void;
}

export interface PositionErrorCallback {
    (positionError: GeolocationPositionError): void;
}

export interface PositionOptions {
    enableHighAccuracy?: boolean;
    maximumAge?: number;
    timeout?: number;
}

export interface MediaDecodingConfiguration extends MediaConfiguration {
    type: MediaDecodingType;
}

export interface MediaCapabilitiesDecodingInfo extends MediaCapabilitiesInfo {
    configuration?: MediaDecodingConfiguration;
}

export interface MediaEncodingConfiguration extends MediaConfiguration {
    type: MediaEncodingType;
}

export interface MediaCapabilitiesEncodingInfo extends MediaCapabilitiesInfo {
    configuration?: MediaEncodingConfiguration;
}

/**
 * The MediaDevicesInfo interface contains information that describes a single media input or output device.
 * Available only in secure contexts.
 */
export interface MediaDeviceInfo {
    readonly deviceId: string;
    readonly groupId: string;
    readonly kind: MediaDeviceKind;
    readonly label: string;
    toJSON(): any;
}

export interface DisplayMediaStreamConstraints {
    audio?: boolean | MediaTrackConstraints;
    video?: boolean | MediaTrackConstraints;
}

/** A stream of media content. A stream consists of several tracks such as video or audio tracks. Each track is specified as an instance of MediaStreamTrack. */
export interface MediaStream extends EventTarget {
    readonly active: boolean;
    readonly id: string;
    onaddtrack: ((this: MediaStream, ev: MediaStreamTrackEvent) => any) | null;
    onremovetrack: ((this: MediaStream, ev: MediaStreamTrackEvent) => any) | null;
    addTrack(track: MediaStreamTrack): void;
    clone(): MediaStream;
    getAudioTracks(): MediaStreamTrack[];
    getTrackById(trackId: string): MediaStreamTrack | null;
    getTracks(): MediaStreamTrack[];
    getVideoTracks(): MediaStreamTrack[];
    removeTrack(track: MediaStreamTrack): void;
    addEventListener<K extends keyof MediaStreamEventMap>(type: K, listener: (this: MediaStream, ev: MediaStreamEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof MediaStreamEventMap>(type: K, listener: (this: MediaStream, ev: MediaStreamEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

export interface MediaTrackSupportedConstraints {
    aspectRatio?: boolean;
    autoGainControl?: boolean;
    deviceId?: boolean;
    echoCancellation?: boolean;
    facingMode?: boolean;
    frameRate?: boolean;
    groupId?: boolean;
    height?: boolean;
    noiseSuppression?: boolean;
    sampleRate?: boolean;
    sampleSize?: boolean;
    suppressLocalAudioPlayback?: boolean;
    width?: boolean;
}

export interface MediaStreamConstraints {
    audio?: boolean | MediaTrackConstraints;
    peerIdentity?: string;
    preferCurrentTab?: boolean;
    video?: boolean | MediaTrackConstraints;
}

export interface MediaDevicesEventMap {
    "devicechange": Event;
}

export interface MediaMetadata {
    album: string;
    artist: string;
    artwork: ReadonlyArray<MediaImage>;
    title: string;
}

export interface MediaSessionActionHandler {
    (details: MediaSessionActionDetails): void;
}

export interface MediaPositionState {
    duration?: number;
    playbackRate?: number;
    position?: number;
}

export interface PermissionDescriptor {
    name: PermissionName;
}

export interface PermissionStatus extends EventTarget {
    onchange: ((this: PermissionStatus, ev: Event) => any) | null;
    readonly state: PermissionState;
    addEventListener<K extends keyof PermissionStatusEventMap>(type: K, listener: (this: PermissionStatus, ev: PermissionStatusEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof PermissionStatusEventMap>(type: K, listener: (this: PermissionStatus, ev: PermissionStatusEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/**
 * This ServiceWorker API interface provides a reference to a service worker. Multiple browsing contexts (e.g. pages, workers, etc.) can be associated with the same service worker, each through a unique ServiceWorker object.
 * Available only in secure contexts.
 */
export interface ServiceWorker extends EventTarget, AbstractWorker {
    onstatechange: ((this: ServiceWorker, ev: Event) => any) | null;
    readonly scriptURL: string;
    readonly state: ServiceWorkerState;
    postMessage(message: any, transfer: Transferable[]): void;
    postMessage(message: any, options?: StructuredSerializeOptions): void;
    addEventListener<K extends keyof ServiceWorkerEventMap>(type: K, listener: (this: ServiceWorker, ev: ServiceWorkerEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof ServiceWorkerEventMap>(type: K, listener: (this: ServiceWorker, ev: ServiceWorkerEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/**
 * This ServiceWorker API interface represents the service worker registration. You register a service worker to control one or more pages that share the same origin.
 * Available only in secure contexts.
 */
export interface ServiceWorkerRegistration extends EventTarget {
    readonly active: ServiceWorker | null;
    readonly installing: ServiceWorker | null;
    onupdatefound: ((this: ServiceWorkerRegistration, ev: Event) => any) | null;
    readonly pushManager: PushManager;
    readonly scope: string;
    readonly updateViaCache: ServiceWorkerUpdateViaCache;
    readonly waiting: ServiceWorker | null;
    getNotifications(filter?: GetNotificationOptions): Promise<Notification[]>;
    showNotification(title: string, options?: NotificationOptions): Promise<void>;
    unregister(): Promise<boolean>;
    update(): Promise<void>;
    addEventListener<K extends keyof ServiceWorkerRegistrationEventMap>(type: K, listener: (this: ServiceWorkerRegistration, ev: ServiceWorkerRegistrationEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof ServiceWorkerRegistrationEventMap>(type: K, listener: (this: ServiceWorkerRegistration, ev: ServiceWorkerRegistrationEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

export interface RegistrationOptions {
    scope?: string;
    type?: WorkerType;
    updateViaCache?: ServiceWorkerUpdateViaCache;
}

export interface ServiceWorkerContainerEventMap {
    "controllerchange": Event;
    "message": MessageEvent;
    "messageerror": MessageEvent;
}

/** Provides information about files and allows JavaScript in a web page to access their content. */
export interface File extends Blob {
    readonly lastModified: number;
    readonly name: string;
    readonly webkitRelativePath: string;
}

/**
 * An individual button of a gamepad or other controller, allowing access to the current state of different types of buttons available on the control device.
 * Available only in secure contexts.
 */
export interface GamepadButton {
    readonly pressed: boolean;
    readonly touched: boolean;
    readonly value: number;
}

/** This Gamepad API interface represents hardware in the controller designed to provide haptic feedback to the user (if available), most commonly vibration hardware. */
export interface GamepadHapticActuator {
    readonly type: GamepadHapticActuatorType;
}

export interface MediaKeySystemMediaCapability {
    contentType?: string;
    encryptionScheme?: string | null;
    robustness?: string;
}

/**
 * This EncryptedMediaExtensions API interface the represents a set of keys that an associated HTMLMediaElement can use for decryption of media data during playback.
 * Available only in secure contexts.
 */
export interface MediaKeys {
    createSession(sessionType?: MediaKeySessionType): MediaKeySession;
    setServerCertificate(serverCertificate: BufferSource): Promise<boolean>;
}

export interface URLSearchParams {
    /** Appends a specified key/value pair as a new search parameter. */
    append(name: string, value: string): void;
    /** Deletes the given search parameter, and its associated value, from the list of all search parameters. */
    delete(name: string): void;
    /** Returns the first value associated to the given search parameter. */
    get(name: string): string | null;
    /** Returns all the values association with a given search parameter. */
    getAll(name: string): string[];
    /** Returns a Boolean indicating if such a search parameter exists. */
    has(name: string): boolean;
    /** Sets the value associated to a given search parameter to the given value. If there were several values, delete the others. */
    set(name: string, value: string): void;
    sort(): void;
    /** Returns a string containing a query string suitable for use in a URL. Does not include the question mark. */
    toString(): string;
    forEach(callbackfn: (value: string, key: string, parent: URLSearchParams) => void, thisArg?: any): void;
}

/** This Streams API interface represents a readable stream of byte data. The Fetch API offers a concrete instance of a ReadableStream through the body property of a Response object. */
export interface ReadableStream<R = any> {
    readonly locked: boolean;
    cancel(reason?: any): Promise<void>;
    getReader(): ReadableStreamDefaultReader<R>;
    pipeThrough<T>(transform: ReadableWritablePair<T, R>, options?: StreamPipeOptions): ReadableStream<T>;
    pipeTo(destination: WritableStream<R>, options?: StreamPipeOptions): Promise<void>;
    tee(): [ReadableStream<R>, ReadableStream<R>];
}

export interface EventListener {
    (evt: Event): void;
}

export interface EventListenerObject {
    handleEvent(object: Event): void;
}

/** A signal object that allows you to communicate with a DOM request (such as a Fetch) and abort it if required via an AbortController object. */
export interface AbortSignal extends EventTarget {
    /** Returns true if this AbortSignal's AbortController has signaled to abort, and false otherwise. */
    readonly aborted: boolean;
    onabort: ((this: AbortSignal, ev: Event) => any) | null;
    addEventListener<K extends keyof AbortSignalEventMap>(type: K, listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof AbortSignalEventMap>(type: K, listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Used to hold the data that is being dragged during a drag and drop operation. It may hold one or more data items, each of one or more data types. For more information about drag and drop, see HTML Drag and Drop API. */
export interface DataTransfer {
    /**
     * Returns the kind of operation that is currently selected. If the kind of operation isn't one of those that is allowed by the effectAllowed attribute, then the operation will fail.
     *
     * Can be set, to change the selected operation.
     *
     * The possible values are "none", "copy", "link", and "move".
     */
    dropEffect: "none" | "copy" | "link" | "move";
    /**
     * Returns the kinds of operations that are to be allowed.
     *
     * Can be set (during the dragstart event), to change the allowed operations.
     *
     * The possible values are "none", "copy", "copyLink", "copyMove", "link", "linkMove", "move", "all", and "uninitialized",
     */
    effectAllowed: "none" | "copy" | "copyLink" | "copyMove" | "link" | "linkMove" | "move" | "all" | "uninitialized";
    /** Returns a FileList of the files being dragged, if any. */
    readonly files: FileList;
    /** Returns a DataTransferItemList object, with the drag data. */
    readonly items: DataTransferItemList;
    /** Returns a frozen array listing the formats that were set in the dragstart event. In addition, if any files are being dragged, then one of the types will be the string "Files". */
    readonly types: ReadonlyArray<string>;
    /** Removes the data of the specified formats. Removes all data if the argument is omitted. */
    clearData(format?: string): void;
    /** Returns the specified data. If there is no such data, returns the empty string. */
    getData(format: string): string;
    /** Adds the specified data. */
    setData(format: string, data: string): void;
    /** Uses the given element to update the drag feedback, replacing any previously specified feedback. */
    setDragImage(image: Element, x: number, y: number): void;
}

export interface OnErrorEventHandlerNonNull {
    (event: Event | string, source?: string, lineno?: number, colno?: number, error?: Error): any;
}

/** Provides a way to easily construct a set of key/value pairs representing form fields and their values, which can then be easily sent using the XMLHttpRequest.send() method. It uses the same format a form would use if the encoding type were set to "multipart/form-data". */
export interface FormData {
    append(name: string, value: string | Blob, fileName?: string): void;
    delete(name: string): void;
    get(name: string): FormDataEntryValue | null;
    getAll(name: string): FormDataEntryValue[];
    has(name: string): boolean;
    set(name: string, value: string | Blob, fileName?: string): void;
    forEach(callbackfn: (value: FormDataEntryValue, key: string, parent: FormData) => void, thisArg?: any): void;
}

/** A list of contact points on a touch surface. For example, if the user has three fingers on the touch surface (such as a screen or trackpad), the corresponding TouchList object would have one Touch object for each finger, for a total of three entries. */
export interface TouchList {
    [index: number]: Touch;
    readonly length: number;
    item(index: number): Touch | null;
}

export interface InputEvent extends UIEvent {
    readonly data: string | null;
    readonly dataTransfer: DataTransfer | null;
    readonly inputType: string;
    readonly isComposing: boolean;
    getTargetRanges(): StaticRange[];
}

/** The DOM CompositionEvent represents events that occur due to the user indirectly entering text. */
export interface CompositionEvent extends UIEvent {
    readonly data: string;
    /** @deprecated */
    initCompositionEvent(typeArg: string, bubblesArg?: boolean, cancelableArg?: boolean, viewArg?: WindowProxy | null, dataArg?: string): void;
}

/** Events providing information related to errors in scripts or in files. */
export interface ErrorEvent extends Event {
    readonly colno: number;
    readonly error: any;
    readonly filename: string;
    readonly lineno: number;
    readonly message: string;
}

/** Inherits from Event, and represents the event object of an event sent on a document or worker when its content security policy is violated. */
export interface SecurityPolicyViolationEvent extends Event {
    readonly blockedURI: string;
    readonly columnNumber: number;
    readonly disposition: SecurityPolicyViolationEventDisposition;
    readonly documentURI: string;
    readonly effectiveDirective: string;
    readonly lineNumber: number;
    readonly originalPolicy: string;
    readonly referrer: string;
    readonly sample: string;
    readonly sourceFile: string;
    readonly statusCode: number;
    readonly violatedDirective: string;
}

/** This Channel Messaging API interface represents one of the two ports of a MessageChannel, allowing messages to be sent from one port and listening out for them arriving at the other. */
export interface MessagePort extends EventTarget {
    onmessage: ((this: MessagePort, ev: MessageEvent) => any) | null;
    onmessageerror: ((this: MessagePort, ev: MessageEvent) => any) | null;
    /** Disconnects the port, so that it is no longer active. */
    close(): void;
    /**
     * Posts a message through the channel. Objects listed in transfer are transferred, not just cloned, meaning that they are no longer usable on the sending side.
     *
     * Throws a "DataCloneError" DOMException if transfer contains duplicate objects or port, or if message could not be cloned.
     */
    postMessage(message: any, transfer: Transferable[]): void;
    postMessage(message: any, options?: StructuredSerializeOptions): void;
    /** Begins dispatching messages received on the port. */
    start(): void;
    addEventListener<K extends keyof MessagePortEventMap>(type: K, listener: (this: MessagePort, ev: MessagePortEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof MessagePortEventMap>(type: K, listener: (this: MessagePort, ev: MessagePortEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

export interface MultiCacheQueryOptions extends CacheQueryOptions {
    cacheName?: string;
}

/**
 * Provides a storage mechanism for Request / Response object pairs that are cached, for example as part of the ServiceWorker life cycle. Note that the Cache interface is exposed to windowed scopes as well as workers. You don't have to use it in conjunction with service workers, even though it is defined in the service worker spec.
 * Available only in secure contexts.
 */
export interface Cache {
    add(request: RequestInfo): Promise<void>;
    addAll(requests: RequestInfo[]): Promise<void>;
    delete(request: RequestInfo, options?: CacheQueryOptions): Promise<boolean>;
    keys(request?: RequestInfo, options?: CacheQueryOptions): Promise<ReadonlyArray<Request>>;
    match(request: RequestInfo, options?: CacheQueryOptions): Promise<Response | undefined>;
    matchAll(request?: RequestInfo, options?: CacheQueryOptions): Promise<ReadonlyArray<Response>>;
    put(request: RequestInfo, response: Response): Promise<void>;
}

/**
 * This Web Crypto API interface provides a number of low-level cryptographic functions. It is accessed via the Crypto.subtle properties available in a window context (via Window.crypto).
 * Available only in secure contexts.
 */
export interface SubtleCrypto {
    decrypt(algorithm: AlgorithmIdentifier | RsaOaepParams | AesCtrParams | AesCbcParams | AesGcmParams, key: CryptoKey, data: BufferSource): Promise<any>;
    deriveBits(algorithm: AlgorithmIdentifier | EcdhKeyDeriveParams | HkdfParams | Pbkdf2Params, baseKey: CryptoKey, length: number): Promise<ArrayBuffer>;
    deriveKey(algorithm: AlgorithmIdentifier | EcdhKeyDeriveParams | HkdfParams | Pbkdf2Params, baseKey: CryptoKey, derivedKeyType: AlgorithmIdentifier | AesDerivedKeyParams | HmacImportParams | HkdfParams | Pbkdf2Params, extractable: boolean, keyUsages: KeyUsage[]): Promise<CryptoKey>;
    digest(algorithm: AlgorithmIdentifier, data: BufferSource): Promise<ArrayBuffer>;
    encrypt(algorithm: AlgorithmIdentifier | RsaOaepParams | AesCtrParams | AesCbcParams | AesGcmParams, key: CryptoKey, data: BufferSource): Promise<any>;
    exportKey(format: "jwk", key: CryptoKey): Promise<JsonWebKey>;
    exportKey(format: Exclude<KeyFormat, "jwk">, key: CryptoKey): Promise<ArrayBuffer>;
    generateKey(algorithm: RsaHashedKeyGenParams | EcKeyGenParams, extractable: boolean, keyUsages: KeyUsage[]): Promise<CryptoKeyPair>;
    generateKey(algorithm: AesKeyGenParams | HmacKeyGenParams | Pbkdf2Params, extractable: boolean, keyUsages: KeyUsage[]): Promise<CryptoKey>;
    generateKey(algorithm: AlgorithmIdentifier, extractable: boolean, keyUsages: KeyUsage[]): Promise<CryptoKeyPair | CryptoKey>;
    importKey(format: "jwk", keyData: JsonWebKey, algorithm: AlgorithmIdentifier | RsaHashedImportParams | EcKeyImportParams | HmacImportParams | AesKeyAlgorithm, extractable: boolean, keyUsages: KeyUsage[]): Promise<CryptoKey>;
    importKey(format: Exclude<KeyFormat, "jwk">, keyData: BufferSource, algorithm: AlgorithmIdentifier | RsaHashedImportParams | EcKeyImportParams | HmacImportParams | AesKeyAlgorithm, extractable: boolean, keyUsages: KeyUsage[]): Promise<CryptoKey>;
    sign(algorithm: AlgorithmIdentifier | RsaPssParams | EcdsaParams, key: CryptoKey, data: BufferSource): Promise<ArrayBuffer>;
    unwrapKey(format: KeyFormat, wrappedKey: BufferSource, unwrappingKey: CryptoKey, unwrapAlgorithm: AlgorithmIdentifier | RsaOaepParams | AesCtrParams | AesCbcParams | AesGcmParams, unwrappedKeyAlgorithm: AlgorithmIdentifier | RsaHashedImportParams | EcKeyImportParams | HmacImportParams | AesKeyAlgorithm, extractable: boolean, keyUsages: KeyUsage[]): Promise<CryptoKey>;
    verify(algorithm: AlgorithmIdentifier | RsaPssParams | EcdsaParams, key: CryptoKey, signature: BufferSource, data: BufferSource): Promise<boolean>;
    wrapKey(format: KeyFormat, key: CryptoKey, wrappingKey: CryptoKey, wrapAlgorithm: AlgorithmIdentifier | RsaOaepParams | AesCtrParams | AesCbcParams | AesGcmParams): Promise<ArrayBuffer>;
}

export interface IDBDatabaseInfo {
    name?: string;
    version?: number;
}

/** Also inherits methods from its parents IDBRequest and EventTarget. */
export interface IDBOpenDBRequest extends IDBRequest<IDBDatabase> {
    onblocked: ((this: IDBOpenDBRequest, ev: Event) => any) | null;
    onupgradeneeded: ((this: IDBOpenDBRequest, ev: IDBVersionChangeEvent) => any) | null;
    addEventListener<K extends keyof IDBOpenDBRequestEventMap>(type: K, listener: (this: IDBOpenDBRequest, ev: IDBOpenDBRequestEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof IDBOpenDBRequestEventMap>(type: K, listener: (this: IDBOpenDBRequest, ev: IDBOpenDBRequestEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/**
 * The legacy PerformanceNavigation interface represents information about how the navigation to the current document was done.
 * @deprecated This interface is deprecated in the Navigation Timing Level 2 specification. Please use the PerformanceNavigationTiming interface instead.
 */
export interface PerformanceNavigation {
    /** @deprecated */
    readonly redirectCount: number;
    /** @deprecated */
    readonly type: number;
    readonly TYPE_BACK_FORWARD: number;
    readonly TYPE_NAVIGATE: number;
    readonly TYPE_RELOAD: number;
    readonly TYPE_RESERVED: number;
    /** @deprecated */
    toJSON(): any;
}

/**
 * A legacy interface kept for backwards compatibility and contains properties that offer performance timing information for various events which occur during the loading and use of the current page. You get a PerformanceTiming object describing your page using the window.performance.timing property.
 * @deprecated This interface is deprecated in the Navigation Timing Level 2 specification. Please use the PerformanceNavigationTiming interface instead.
 */
export interface PerformanceTiming {
    /** @deprecated */
    readonly connectEnd: number;
    /** @deprecated */
    readonly connectStart: number;
    /** @deprecated */
    readonly domComplete: number;
    /** @deprecated */
    readonly domContentLoadedEventEnd: number;
    /** @deprecated */
    readonly domContentLoadedEventStart: number;
    /** @deprecated */
    readonly domInteractive: number;
    /** @deprecated */
    readonly domLoading: number;
    /** @deprecated */
    readonly domainLookupEnd: number;
    /** @deprecated */
    readonly domainLookupStart: number;
    /** @deprecated */
    readonly fetchStart: number;
    /** @deprecated */
    readonly loadEventEnd: number;
    /** @deprecated */
    readonly loadEventStart: number;
    /** @deprecated */
    readonly navigationStart: number;
    /** @deprecated */
    readonly redirectEnd: number;
    /** @deprecated */
    readonly redirectStart: number;
    /** @deprecated */
    readonly requestStart: number;
    /** @deprecated */
    readonly responseEnd: number;
    /** @deprecated */
    readonly responseStart: number;
    /** @deprecated */
    readonly secureConnectionStart: number;
    /** @deprecated */
    readonly unloadEventEnd: number;
    /** @deprecated */
    readonly unloadEventStart: number;
    /** @deprecated */
    toJSON(): any;
}

export interface PerformanceMarkOptions {
    detail?: any;
    startTime?: DOMHighResTimeStamp;
}

/** PerformanceMark is an abstract interface for PerformanceEntry objects with an entryType of "mark". Entries of this type are created by calling performance.mark() to add a named DOMHighResTimeStamp (the mark) to the browser's performance timeline. */
export interface PerformanceMark extends PerformanceEntry {
    readonly detail: any;
}

export interface PerformanceMeasureOptions {
    detail?: any;
    duration?: DOMHighResTimeStamp;
    end?: string | DOMHighResTimeStamp;
    start?: string | DOMHighResTimeStamp;
}

/** PerformanceMeasure is an abstract interface for PerformanceEntry objects with an entryType of "measure". Entries of this type are created by calling performance.measure() to add a named DOMHighResTimeStamp (the measure) between two marks to the browser's performance timeline. */
export interface PerformanceMeasure extends PerformanceEntry {
    readonly detail: any;
}

export interface PerformanceEventMap {
    "resourcetimingbufferfull": Event;
}

/** A file-like object of immutable, raw data. Blobs represent data that isn't necessarily in a JavaScript-native format. The File interface is based on Blob, inheriting blob functionality and expanding it to support files on the user's system. */
export interface Blob {
    readonly size: number;
    readonly type: string;
    arrayBuffer(): Promise<ArrayBuffer>;
    slice(start?: number, end?: number, contentType?: string): Blob;
    stream(): ReadableStream;
    text(): Promise<string>;
}

/** The underlying pixel data of an area of a <canvas> element. It is created using the ImageData() constructor or creator methods on the CanvasRenderingContext2D object associated with a canvas: createImageData() and getImageData(). It can also be used to set a part of the canvas by using putImageData(). */
export interface ImageData {
    /** Returns the one-dimensional array containing the data in RGBA order, as integers in the range 0 to 255. */
    readonly data: Uint8ClampedArray;
    /** Returns the actual dimensions of the data in the ImageData object, in pixels. */
    readonly height: number;
    /** Returns the actual dimensions of the data in the ImageData object, in pixels. */
    readonly width: number;
}

/** This Fetch API interface represents a resource request. */
export interface Request extends Body {
    /** Returns the cache mode associated with request, which is a string indicating how the request will interact with the browser's cache when fetching. */
    readonly cache: RequestCache;
    /** Returns the credentials mode associated with request, which is a string indicating whether credentials will be sent with the request always, never, or only when sent to a same-origin URL. */
    readonly credentials: RequestCredentials;
    /** Returns the kind of resource requested by request, e.g., "document" or "script". */
    readonly destination: RequestDestination;
    /** Returns a Headers object consisting of the headers associated with request. Note that headers added in the network layer by the user agent will not be accounted for in this object, e.g., the "Host" header. */
    readonly headers: Headers;
    /** Returns request's subresource integrity metadata, which is a cryptographic hash of the resource being fetched. Its value consists of multiple hashes separated by whitespace. [SRI] */
    readonly integrity: string;
    /** Returns a boolean indicating whether or not request can outlive the global in which it was created. */
    readonly keepalive: boolean;
    /** Returns request's HTTP method, which is "GET" by default. */
    readonly method: string;
    /** Returns the mode associated with request, which is a string indicating whether the request will use CORS, or will be restricted to same-origin URLs. */
    readonly mode: RequestMode;
    /** Returns the redirect mode associated with request, which is a string indicating how redirects for the request will be handled during fetching. A request will follow redirects by default. */
    readonly redirect: RequestRedirect;
    /** Returns the referrer of request. Its value can be a same-origin URL if explicitly set in init, the empty string to indicate no referrer, and "about:client" when defaulting to the global's default. This is used during fetching to determine the value of the `Referer` header of the request being made. */
    readonly referrer: string;
    /** Returns the referrer policy associated with request. This is used during fetching to compute the value of the request's referrer. */
    readonly referrerPolicy: ReferrerPolicy;
    /** Returns the signal associated with request, which is an AbortSignal object indicating whether or not request has been aborted, and its abort event handler. */
    readonly signal: AbortSignal;
    /** Returns the URL of request as a string. */
    readonly url: string;
    clone(): Request;
}

export interface Body {
    readonly body: ReadableStream<Uint8Array> | null;
    readonly bodyUsed: boolean;
    arrayBuffer(): Promise<ArrayBuffer>;
    blob(): Promise<Blob>;
    formData(): Promise<FormData>;
    json(): Promise<any>;
    text(): Promise<string>;
}

/** This Fetch API interface allows you to perform various actions on HTTP request and response headers. These actions include retrieving, setting, adding to, and removing. A Headers object has an associated header list, which is initially empty and consists of zero or more name and value pairs.  You can add to this using methods like append() (see Examples.) In all methods of this interface, header names are matched by case-insensitive byte sequence. */
export interface Headers {
    append(name: string, value: string): void;
    delete(name: string): void;
    get(name: string): string | null;
    has(name: string): boolean;
    set(name: string, value: string): void;
    forEach(callbackfn: (value: string, key: string, parent: Headers) => void, thisArg?: any): void;
}

export interface Keyframe {
    [property: string]: string | number | null | undefined;
    composite?: CompositeOperationOrAuto;
    easing?: string;
    offset?: number | null;
}

export interface PropertyIndexedKeyframes {
    [property: string]: string | string[] | number | null | (number | null)[] | undefined;
    composite?: CompositeOperationOrAuto | CompositeOperationOrAuto[];
    easing?: string | string[];
    offset?: number | (number | null)[];
}

export interface KeyframeAnimationOptions extends KeyframeEffectOptions {
    id?: string;
}

export interface GetAnimationsOptions {
    subtree?: boolean;
}

export interface HTMLSlotElement extends HTMLElement {
    name: string;
    assign(...nodes: (Element | Text)[]): void;
    assignedElements(options?: AssignedNodesOptions): Element[];
    assignedNodes(options?: AssignedNodesOptions): Node[];
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLSlotElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLSlotElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** A minimal document object that has no parent. It is used as a lightweight version of Document that stores a segment of a document structure comprised of nodes just like a standard document. The key difference is that because the document fragment isn't part of the active document tree structure, changes made to the fragment don't affect the document, cause reflow, or incur any performance impact that can occur when changes are made. */
export interface DocumentFragment extends Node, NonElementParentNode, ParentNode {
    readonly ownerDocument: Document;
    getElementById(elementId: string): HTMLElement | null;
}

/** Provides access to the properties of <audio> elements, as well as methods to manipulate them. It derives from the HTMLMediaElement interface. */
export interface HTMLAudioElement extends HTMLMediaElement {
    addEventListener<K extends keyof HTMLMediaElementEventMap>(type: K, listener: (this: HTMLAudioElement, ev: HTMLMediaElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLMediaElementEventMap>(type: K, listener: (this: HTMLAudioElement, ev: HTMLMediaElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Contains the base URI for a document. This object inherits all of the properties and methods as described in the HTMLElement interface. */
export interface HTMLBaseElement extends HTMLElement {
    /** Gets or sets the baseline URL on which relative links are based. */
    href: string;
    /** Sets or retrieves the window or frame at which to target content. */
    target: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLBaseElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLBaseElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Provides special properties and methods (beyond the regular HTMLElement interface it also has available to it by inheritance) for manipulating quoting elements, like <blockquote> and <q>, but not the <cite> element. */
export interface HTMLQuoteElement extends HTMLElement {
    /** Sets or retrieves reference information about the object. */
    cite: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLQuoteElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLQuoteElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Provides special properties (beyond those inherited from the regular HTMLElement interface) for manipulating <body> elements. */
export interface HTMLBodyElement extends HTMLElement, WindowEventHandlers {
    /** @deprecated */
    aLink: string;
    /** @deprecated */
    background: string;
    /** @deprecated */
    bgColor: string;
    /** @deprecated */
    link: string;
    /** @deprecated */
    onorientationchange: ((this: HTMLBodyElement, ev: Event) => any) | null;
    /** @deprecated */
    text: string;
    /** @deprecated */
    vLink: string;
    addEventListener<K extends keyof HTMLBodyElementEventMap>(type: K, listener: (this: HTMLBodyElement, ev: HTMLBodyElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLBodyElementEventMap>(type: K, listener: (this: HTMLBodyElement, ev: HTMLBodyElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** A HTML line break element (<br>). It inherits from HTMLElement. */
export interface HTMLBRElement extends HTMLElement {
    /**
     * Sets or retrieves the side on which floating objects are not to be positioned when any IHTMLBlockElement is inserted into the document.
     * @deprecated
     */
    clear: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLBRElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLBRElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Provides properties and methods (beyond the regular HTMLElement interface it also has available to it by inheritance) for manipulating <button> elements. */
export interface HTMLButtonElement extends HTMLElement {
    disabled: boolean;
    /** Retrieves a reference to the form that the object is embedded in. */
    readonly form: HTMLFormElement | null;
    /** Overrides the action attribute (where the data on a form is sent) on the parent form element. */
    formAction: string;
    /** Used to override the encoding (formEnctype attribute) specified on the form element. */
    formEnctype: string;
    /** Overrides the submit method attribute previously specified on a form element. */
    formMethod: string;
    /** Overrides any validation or required attributes on a form or form elements to allow it to be submitted without validation. This can be used to create a "save draft"-type submit option. */
    formNoValidate: boolean;
    /** Overrides the target attribute on a form element. */
    formTarget: string;
    readonly labels: NodeListOf<HTMLLabelElement>;
    /** Sets or retrieves the name of the object. */
    name: string;
    /** Gets the classification and default behavior of the button. */
    type: string;
    /** Returns the error message that would be displayed if the user submits the form, or an empty string if no error message. It also triggers the standard error message, such as "this is a required field". The result is that the user sees validation messages without actually submitting. */
    readonly validationMessage: string;
    /** Returns a  ValidityState object that represents the validity states of an element. */
    readonly validity: ValidityState;
    /** Sets or retrieves the default or selected value of the control. */
    value: string;
    /** Returns whether an element will successfully validate based on forms validation rules and constraints. */
    readonly willValidate: boolean;
    /** Returns whether a form will validate when it is submitted, without having to submit it. */
    checkValidity(): boolean;
    reportValidity(): boolean;
    /**
     * Sets a custom error message that is displayed when a form is submitted.
     * @param error Sets a custom error message that is displayed when a form is submitted.
     */
    setCustomValidity(error: string): void;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLButtonElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLButtonElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Provides properties and methods for manipulating the layout and presentation of <canvas> elements. The HTMLCanvasElement interface also inherits the properties and methods of the HTMLElement interface. */
export interface HTMLCanvasElement extends HTMLElement {
    /** Gets or sets the height of a canvas element on a document. */
    height: number;
    /** Gets or sets the width of a canvas element on a document. */
    width: number;
    captureStream(frameRequestRate?: number): MediaStream;
    /**
     * Returns an object that provides methods and properties for drawing and manipulating images and graphics on a canvas element in a document. A context object includes information about colors, line widths, fonts, and other graphic parameters that can be drawn on a canvas.
     * @param contextId The identifier (ID) of the type of canvas to create. Internet Explorer 9 and Internet Explorer 10 support only a 2-D context using canvas.getContext("2d"); IE11 Preview also supports 3-D or WebGL context using canvas.getContext("experimental-webgl");
     */
    getContext(contextId: "2d", options?: CanvasRenderingContext2DSettings): CanvasRenderingContext2D | null;
    getContext(contextId: "bitmaprenderer", options?: ImageBitmapRenderingContextSettings): ImageBitmapRenderingContext | null;
    getContext(contextId: "webgl", options?: WebGLContextAttributes): WebGLRenderingContext | null;
    getContext(contextId: "webgl2", options?: WebGLContextAttributes): WebGL2RenderingContext | null;
    getContext(contextId: string, options?: any): RenderingContext | null;
    toBlob(callback: BlobCallback, type?: string, quality?: any): void;
    /**
     * Returns the content of the current canvas as an image that you can use as a source for another canvas or an HTML element.
     * @param type The standard MIME type for the image format to return. If you do not specify this parameter, the default value is a PNG format image.
     */
    toDataURL(type?: string, quality?: any): string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLCanvasElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLCanvasElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Special properties (beyond the regular HTMLElement interface it also has available to it by inheritance) for manipulating table caption elements. */
export interface HTMLTableCaptionElement extends HTMLElement {
    /**
     * Sets or retrieves the alignment of the caption or legend.
     * @deprecated
     */
    align: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTableCaptionElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTableCaptionElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Provides special properties (beyond the HTMLElement interface it also has available to it inheritance) for manipulating single or grouped table column elements. */
export interface HTMLTableColElement extends HTMLElement {
    /**
     * Sets or retrieves the alignment of the object relative to the display or table.
     * @deprecated
     */
    align: string;
    /** @deprecated */
    ch: string;
    /** @deprecated */
    chOff: string;
    /** Sets or retrieves the number of columns in the group. */
    span: number;
    /** @deprecated */
    vAlign: string;
    /**
     * Sets or retrieves the width of the object.
     * @deprecated
     */
    width: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTableColElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTableColElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Provides special properties (beyond the regular HTMLElement interface it also has available to it by inheritance) for manipulating <data> elements. */
export interface HTMLDataElement extends HTMLElement {
    value: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDataElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDataElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Provides special properties (beyond the HTMLElement object interface it also has available to it by inheritance) to manipulate <datalist> elements and their content. */
export interface HTMLDataListElement extends HTMLElement {
    /** Returns an HTMLCollection of the option elements of the datalist element. */
    readonly options: HTMLCollectionOf<HTMLOptionElement>;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDataListElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDataListElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Provides special properties (beyond the regular methods and properties available through the HTMLElement interface they also have available to them by inheritance) for manipulating modification elements, that is <del> and <ins>. */
export interface HTMLModElement extends HTMLElement {
    /** Sets or retrieves reference information about the object. */
    cite: string;
    /** Sets or retrieves the date and time of a modification to the object. */
    dateTime: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLModElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLModElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

export interface HTMLDetailsElement extends HTMLElement {
    open: boolean;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDetailsElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDetailsElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** @deprecated this is not available in most browsers */
export interface HTMLDialogElement extends HTMLElement {
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDialogElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDialogElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** @deprecated */
export interface HTMLDirectoryElement extends HTMLElement {
    /** @deprecated */
    compact: boolean;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDirectoryElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDirectoryElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Provides special properties (beyond the regular HTMLElement interface it also has available to it by inheritance) for manipulating <div> elements. */
export interface HTMLDivElement extends HTMLElement {
    /**
     * Sets or retrieves how the object is aligned with adjacent text.
     * @deprecated
     */
    align: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Provides special properties (beyond those of the regular HTMLElement interface it also has available to it by inheritance) for manipulating definition list (<dl>) elements. */
export interface HTMLDListElement extends HTMLElement {
    /** @deprecated */
    compact: boolean;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDListElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDListElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Provides special properties and methods (beyond the regular HTMLElement interface it also has available to it by inheritance) for manipulating the layout and presentation of <fieldset> elements. */
export interface HTMLFieldSetElement extends HTMLElement {
    disabled: boolean;
    /** Returns an HTMLCollection of the form controls in the element. */
    readonly elements: HTMLCollection;
    /** Retrieves a reference to the form that the object is embedded in. */
    readonly form: HTMLFormElement | null;
    name: string;
    /** Returns the string "fieldset". */
    readonly type: string;
    /** Returns the error message that would be displayed if the user submits the form, or an empty string if no error message. It also triggers the standard error message, such as "this is a required field". The result is that the user sees validation messages without actually submitting. */
    readonly validationMessage: string;
    /** Returns a  ValidityState object that represents the validity states of an element. */
    readonly validity: ValidityState;
    /** Returns whether an element will successfully validate based on forms validation rules and constraints. */
    readonly willValidate: boolean;
    /** Returns whether a form will validate when it is submitted, without having to submit it. */
    checkValidity(): boolean;
    reportValidity(): boolean;
    /**
     * Sets a custom error message that is displayed when a form is submitted.
     * @param error Sets a custom error message that is displayed when a form is submitted.
     */
    setCustomValidity(error: string): void;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLFieldSetElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLFieldSetElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/**
 * Implements the document object model (DOM) representation of the font element. The HTML Font Element <font> defines the font size, font face and color of text.
 * @deprecated
 */
export interface HTMLFontElement extends HTMLElement {
    /** @deprecated */
    color: string;
    /**
     * Sets or retrieves the current typeface family.
     * @deprecated
     */
    face: string;
    /** @deprecated */
    size: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLFontElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLFontElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** @deprecated */
export interface HTMLFrameElement extends HTMLElement {
    /**
     * Retrieves the document object of the page or frame.
     * @deprecated
     */
    readonly contentDocument: Document | null;
    /**
     * Retrieves the object of the specified.
     * @deprecated
     */
    readonly contentWindow: WindowProxy | null;
    /**
     * Sets or retrieves whether to display a border for the frame.
     * @deprecated
     */
    frameBorder: string;
    /**
     * Sets or retrieves a URI to a long description of the object.
     * @deprecated
     */
    longDesc: string;
    /**
     * Sets or retrieves the top and bottom margin heights before displaying the text in a frame.
     * @deprecated
     */
    marginHeight: string;
    /**
     * Sets or retrieves the left and right margin widths before displaying the text in a frame.
     * @deprecated
     */
    marginWidth: string;
    /**
     * Sets or retrieves the frame name.
     * @deprecated
     */
    name: string;
    /**
     * Sets or retrieves whether the user can resize the frame.
     * @deprecated
     */
    noResize: boolean;
    /**
     * Sets or retrieves whether the frame can be scrolled.
     * @deprecated
     */
    scrolling: string;
    /**
     * Sets or retrieves a URL to be loaded by the object.
     * @deprecated
     */
    src: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLFrameElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLFrameElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/**
 * Provides special properties (beyond those of the regular HTMLElement interface they also inherit) for manipulating <frameset> elements.
 * @deprecated
 */
export interface HTMLFrameSetElement extends HTMLElement, WindowEventHandlers {
    /**
     * Sets or retrieves the frame widths of the object.
     * @deprecated
     */
    cols: string;
    /**
     * Sets or retrieves the frame heights of the object.
     * @deprecated
     */
    rows: string;
    addEventListener<K extends keyof HTMLFrameSetElementEventMap>(type: K, listener: (this: HTMLFrameSetElement, ev: HTMLFrameSetElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLFrameSetElementEventMap>(type: K, listener: (this: HTMLFrameSetElement, ev: HTMLFrameSetElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** The different heading elements. It inherits methods and properties from the HTMLElement interface. */
export interface HTMLHeadingElement extends HTMLElement {
    /**
     * Sets or retrieves a value that indicates the table alignment.
     * @deprecated
     */
    align: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLHeadingElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLHeadingElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Provides special properties (beyond those of the HTMLElement interface it also has available to it by inheritance) for manipulating <hr> elements. */
export interface HTMLHRElement extends HTMLElement {
    /**
     * Sets or retrieves how the object is aligned with adjacent text.
     * @deprecated
     */
    align: string;
    /** @deprecated */
    color: string;
    /**
     * Sets or retrieves whether the horizontal rule is drawn with 3-D shading.
     * @deprecated
     */
    noShade: boolean;
    /** @deprecated */
    size: string;
    /**
     * Sets or retrieves the width of the object.
     * @deprecated
     */
    width: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLHRElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLHRElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Serves as the root node for a given HTML document. This object inherits the properties and methods described in the HTMLElement interface. */
export interface HTMLHtmlElement extends HTMLElement {
    /**
     * Sets or retrieves the DTD version that governs the current document.
     * @deprecated
     */
    version: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLHtmlElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLHtmlElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Provides special properties and methods (beyond those of the HTMLElement interface it also has available to it by inheritance) for manipulating the layout and presentation of inline frame elements. */
export interface HTMLIFrameElement extends HTMLElement {
    /**
     * Sets or retrieves how the object is aligned with adjacent text.
     * @deprecated
     */
    align: string;
    allow: string;
    allowFullscreen: boolean;
    /** Retrieves the document object of the page or frame. */
    readonly contentDocument: Document | null;
    /** Retrieves the object of the specified. */
    readonly contentWindow: WindowProxy | null;
    /**
     * Sets or retrieves whether to display a border for the frame.
     * @deprecated
     */
    frameBorder: string;
    /** Sets or retrieves the height of the object. */
    height: string;
    /**
     * Sets or retrieves a URI to a long description of the object.
     * @deprecated
     */
    longDesc: string;
    /**
     * Sets or retrieves the top and bottom margin heights before displaying the text in a frame.
     * @deprecated
     */
    marginHeight: string;
    /**
     * Sets or retrieves the left and right margin widths before displaying the text in a frame.
     * @deprecated
     */
    marginWidth: string;
    /** Sets or retrieves the frame name. */
    name: string;
    referrerPolicy: ReferrerPolicy;
    readonly sandbox: DOMTokenList;
    /**
     * Sets or retrieves whether the frame can be scrolled.
     * @deprecated
     */
    scrolling: string;
    /** Sets or retrieves a URL to be loaded by the object. */
    src: string;
    /** Sets or retrives the content of the page that is to contain. */
    srcdoc: string;
    /** Sets or retrieves the width of the object. */
    width: string;
    getSVGDocument(): Document | null;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLIFrameElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLIFrameElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Provides special properties and methods for manipulating the options, layout, and presentation of <input> elements. */
export interface HTMLInputElement extends HTMLElement {
    /** Sets or retrieves a comma-separated list of content types. */
    accept: string;
    /**
     * Sets or retrieves how the object is aligned with adjacent text.
     * @deprecated
     */
    align: string;
    /** Sets or retrieves a text alternative to the graphic. */
    alt: string;
    /** Specifies whether autocomplete is applied to an editable text field. */
    autocomplete: string;
    capture: string;
    /** Sets or retrieves the state of the check box or radio button. */
    checked: boolean;
    /** Sets or retrieves the state of the check box or radio button. */
    defaultChecked: boolean;
    /** Sets or retrieves the initial contents of the object. */
    defaultValue: string;
    dirName: string;
    disabled: boolean;
    /** Returns a FileList object on a file type input object. */
    files: FileList | null;
    /** Retrieves a reference to the form that the object is embedded in. */
    readonly form: HTMLFormElement | null;
    /** Overrides the action attribute (where the data on a form is sent) on the parent form element. */
    formAction: string;
    /** Used to override the encoding (formEnctype attribute) specified on the form element. */
    formEnctype: string;
    /** Overrides the submit method attribute previously specified on a form element. */
    formMethod: string;
    /** Overrides any validation or required attributes on a form or form elements to allow it to be submitted without validation. This can be used to create a "save draft"-type submit option. */
    formNoValidate: boolean;
    /** Overrides the target attribute on a form element. */
    formTarget: string;
    /** Sets or retrieves the height of the object. */
    height: number;
    /** When set, overrides the rendering of checkbox controls so that the current value is not visible. */
    indeterminate: boolean;
    readonly labels: NodeListOf<HTMLLabelElement> | null;
    /** Specifies the ID of a pre-defined datalist of options for an input element. */
    readonly list: HTMLElement | null;
    /** Defines the maximum acceptable value for an input element with type="number".When used with the min and step attributes, lets you control the range and increment (such as only even numbers) that the user can enter into an input field. */
    max: string;
    /** Sets or retrieves the maximum number of characters that the user can enter in a text control. */
    maxLength: number;
    /** Defines the minimum acceptable value for an input element with type="number". When used with the max and step attributes, lets you control the range and increment (such as even numbers only) that the user can enter into an input field. */
    min: string;
    minLength: number;
    /** Sets or retrieves the Boolean value indicating whether multiple items can be selected from a list. */
    multiple: boolean;
    /** Sets or retrieves the name of the object. */
    name: string;
    /** Gets or sets a string containing a regular expression that the user's input must match. */
    pattern: string;
    /** Gets or sets a text string that is displayed in an input field as a hint or prompt to users as the format or type of information they need to enter.The text appears in an input field until the user puts focus on the field. */
    placeholder: string;
    readOnly: boolean;
    /** When present, marks an element that can't be submitted without a value. */
    required: boolean;
    selectionDirection: "forward" | "backward" | "none" | null;
    /** Gets or sets the end position or offset of a text selection. */
    selectionEnd: number | null;
    /** Gets or sets the starting position or offset of a text selection. */
    selectionStart: number | null;
    size: number;
    /** The address or URL of the a media resource that is to be considered. */
    src: string;
    /** Defines an increment or jump between values that you want to allow the user to enter. When used with the max and min attributes, lets you control the range and increment (for example, allow only even numbers) that the user can enter into an input field. */
    step: string;
    /** Returns the content type of the object. */
    type: string;
    /**
     * Sets or retrieves the URL, often with a bookmark extension (#name), to use as a client-side image map.
     * @deprecated
     */
    useMap: string;
    /** Returns the error message that would be displayed if the user submits the form, or an empty string if no error message. It also triggers the standard error message, such as "this is a required field". The result is that the user sees validation messages without actually submitting. */
    readonly validationMessage: string;
    /** Returns a  ValidityState object that represents the validity states of an element. */
    readonly validity: ValidityState;
    /** Returns the value of the data at the cursor's current position. */
    value: string;
    /** Returns a Date object representing the form control's value, if applicable; otherwise, returns null. Can be set, to change the value. Throws an "InvalidStateError" DOMException if the control isn't date- or time-based. */
    valueAsDate: Date | null;
    /** Returns the input field value as a number. */
    valueAsNumber: number;
    readonly webkitEntries: ReadonlyArray<FileSystemEntry>;
    webkitdirectory: boolean;
    /** Sets or retrieves the width of the object. */
    width: number;
    /** Returns whether an element will successfully validate based on forms validation rules and constraints. */
    readonly willValidate: boolean;
    /** Returns whether a form will validate when it is submitted, without having to submit it. */
    checkValidity(): boolean;
    reportValidity(): boolean;
    /** Makes the selection equal to the current object. */
    select(): void;
    /**
     * Sets a custom error message that is displayed when a form is submitted.
     * @param error Sets a custom error message that is displayed when a form is submitted.
     */
    setCustomValidity(error: string): void;
    setRangeText(replacement: string): void;
    setRangeText(replacement: string, start: number, end: number, selectionMode?: SelectionMode): void;
    /**
     * Sets the start and end positions of a selection in a text field.
     * @param start The offset into the text field for the start of the selection.
     * @param end The offset into the text field for the end of the selection.
     * @param direction The direction in which the selection is performed.
     */
    setSelectionRange(start: number | null, end: number | null, direction?: "forward" | "backward" | "none"): void;
    /**
     * Decrements a range input control's value by the value given by the Step attribute. If the optional parameter is used, it will decrement the input control's step value multiplied by the parameter's value.
     * @param n Value to decrement the value by.
     */
    stepDown(n?: number): void;
    /**
     * Increments a range input control's value by the value given by the Step attribute. If the optional parameter is used, will increment the input control's value by that value.
     * @param n Value to increment the value by.
     */
    stepUp(n?: number): void;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLInputElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLInputElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Gives access to properties specific to <label> elements. It inherits methods and properties from the base HTMLElement interface. */
export interface HTMLLabelElement extends HTMLElement {
    /** Returns the form control that is associated with this element. */
    readonly control: HTMLElement | null;
    /** Retrieves a reference to the form that the object is embedded in. */
    readonly form: HTMLFormElement | null;
    /** Sets or retrieves the object to which the given label object is assigned. */
    htmlFor: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLLabelElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLLabelElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** The HTMLLegendElement is an interface allowing to access properties of the <legend> elements. It inherits properties and methods from the HTMLElement interface. */
export interface HTMLLegendElement extends HTMLElement {
    /** @deprecated */
    align: string;
    /** Retrieves a reference to the form that the object is embedded in. */
    readonly form: HTMLFormElement | null;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLLegendElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLLegendElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Exposes specific properties and methods (beyond those defined by regular HTMLElement interface it also has available to it by inheritance) for manipulating list elements. */
export interface HTMLLIElement extends HTMLElement {
    /** @deprecated */
    type: string;
    /** Sets or retrieves the value of a list item. */
    value: number;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLLIElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLLIElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Reference information for external resources and the relationship of those resources to a document and vice-versa. This object inherits all of the properties and methods of the HTMLElement interface. */
export interface HTMLLinkElement extends HTMLElement, LinkStyle {
    as: string;
    /**
     * Sets or retrieves the character set used to encode the object.
     * @deprecated
     */
    charset: string;
    crossOrigin: string | null;
    disabled: boolean;
    /** Sets or retrieves a destination URL or an anchor point. */
    href: string;
    /** Sets or retrieves the language code of the object. */
    hreflang: string;
    imageSizes: string;
    imageSrcset: string;
    integrity: string;
    /** Sets or retrieves the media type. */
    media: string;
    referrerPolicy: string;
    /** Sets or retrieves the relationship between the object and the destination of the link. */
    rel: string;
    readonly relList: DOMTokenList;
    /**
     * Sets or retrieves the relationship between the object and the destination of the link.
     * @deprecated
     */
    rev: string;
    readonly sizes: DOMTokenList;
    /**
     * Sets or retrieves the window or frame at which to target content.
     * @deprecated
     */
    target: string;
    /** Sets or retrieves the MIME type of the object. */
    type: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLLinkElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLLinkElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Provides special properties and methods (beyond those of the regular object HTMLElement interface it also has available to it by inheritance) for manipulating the layout and presentation of map elements. */
export interface HTMLMapElement extends HTMLElement {
    /** Retrieves a collection of the area objects defined for the given map object. */
    readonly areas: HTMLCollection;
    /** Sets or retrieves the name of the object. */
    name: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLMapElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLMapElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/**
 * Provides methods to manipulate <marquee> elements.
 * @deprecated
 */
export interface HTMLMarqueeElement extends HTMLElement {
    /** @deprecated */
    behavior: string;
    /** @deprecated */
    bgColor: string;
    /** @deprecated */
    direction: string;
    /** @deprecated */
    height: string;
    /** @deprecated */
    hspace: number;
    /** @deprecated */
    loop: number;
    /** @deprecated */
    scrollAmount: number;
    /** @deprecated */
    scrollDelay: number;
    /** @deprecated */
    trueSpeed: boolean;
    /** @deprecated */
    vspace: number;
    /** @deprecated */
    width: string;
    /** @deprecated */
    start(): void;
    /** @deprecated */
    stop(): void;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLMarqueeElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLMarqueeElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

export interface HTMLMenuElement extends HTMLElement {
    /** @deprecated */
    compact: boolean;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLMenuElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLMenuElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Contains descriptive metadata about a document. It inherits all of the properties and methods described in the HTMLElement interface. */
export interface HTMLMetaElement extends HTMLElement {
    /** Gets or sets meta-information to associate with httpEquiv or name. */
    content: string;
    /** Gets or sets information used to bind the value of a content attribute of a meta element to an HTTP response header. */
    httpEquiv: string;
    /** Sets or retrieves the value specified in the content attribute of the meta object. */
    name: string;
    /**
     * Sets or retrieves a scheme to be used in interpreting the value of a property specified for the object.
     * @deprecated
     */
    scheme: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLMetaElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLMetaElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** The HTML <meter> elements expose the HTMLMeterElement interface, which provides special properties and methods (beyond the HTMLElement object interface they also have available to them by inheritance) for manipulating the layout and presentation of <meter> elements. */
export interface HTMLMeterElement extends HTMLElement {
    high: number;
    readonly labels: NodeListOf<HTMLLabelElement>;
    low: number;
    max: number;
    min: number;
    optimum: number;
    value: number;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLMeterElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLMeterElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Provides special properties and methods (beyond those on the HTMLElement interface it also has available to it by inheritance) for manipulating the layout and presentation of <object> element, representing external resources. */
export interface HTMLObjectElement extends HTMLElement {
    /** @deprecated */
    align: string;
    /**
     * Sets or retrieves a character string that can be used to implement your own archive functionality for the object.
     * @deprecated
     */
    archive: string;
    /** @deprecated */
    border: string;
    /**
     * Sets or retrieves the URL of the file containing the compiled Java class.
     * @deprecated
     */
    code: string;
    /**
     * Sets or retrieves the URL of the component.
     * @deprecated
     */
    codeBase: string;
    /**
     * Sets or retrieves the Internet media type for the code associated with the object.
     * @deprecated
     */
    codeType: string;
    /** Retrieves the document object of the page or frame. */
    readonly contentDocument: Document | null;
    readonly contentWindow: WindowProxy | null;
    /** Sets or retrieves the URL that references the data of the object. */
    data: string;
    /** @deprecated */
    declare: boolean;
    /** Retrieves a reference to the form that the object is embedded in. */
    readonly form: HTMLFormElement | null;
    /** Sets or retrieves the height of the object. */
    height: string;
    /** @deprecated */
    hspace: number;
    /** Sets or retrieves the name of the object. */
    name: string;
    /**
     * Sets or retrieves a message to be displayed while an object is loading.
     * @deprecated
     */
    standby: string;
    /** Sets or retrieves the MIME type of the object. */
    type: string;
    /** Sets or retrieves the URL, often with a bookmark extension (#name), to use as a client-side image map. */
    useMap: string;
    /** Returns the error message that would be displayed if the user submits the form, or an empty string if no error message. It also triggers the standard error message, such as "this is a required field". The result is that the user sees validation messages without actually submitting. */
    readonly validationMessage: string;
    /** Returns a  ValidityState object that represents the validity states of an element. */
    readonly validity: ValidityState;
    /** @deprecated */
    vspace: number;
    /** Sets or retrieves the width of the object. */
    width: string;
    /** Returns whether an element will successfully validate based on forms validation rules and constraints. */
    readonly willValidate: boolean;
    /** Returns whether a form will validate when it is submitted, without having to submit it. */
    checkValidity(): boolean;
    getSVGDocument(): Document | null;
    reportValidity(): boolean;
    /**
     * Sets a custom error message that is displayed when a form is submitted.
     * @param error Sets a custom error message that is displayed when a form is submitted.
     */
    setCustomValidity(error: string): void;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLObjectElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLObjectElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Provides special properties (beyond those defined on the regular HTMLElement interface it also has available to it by inheritance) for manipulating ordered list elements. */
export interface HTMLOListElement extends HTMLElement {
    /** @deprecated */
    compact: boolean;
    reversed: boolean;
    /** The starting number. */
    start: number;
    type: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLOListElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLOListElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Provides special properties and methods (beyond the regular HTMLElement object interface they also have available to them by inheritance) for manipulating the layout and presentation of <optgroup> elements. */
export interface HTMLOptGroupElement extends HTMLElement {
    disabled: boolean;
    /** Sets or retrieves a value that you can use to implement your own label functionality for the object. */
    label: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLOptGroupElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLOptGroupElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** <option> elements and inherits all classes and methods of the HTMLElement interface. */
export interface HTMLOptionElement extends HTMLElement {
    /** Sets or retrieves the status of an option. */
    defaultSelected: boolean;
    disabled: boolean;
    /** Retrieves a reference to the form that the object is embedded in. */
    readonly form: HTMLFormElement | null;
    /** Sets or retrieves the ordinal position of an option in a list box. */
    readonly index: number;
    /** Sets or retrieves a value that you can use to implement your own label functionality for the object. */
    label: string;
    /** Sets or retrieves whether the option in the list box is the default item. */
    selected: boolean;
    /** Sets or retrieves the text string specified by the option tag. */
    text: string;
    /** Sets or retrieves the value which is returned to the server when the form control is submitted. */
    value: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLOptionElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLOptionElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Provides properties and methods (beyond those inherited from HTMLElement) for manipulating the layout and presentation of <output> elements. */
export interface HTMLOutputElement extends HTMLElement {
    defaultValue: string;
    readonly form: HTMLFormElement | null;
    readonly htmlFor: DOMTokenList;
    readonly labels: NodeListOf<HTMLLabelElement>;
    name: string;
    /** Returns the string "output". */
    readonly type: string;
    readonly validationMessage: string;
    readonly validity: ValidityState;
    /**
     * Returns the element's current value.
     *
     * Can be set, to change the value.
     */
    value: string;
    readonly willValidate: boolean;
    checkValidity(): boolean;
    reportValidity(): boolean;
    setCustomValidity(error: string): void;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLOutputElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLOutputElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Provides special properties (beyond those of the regular HTMLElement object interface it inherits) for manipulating <p> elements. */
export interface HTMLParagraphElement extends HTMLElement {
    /**
     * Sets or retrieves how the object is aligned with adjacent text.
     * @deprecated
     */
    align: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLParagraphElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLParagraphElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Provides special properties (beyond those of the regular HTMLElement object interface it inherits) for manipulating <param> elements, representing a pair of a key and a value that acts as a parameter for an <object> element. */
export interface HTMLParamElement extends HTMLElement {
    /** Sets or retrieves the name of an input parameter for an element. */
    name: string;
    /**
     * Sets or retrieves the content type of the resource designated by the value attribute.
     * @deprecated
     */
    type: string;
    /** Sets or retrieves the value of an input parameter for an element. */
    value: string;
    /**
     * Sets or retrieves the data type of the value attribute.
     * @deprecated
     */
    valueType: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLParamElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLParamElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** A <picture> HTML element. It doesn't implement specific properties or methods. */
export interface HTMLPictureElement extends HTMLElement {
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLPictureElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLPictureElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Exposes specific properties and methods (beyond those of the HTMLElement interface it also has available to it by inheritance) for manipulating a block of preformatted text (<pre>). */
export interface HTMLPreElement extends HTMLElement {
    /**
     * Sets or gets a value that you can use to implement your own width functionality for the object.
     * @deprecated
     */
    width: number;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLPreElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLPreElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Provides special properties and methods (beyond the regular HTMLElement interface it also has available to it by inheritance) for manipulating the layout and presentation of <progress> elements. */
export interface HTMLProgressElement extends HTMLElement {
    readonly labels: NodeListOf<HTMLLabelElement>;
    /** Defines the maximum, or "done" value for a progress element. */
    max: number;
    /** Returns the quotient of value/max when the value attribute is set (determinate progress bar), or -1 when the value attribute is missing (indeterminate progress bar). */
    readonly position: number;
    /** Sets or gets the current value of a progress element. The value must be a non-negative number between 0 and the max value. */
    value: number;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLProgressElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLProgressElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** A <select> HTML Element. These elements also share all of the properties and methods of other HTML elements via the HTMLElement interface. */
export interface HTMLSelectElement extends HTMLElement {
    [name: number]: HTMLOptionElement | HTMLOptGroupElement;
    autocomplete: string;
    disabled: boolean;
    /** Retrieves a reference to the form that the object is embedded in. */
    readonly form: HTMLFormElement | null;
    readonly labels: NodeListOf<HTMLLabelElement>;
    /** Sets or retrieves the number of objects in a collection. */
    length: number;
    /** Sets or retrieves the Boolean value indicating whether multiple items can be selected from a list. */
    multiple: boolean;
    /** Sets or retrieves the name of the object. */
    name: string;
    /** Returns an HTMLOptionsCollection of the list of options. */
    readonly options: HTMLOptionsCollection;
    /** When present, marks an element that can't be submitted without a value. */
    required: boolean;
    /** Sets or retrieves the index of the selected option in a select object. */
    selectedIndex: number;
    readonly selectedOptions: HTMLCollectionOf<HTMLOptionElement>;
    /** Sets or retrieves the number of rows in the list box. */
    size: number;
    /** Retrieves the type of select control based on the value of the MULTIPLE attribute. */
    readonly type: string;
    /** Returns the error message that would be displayed if the user submits the form, or an empty string if no error message. It also triggers the standard error message, such as "this is a required field". The result is that the user sees validation messages without actually submitting. */
    readonly validationMessage: string;
    /** Returns a  ValidityState object that represents the validity states of an element. */
    readonly validity: ValidityState;
    /** Sets or retrieves the value which is returned to the server when the form control is submitted. */
    value: string;
    /** Returns whether an element will successfully validate based on forms validation rules and constraints. */
    readonly willValidate: boolean;
    /**
     * Adds an element to the areas, controlRange, or options collection.
     * @param element Variant of type Number that specifies the index position in the collection where the element is placed. If no value is given, the method places the element at the end of the collection.
     * @param before Variant of type Object that specifies an element to insert before, or null to append the object to the collection.
     */
    add(element: HTMLOptionElement | HTMLOptGroupElement, before?: HTMLElement | number | null): void;
    /** Returns whether a form will validate when it is submitted, without having to submit it. */
    checkValidity(): boolean;
    /**
     * Retrieves a select object or an object from an options collection.
     * @param name Variant of type Number or String that specifies the object or collection to retrieve. If this parameter is an integer, it is the zero-based index of the object. If this parameter is a string, all objects with matching name or id properties are retrieved, and a collection is returned if more than one match is made.
     * @param index Variant of type Number that specifies the zero-based index of the object to retrieve when a collection is returned.
     */
    item(index: number): HTMLOptionElement | null;
    /**
     * Retrieves a select object or an object from an options collection.
     * @param namedItem A String that specifies the name or id property of the object to retrieve. A collection is returned if more than one match is made.
     */
    namedItem(name: string): HTMLOptionElement | null;
    /**
     * Removes an element from the collection.
     * @param index Number that specifies the zero-based index of the element to remove from the collection.
     */
    remove(): void;
    remove(index: number): void;
    reportValidity(): boolean;
    /**
     * Sets a custom error message that is displayed when a form is submitted.
     * @param error Sets a custom error message that is displayed when a form is submitted.
     */
    setCustomValidity(error: string): void;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLSelectElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLSelectElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Provides special properties (beyond the regular HTMLElement object interface it also has available to it by inheritance) for manipulating <source> elements. */
export interface HTMLSourceElement extends HTMLElement {
    /** Gets or sets the intended media type of the media source. */
    media: string;
    sizes: string;
    /** The address or URL of the a media resource that is to be considered. */
    src: string;
    srcset: string;
    /** Gets or sets the MIME type of a media resource. */
    type: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLSourceElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLSourceElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** A <span> element and derives from the HTMLElement interface, but without implementing any additional properties or methods. */
export interface HTMLSpanElement extends HTMLElement {
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLSpanElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLSpanElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** A <style> element. It inherits properties and methods from its parent, HTMLElement, and from LinkStyle. */
export interface HTMLStyleElement extends HTMLElement, LinkStyle {
    /** Sets or retrieves the media type. */
    media: string;
    /**
     * Retrieves the CSS language in which the style sheet is written.
     * @deprecated
     */
    type: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLStyleElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLStyleElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Provides special properties and methods (beyond the regular HTMLElement object interface it also has available to it by inheritance) for manipulating the layout and presentation of tables in an HTML document. */
export interface HTMLTableElement extends HTMLElement {
    /**
     * Sets or retrieves a value that indicates the table alignment.
     * @deprecated
     */
    align: string;
    /** @deprecated */
    bgColor: string;
    /**
     * Sets or retrieves the width of the border to draw around the object.
     * @deprecated
     */
    border: string;
    /** Retrieves the caption object of a table. */
    caption: HTMLTableCaptionElement | null;
    /**
     * Sets or retrieves the amount of space between the border of the cell and the content of the cell.
     * @deprecated
     */
    cellPadding: string;
    /**
     * Sets or retrieves the amount of space between cells in a table.
     * @deprecated
     */
    cellSpacing: string;
    /**
     * Sets or retrieves the way the border frame around the table is displayed.
     * @deprecated
     */
    frame: string;
    /** Sets or retrieves the number of horizontal rows contained in the object. */
    readonly rows: HTMLCollectionOf<HTMLTableRowElement>;
    /**
     * Sets or retrieves which dividing lines (inner borders) are displayed.
     * @deprecated
     */
    rules: string;
    /**
     * Sets or retrieves a description and/or structure of the object.
     * @deprecated
     */
    summary: string;
    /** Retrieves a collection of all tBody objects in the table. Objects in this collection are in source order. */
    readonly tBodies: HTMLCollectionOf<HTMLTableSectionElement>;
    /** Retrieves the tFoot object of the table. */
    tFoot: HTMLTableSectionElement | null;
    /** Retrieves the tHead object of the table. */
    tHead: HTMLTableSectionElement | null;
    /**
     * Sets or retrieves the width of the object.
     * @deprecated
     */
    width: string;
    /** Creates an empty caption element in the table. */
    createCaption(): HTMLTableCaptionElement;
    /** Creates an empty tBody element in the table. */
    createTBody(): HTMLTableSectionElement;
    /** Creates an empty tFoot element in the table. */
    createTFoot(): HTMLTableSectionElement;
    /** Returns the tHead element object if successful, or null otherwise. */
    createTHead(): HTMLTableSectionElement;
    /** Deletes the caption element and its contents from the table. */
    deleteCaption(): void;
    /**
     * Removes the specified row (tr) from the element and from the rows collection.
     * @param index Number that specifies the zero-based position in the rows collection of the row to remove.
     */
    deleteRow(index: number): void;
    /** Deletes the tFoot element and its contents from the table. */
    deleteTFoot(): void;
    /** Deletes the tHead element and its contents from the table. */
    deleteTHead(): void;
    /**
     * Creates a new row (tr) in the table, and adds the row to the rows collection.
     * @param index Number that specifies where to insert the row in the rows collection. The default value is -1, which appends the new row to the end of the rows collection.
     */
    insertRow(index?: number): HTMLTableRowElement;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTableElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTableElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Provides special properties and methods (beyond the HTMLElement interface it also has available to it by inheritance) for manipulating the layout and presentation of sections, that is headers, footers and bodies, in an HTML table. */
export interface HTMLTableSectionElement extends HTMLElement {
    /**
     * Sets or retrieves a value that indicates the table alignment.
     * @deprecated
     */
    align: string;
    /** @deprecated */
    ch: string;
    /** @deprecated */
    chOff: string;
    /** Sets or retrieves the number of horizontal rows contained in the object. */
    readonly rows: HTMLCollectionOf<HTMLTableRowElement>;
    /** @deprecated */
    vAlign: string;
    /**
     * Removes the specified row (tr) from the element and from the rows collection.
     * @param index Number that specifies the zero-based position in the rows collection of the row to remove.
     */
    deleteRow(index: number): void;
    /**
     * Creates a new row (tr) in the table, and adds the row to the rows collection.
     * @param index Number that specifies where to insert the row in the rows collection. The default value is -1, which appends the new row to the end of the rows collection.
     */
    insertRow(index?: number): HTMLTableRowElement;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTableSectionElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTableSectionElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Provides special properties and methods (beyond the regular HTMLElement interface it also has available to it by inheritance) for manipulating the layout and presentation of table cells, either header or data cells, in an HTML document. */
export interface HTMLTableCellElement extends HTMLElement {
    /** Sets or retrieves abbreviated text for the object. */
    abbr: string;
    /**
     * Sets or retrieves how the object is aligned with adjacent text.
     * @deprecated
     */
    align: string;
    /**
     * Sets or retrieves a comma-delimited list of conceptual categories associated with the object.
     * @deprecated
     */
    axis: string;
    /** @deprecated */
    bgColor: string;
    /** Retrieves the position of the object in the cells collection of a row. */
    readonly cellIndex: number;
    /** @deprecated */
    ch: string;
    /** @deprecated */
    chOff: string;
    /** Sets or retrieves the number columns in the table that the object should span. */
    colSpan: number;
    /** Sets or retrieves a list of header cells that provide information for the object. */
    headers: string;
    /**
     * Sets or retrieves the height of the object.
     * @deprecated
     */
    height: string;
    /**
     * Sets or retrieves whether the browser automatically performs wordwrap.
     * @deprecated
     */
    noWrap: boolean;
    /** Sets or retrieves how many rows in a table the cell should span. */
    rowSpan: number;
    /** Sets or retrieves the group of cells in a table to which the object's information applies. */
    scope: string;
    /** @deprecated */
    vAlign: string;
    /**
     * Sets or retrieves the width of the object.
     * @deprecated
     */
    width: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTableCellElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTableCellElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Enables access to the contents of an HTML <template> element. */
export interface HTMLTemplateElement extends HTMLElement {
    /** Returns the template contents (a DocumentFragment). */
    readonly content: DocumentFragment;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTemplateElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTemplateElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Provides special properties and methods for manipulating the layout and presentation of <textarea> elements. */
export interface HTMLTextAreaElement extends HTMLElement {
    autocomplete: string;
    /** Sets or retrieves the width of the object. */
    cols: number;
    /** Sets or retrieves the initial contents of the object. */
    defaultValue: string;
    dirName: string;
    disabled: boolean;
    /** Retrieves a reference to the form that the object is embedded in. */
    readonly form: HTMLFormElement | null;
    readonly labels: NodeListOf<HTMLLabelElement>;
    /** Sets or retrieves the maximum number of characters that the user can enter in a text control. */
    maxLength: number;
    minLength: number;
    /** Sets or retrieves the name of the object. */
    name: string;
    /** Gets or sets a text string that is displayed in an input field as a hint or prompt to users as the format or type of information they need to enter.The text appears in an input field until the user puts focus on the field. */
    placeholder: string;
    /** Sets or retrieves the value indicated whether the content of the object is read-only. */
    readOnly: boolean;
    /** When present, marks an element that can't be submitted without a value. */
    required: boolean;
    /** Sets or retrieves the number of horizontal rows contained in the object. */
    rows: number;
    selectionDirection: "forward" | "backward" | "none";
    /** Gets or sets the end position or offset of a text selection. */
    selectionEnd: number;
    /** Gets or sets the starting position or offset of a text selection. */
    selectionStart: number;
    readonly textLength: number;
    /** Retrieves the type of control. */
    readonly type: string;
    /** Returns the error message that would be displayed if the user submits the form, or an empty string if no error message. It also triggers the standard error message, such as "this is a required field". The result is that the user sees validation messages without actually submitting. */
    readonly validationMessage: string;
    /** Returns a  ValidityState object that represents the validity states of an element. */
    readonly validity: ValidityState;
    /** Retrieves or sets the text in the entry field of the textArea element. */
    value: string;
    /** Returns whether an element will successfully validate based on forms validation rules and constraints. */
    readonly willValidate: boolean;
    /** Sets or retrieves how to handle wordwrapping in the object. */
    wrap: string;
    /** Returns whether a form will validate when it is submitted, without having to submit it. */
    checkValidity(): boolean;
    reportValidity(): boolean;
    /** Highlights the input area of a form element. */
    select(): void;
    /**
     * Sets a custom error message that is displayed when a form is submitted.
     * @param error Sets a custom error message that is displayed when a form is submitted.
     */
    setCustomValidity(error: string): void;
    setRangeText(replacement: string): void;
    setRangeText(replacement: string, start: number, end: number, selectionMode?: SelectionMode): void;
    /**
     * Sets the start and end positions of a selection in a text field.
     * @param start The offset into the text field for the start of the selection.
     * @param end The offset into the text field for the end of the selection.
     * @param direction The direction in which the selection is performed.
     */
    setSelectionRange(start: number | null, end: number | null, direction?: "forward" | "backward" | "none"): void;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTextAreaElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTextAreaElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Provides special properties (beyond the regular HTMLElement interface it also has available to it by inheritance) for manipulating <time> elements. */
export interface HTMLTimeElement extends HTMLElement {
    dateTime: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTimeElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTimeElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Contains the title for a document. This element inherits all of the properties and methods of the HTMLElement interface. */
export interface HTMLTitleElement extends HTMLElement {
    /** Retrieves or sets the text of the object as a string. */
    text: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTitleElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTitleElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Provides special properties and methods (beyond the HTMLElement interface it also has available to it by inheritance) for manipulating the layout and presentation of rows in an HTML table. */
export interface HTMLTableRowElement extends HTMLElement {
    /**
     * Sets or retrieves how the object is aligned with adjacent text.
     * @deprecated
     */
    align: string;
    /** @deprecated */
    bgColor: string;
    /** Retrieves a collection of all cells in the table row. */
    readonly cells: HTMLCollectionOf<HTMLTableCellElement>;
    /** @deprecated */
    ch: string;
    /** @deprecated */
    chOff: string;
    /** Retrieves the position of the object in the rows collection for the table. */
    readonly rowIndex: number;
    /** Retrieves the position of the object in the collection. */
    readonly sectionRowIndex: number;
    /** @deprecated */
    vAlign: string;
    /**
     * Removes the specified cell from the table row, as well as from the cells collection.
     * @param index Number that specifies the zero-based position of the cell to remove from the table row. If no value is provided, the last cell in the cells collection is deleted.
     */
    deleteCell(index: number): void;
    /**
     * Creates a new cell in the table row, and adds the cell to the cells collection.
     * @param index Number that specifies where to insert the cell in the tr. The default value is -1, which appends the new cell to the end of the cells collection.
     */
    insertCell(index?: number): HTMLTableCellElement;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTableRowElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTableRowElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** The HTMLTrackElement */
export interface HTMLTrackElement extends HTMLElement {
    default: boolean;
    kind: string;
    label: string;
    readonly readyState: number;
    src: string;
    srclang: string;
    /** Returns the TextTrack object corresponding to the text track of the track element. */
    readonly track: TextTrack;
    readonly ERROR: number;
    readonly LOADED: number;
    readonly LOADING: number;
    readonly NONE: number;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTrackElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTrackElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Provides special properties (beyond those defined on the regular HTMLElement interface it also has available to it by inheritance) for manipulating unordered list elements. */
export interface HTMLUListElement extends HTMLElement {
    /** @deprecated */
    compact: boolean;
    /** @deprecated */
    type: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLUListElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLUListElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Provides special properties and methods for manipulating video objects. It also inherits properties and methods of HTMLMediaElement and HTMLElement. */
export interface HTMLVideoElement extends HTMLMediaElement {
    disablePictureInPicture: boolean;
    /** Gets or sets the height of the video element. */
    height: number;
    onenterpictureinpicture: ((this: HTMLVideoElement, ev: Event) => any) | null;
    onleavepictureinpicture: ((this: HTMLVideoElement, ev: Event) => any) | null;
    /** Gets or sets the playsinline of the video element. for example, On iPhone, video elements will now be allowed to play inline, and will not automatically enter fullscreen mode when playback begins. */
    playsInline: boolean;
    /** Gets or sets a URL of an image to display, for example, like a movie poster. This can be a still frame from the video, or another image if no video data is available. */
    poster: string;
    /** Gets the intrinsic height of a video in CSS pixels, or zero if the dimensions are not known. */
    readonly videoHeight: number;
    /** Gets the intrinsic width of a video in CSS pixels, or zero if the dimensions are not known. */
    readonly videoWidth: number;
    /** Gets or sets the width of the video element. */
    width: number;
    getVideoPlaybackQuality(): VideoPlaybackQuality;
    requestPictureInPicture(): Promise<PictureInPictureWindow>;
    addEventListener<K extends keyof HTMLVideoElementEventMap>(type: K, listener: (this: HTMLVideoElement, ev: HTMLVideoElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLVideoElementEventMap>(type: K, listener: (this: HTMLVideoElement, ev: HTMLVideoElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Provides access to the properties of <a> element, as well as methods to manipulate them. */
export interface SVGAElement extends SVGGraphicsElement, SVGURIReference {
    rel: string;
    readonly relList: DOMTokenList;
    readonly target: SVGAnimatedString;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGAElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGAElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

export interface SVGAnimateElement extends SVGAnimationElement {
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGAnimateElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGAnimateElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

export interface SVGAnimateMotionElement extends SVGAnimationElement {
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGAnimateMotionElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGAnimateMotionElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

export interface SVGAnimateTransformElement extends SVGAnimationElement {
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGAnimateTransformElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGAnimateTransformElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** An interface for the <circle> element. The circle element is defined by the cx and cy attributes that denote the coordinates of the centre of the circle. */
export interface SVGCircleElement extends SVGGeometryElement {
    readonly cx: SVGAnimatedLength;
    readonly cy: SVGAnimatedLength;
    readonly r: SVGAnimatedLength;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGCircleElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGCircleElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Provides access to the properties of <clipPath> elements, as well as methods to manipulate them. */
export interface SVGClipPathElement extends SVGElement {
    readonly clipPathUnits: SVGAnimatedEnumeration;
    readonly transform: SVGAnimatedTransformList;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGClipPathElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGClipPathElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Corresponds to the <defs> element. */
export interface SVGDefsElement extends SVGGraphicsElement {
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGDefsElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGDefsElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Corresponds to the <desc> element. */
export interface SVGDescElement extends SVGElement {
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGDescElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGDescElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Provides access to the properties of <ellipse> elements. */
export interface SVGEllipseElement extends SVGGeometryElement {
    readonly cx: SVGAnimatedLength;
    readonly cy: SVGAnimatedLength;
    readonly rx: SVGAnimatedLength;
    readonly ry: SVGAnimatedLength;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGEllipseElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGEllipseElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Corresponds to the <feBlend> element. */
export interface SVGFEBlendElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    readonly in1: SVGAnimatedString;
    readonly in2: SVGAnimatedString;
    readonly mode: SVGAnimatedEnumeration;
    readonly SVG_FEBLEND_MODE_COLOR: number;
    readonly SVG_FEBLEND_MODE_COLOR_BURN: number;
    readonly SVG_FEBLEND_MODE_COLOR_DODGE: number;
    readonly SVG_FEBLEND_MODE_DARKEN: number;
    readonly SVG_FEBLEND_MODE_DIFFERENCE: number;
    readonly SVG_FEBLEND_MODE_EXCLUSION: number;
    readonly SVG_FEBLEND_MODE_HARD_LIGHT: number;
    readonly SVG_FEBLEND_MODE_HUE: number;
    readonly SVG_FEBLEND_MODE_LIGHTEN: number;
    readonly SVG_FEBLEND_MODE_LUMINOSITY: number;
    readonly SVG_FEBLEND_MODE_MULTIPLY: number;
    readonly SVG_FEBLEND_MODE_NORMAL: number;
    readonly SVG_FEBLEND_MODE_OVERLAY: number;
    readonly SVG_FEBLEND_MODE_SATURATION: number;
    readonly SVG_FEBLEND_MODE_SCREEN: number;
    readonly SVG_FEBLEND_MODE_SOFT_LIGHT: number;
    readonly SVG_FEBLEND_MODE_UNKNOWN: number;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEBlendElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEBlendElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Corresponds to the <feColorMatrix> element. */
export interface SVGFEColorMatrixElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    readonly in1: SVGAnimatedString;
    readonly type: SVGAnimatedEnumeration;
    readonly values: SVGAnimatedNumberList;
    readonly SVG_FECOLORMATRIX_TYPE_HUEROTATE: number;
    readonly SVG_FECOLORMATRIX_TYPE_LUMINANCETOALPHA: number;
    readonly SVG_FECOLORMATRIX_TYPE_MATRIX: number;
    readonly SVG_FECOLORMATRIX_TYPE_SATURATE: number;
    readonly SVG_FECOLORMATRIX_TYPE_UNKNOWN: number;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEColorMatrixElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEColorMatrixElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Corresponds to the <feComponentTransfer> element. */
export interface SVGFEComponentTransferElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    readonly in1: SVGAnimatedString;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEComponentTransferElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEComponentTransferElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Corresponds to the <feComposite> element. */
export interface SVGFECompositeElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    readonly in1: SVGAnimatedString;
    readonly in2: SVGAnimatedString;
    readonly k1: SVGAnimatedNumber;
    readonly k2: SVGAnimatedNumber;
    readonly k3: SVGAnimatedNumber;
    readonly k4: SVGAnimatedNumber;
    readonly operator: SVGAnimatedEnumeration;
    readonly SVG_FECOMPOSITE_OPERATOR_ARITHMETIC: number;
    readonly SVG_FECOMPOSITE_OPERATOR_ATOP: number;
    readonly SVG_FECOMPOSITE_OPERATOR_IN: number;
    readonly SVG_FECOMPOSITE_OPERATOR_OUT: number;
    readonly SVG_FECOMPOSITE_OPERATOR_OVER: number;
    readonly SVG_FECOMPOSITE_OPERATOR_UNKNOWN: number;
    readonly SVG_FECOMPOSITE_OPERATOR_XOR: number;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFECompositeElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFECompositeElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Corresponds to the <feConvolveMatrix> element. */
export interface SVGFEConvolveMatrixElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    readonly bias: SVGAnimatedNumber;
    readonly divisor: SVGAnimatedNumber;
    readonly edgeMode: SVGAnimatedEnumeration;
    readonly in1: SVGAnimatedString;
    readonly kernelMatrix: SVGAnimatedNumberList;
    readonly kernelUnitLengthX: SVGAnimatedNumber;
    readonly kernelUnitLengthY: SVGAnimatedNumber;
    readonly orderX: SVGAnimatedInteger;
    readonly orderY: SVGAnimatedInteger;
    readonly preserveAlpha: SVGAnimatedBoolean;
    readonly targetX: SVGAnimatedInteger;
    readonly targetY: SVGAnimatedInteger;
    readonly SVG_EDGEMODE_DUPLICATE: number;
    readonly SVG_EDGEMODE_NONE: number;
    readonly SVG_EDGEMODE_UNKNOWN: number;
    readonly SVG_EDGEMODE_WRAP: number;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEConvolveMatrixElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEConvolveMatrixElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Corresponds to the <feDiffuseLighting> element. */
export interface SVGFEDiffuseLightingElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    readonly diffuseConstant: SVGAnimatedNumber;
    readonly in1: SVGAnimatedString;
    readonly kernelUnitLengthX: SVGAnimatedNumber;
    readonly kernelUnitLengthY: SVGAnimatedNumber;
    readonly surfaceScale: SVGAnimatedNumber;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEDiffuseLightingElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEDiffuseLightingElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Corresponds to the <feDisplacementMap> element. */
export interface SVGFEDisplacementMapElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    readonly in1: SVGAnimatedString;
    readonly in2: SVGAnimatedString;
    readonly scale: SVGAnimatedNumber;
    readonly xChannelSelector: SVGAnimatedEnumeration;
    readonly yChannelSelector: SVGAnimatedEnumeration;
    readonly SVG_CHANNEL_A: number;
    readonly SVG_CHANNEL_B: number;
    readonly SVG_CHANNEL_G: number;
    readonly SVG_CHANNEL_R: number;
    readonly SVG_CHANNEL_UNKNOWN: number;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEDisplacementMapElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEDisplacementMapElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Corresponds to the <feDistantLight> element. */
export interface SVGFEDistantLightElement extends SVGElement {
    readonly azimuth: SVGAnimatedNumber;
    readonly elevation: SVGAnimatedNumber;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEDistantLightElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEDistantLightElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

export interface SVGFEDropShadowElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    readonly dx: SVGAnimatedNumber;
    readonly dy: SVGAnimatedNumber;
    readonly in1: SVGAnimatedString;
    readonly stdDeviationX: SVGAnimatedNumber;
    readonly stdDeviationY: SVGAnimatedNumber;
    setStdDeviation(stdDeviationX: number, stdDeviationY: number): void;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEDropShadowElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEDropShadowElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Corresponds to the <feFlood> element. */
export interface SVGFEFloodElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEFloodElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEFloodElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Corresponds to the <feFuncA> element. */
export interface SVGFEFuncAElement extends SVGComponentTransferFunctionElement {
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEFuncAElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEFuncAElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Corresponds to the <feFuncB> element. */
export interface SVGFEFuncBElement extends SVGComponentTransferFunctionElement {
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEFuncBElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEFuncBElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Corresponds to the <feFuncG> element. */
export interface SVGFEFuncGElement extends SVGComponentTransferFunctionElement {
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEFuncGElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEFuncGElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Corresponds to the <feFuncR> element. */
export interface SVGFEFuncRElement extends SVGComponentTransferFunctionElement {
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEFuncRElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEFuncRElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Corresponds to the <feGaussianBlur> element. */
export interface SVGFEGaussianBlurElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    readonly in1: SVGAnimatedString;
    readonly stdDeviationX: SVGAnimatedNumber;
    readonly stdDeviationY: SVGAnimatedNumber;
    setStdDeviation(stdDeviationX: number, stdDeviationY: number): void;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEGaussianBlurElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEGaussianBlurElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Corresponds to the <feImage> element. */
export interface SVGFEImageElement extends SVGElement, SVGFilterPrimitiveStandardAttributes, SVGURIReference {
    readonly preserveAspectRatio: SVGAnimatedPreserveAspectRatio;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEImageElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEImageElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Corresponds to the <feMerge> element. */
export interface SVGFEMergeElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEMergeElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEMergeElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Corresponds to the <feMergeNode> element. */
export interface SVGFEMergeNodeElement extends SVGElement {
    readonly in1: SVGAnimatedString;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEMergeNodeElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEMergeNodeElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Corresponds to the <feMorphology> element. */
export interface SVGFEMorphologyElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    readonly in1: SVGAnimatedString;
    readonly operator: SVGAnimatedEnumeration;
    readonly radiusX: SVGAnimatedNumber;
    readonly radiusY: SVGAnimatedNumber;
    readonly SVG_MORPHOLOGY_OPERATOR_DILATE: number;
    readonly SVG_MORPHOLOGY_OPERATOR_ERODE: number;
    readonly SVG_MORPHOLOGY_OPERATOR_UNKNOWN: number;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEMorphologyElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEMorphologyElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Corresponds to the <feOffset> element. */
export interface SVGFEOffsetElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    readonly dx: SVGAnimatedNumber;
    readonly dy: SVGAnimatedNumber;
    readonly in1: SVGAnimatedString;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEOffsetElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEOffsetElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Corresponds to the <fePointLight> element. */
export interface SVGFEPointLightElement extends SVGElement {
    readonly x: SVGAnimatedNumber;
    readonly y: SVGAnimatedNumber;
    readonly z: SVGAnimatedNumber;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEPointLightElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEPointLightElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Corresponds to the <feSpecularLighting> element. */
export interface SVGFESpecularLightingElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    readonly in1: SVGAnimatedString;
    readonly kernelUnitLengthX: SVGAnimatedNumber;
    readonly kernelUnitLengthY: SVGAnimatedNumber;
    readonly specularConstant: SVGAnimatedNumber;
    readonly specularExponent: SVGAnimatedNumber;
    readonly surfaceScale: SVGAnimatedNumber;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFESpecularLightingElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFESpecularLightingElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Corresponds to the <feSpotLight> element. */
export interface SVGFESpotLightElement extends SVGElement {
    readonly limitingConeAngle: SVGAnimatedNumber;
    readonly pointsAtX: SVGAnimatedNumber;
    readonly pointsAtY: SVGAnimatedNumber;
    readonly pointsAtZ: SVGAnimatedNumber;
    readonly specularExponent: SVGAnimatedNumber;
    readonly x: SVGAnimatedNumber;
    readonly y: SVGAnimatedNumber;
    readonly z: SVGAnimatedNumber;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFESpotLightElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFESpotLightElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Corresponds to the <feTile> element. */
export interface SVGFETileElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    readonly in1: SVGAnimatedString;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFETileElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFETileElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Corresponds to the <feTurbulence> element. */
export interface SVGFETurbulenceElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    readonly baseFrequencyX: SVGAnimatedNumber;
    readonly baseFrequencyY: SVGAnimatedNumber;
    readonly numOctaves: SVGAnimatedInteger;
    readonly seed: SVGAnimatedNumber;
    readonly stitchTiles: SVGAnimatedEnumeration;
    readonly type: SVGAnimatedEnumeration;
    readonly SVG_STITCHTYPE_NOSTITCH: number;
    readonly SVG_STITCHTYPE_STITCH: number;
    readonly SVG_STITCHTYPE_UNKNOWN: number;
    readonly SVG_TURBULENCE_TYPE_FRACTALNOISE: number;
    readonly SVG_TURBULENCE_TYPE_TURBULENCE: number;
    readonly SVG_TURBULENCE_TYPE_UNKNOWN: number;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFETurbulenceElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFETurbulenceElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Provides access to the properties of <filter> elements, as well as methods to manipulate them. */
export interface SVGFilterElement extends SVGElement, SVGURIReference {
    readonly filterUnits: SVGAnimatedEnumeration;
    readonly height: SVGAnimatedLength;
    readonly primitiveUnits: SVGAnimatedEnumeration;
    readonly width: SVGAnimatedLength;
    readonly x: SVGAnimatedLength;
    readonly y: SVGAnimatedLength;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFilterElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFilterElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Provides access to the properties of <foreignObject> elements, as well as methods to manipulate them. */
export interface SVGForeignObjectElement extends SVGGraphicsElement {
    readonly height: SVGAnimatedLength;
    readonly width: SVGAnimatedLength;
    readonly x: SVGAnimatedLength;
    readonly y: SVGAnimatedLength;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGForeignObjectElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGForeignObjectElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Corresponds to the <g> element. */
export interface SVGGElement extends SVGGraphicsElement {
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGGElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGGElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Corresponds to the <image> element. */
export interface SVGImageElement extends SVGGraphicsElement, SVGURIReference {
    readonly height: SVGAnimatedLength;
    readonly preserveAspectRatio: SVGAnimatedPreserveAspectRatio;
    readonly width: SVGAnimatedLength;
    readonly x: SVGAnimatedLength;
    readonly y: SVGAnimatedLength;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGImageElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGImageElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Provides access to the properties of <line> elements, as well as methods to manipulate them. */
export interface SVGLineElement extends SVGGeometryElement {
    readonly x1: SVGAnimatedLength;
    readonly x2: SVGAnimatedLength;
    readonly y1: SVGAnimatedLength;
    readonly y2: SVGAnimatedLength;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGLineElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGLineElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Corresponds to the <linearGradient> element. */
export interface SVGLinearGradientElement extends SVGGradientElement {
    readonly x1: SVGAnimatedLength;
    readonly x2: SVGAnimatedLength;
    readonly y1: SVGAnimatedLength;
    readonly y2: SVGAnimatedLength;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGLinearGradientElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGLinearGradientElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

export interface SVGMarkerElement extends SVGElement, SVGFitToViewBox {
    readonly markerHeight: SVGAnimatedLength;
    readonly markerUnits: SVGAnimatedEnumeration;
    readonly markerWidth: SVGAnimatedLength;
    readonly orientAngle: SVGAnimatedAngle;
    readonly orientType: SVGAnimatedEnumeration;
    readonly refX: SVGAnimatedLength;
    readonly refY: SVGAnimatedLength;
    readonly SVG_MARKERUNITS_STROKEWIDTH: number;
    readonly SVG_MARKERUNITS_UNKNOWN: number;
    readonly SVG_MARKERUNITS_USERSPACEONUSE: number;
    readonly SVG_MARKER_ORIENT_ANGLE: number;
    readonly SVG_MARKER_ORIENT_AUTO: number;
    readonly SVG_MARKER_ORIENT_UNKNOWN: number;
    setOrientToAngle(angle: SVGAngle): void;
    setOrientToAuto(): void;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGMarkerElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGMarkerElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Provides access to the properties of <mask> elements, as well as methods to manipulate them. */
export interface SVGMaskElement extends SVGElement {
    readonly height: SVGAnimatedLength;
    readonly maskContentUnits: SVGAnimatedEnumeration;
    readonly maskUnits: SVGAnimatedEnumeration;
    readonly width: SVGAnimatedLength;
    readonly x: SVGAnimatedLength;
    readonly y: SVGAnimatedLength;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGMaskElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGMaskElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Corresponds to the <metadata> element. */
export interface SVGMetadataElement extends SVGElement {
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGMetadataElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGMetadataElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

export interface SVGMPathElement extends SVGElement, SVGURIReference {
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGMPathElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGMPathElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Corresponds to the <path> element. */
export interface SVGPathElement extends SVGGeometryElement {
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGPathElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGPathElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Corresponds to the <pattern> element. */
export interface SVGPatternElement extends SVGElement, SVGFitToViewBox, SVGURIReference {
    readonly height: SVGAnimatedLength;
    readonly patternContentUnits: SVGAnimatedEnumeration;
    readonly patternTransform: SVGAnimatedTransformList;
    readonly patternUnits: SVGAnimatedEnumeration;
    readonly width: SVGAnimatedLength;
    readonly x: SVGAnimatedLength;
    readonly y: SVGAnimatedLength;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGPatternElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGPatternElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Provides access to the properties of <polygon> elements, as well as methods to manipulate them. */
export interface SVGPolygonElement extends SVGGeometryElement, SVGAnimatedPoints {
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGPolygonElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGPolygonElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Provides access to the properties of <polyline> elements, as well as methods to manipulate them. */
export interface SVGPolylineElement extends SVGGeometryElement, SVGAnimatedPoints {
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGPolylineElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGPolylineElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Corresponds to the <RadialGradient> element. */
export interface SVGRadialGradientElement extends SVGGradientElement {
    readonly cx: SVGAnimatedLength;
    readonly cy: SVGAnimatedLength;
    readonly fr: SVGAnimatedLength;
    readonly fx: SVGAnimatedLength;
    readonly fy: SVGAnimatedLength;
    readonly r: SVGAnimatedLength;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGRadialGradientElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGRadialGradientElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Provides access to the properties of <rect> elements, as well as methods to manipulate them. */
export interface SVGRectElement extends SVGGeometryElement {
    readonly height: SVGAnimatedLength;
    readonly rx: SVGAnimatedLength;
    readonly ry: SVGAnimatedLength;
    readonly width: SVGAnimatedLength;
    readonly x: SVGAnimatedLength;
    readonly y: SVGAnimatedLength;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGRectElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGRectElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

export interface SVGSetElement extends SVGAnimationElement {
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGSetElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGSetElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Corresponds to the <stop> element. */
export interface SVGStopElement extends SVGElement {
    readonly offset: SVGAnimatedNumber;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGStopElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGStopElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Corresponds to the SVG <style> element. */
export interface SVGStyleElement extends SVGElement, LinkStyle {
    disabled: boolean;
    media: string;
    title: string;
    type: string;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGStyleElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGStyleElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Provides access to the properties of <svg> elements, as well as methods to manipulate them. This interface contains also various miscellaneous commonly-used utility methods, such as matrix operations and the ability to control the time of redraw on visual rendering devices. */
export interface SVGSVGElement extends SVGGraphicsElement, SVGFitToViewBox, WindowEventHandlers {
    currentScale: number;
    readonly currentTranslate: DOMPointReadOnly;
    readonly height: SVGAnimatedLength;
    readonly width: SVGAnimatedLength;
    readonly x: SVGAnimatedLength;
    readonly y: SVGAnimatedLength;
    animationsPaused(): boolean;
    checkEnclosure(element: SVGElement, rect: DOMRectReadOnly): boolean;
    checkIntersection(element: SVGElement, rect: DOMRectReadOnly): boolean;
    createSVGAngle(): SVGAngle;
    createSVGLength(): SVGLength;
    createSVGMatrix(): DOMMatrix;
    createSVGNumber(): SVGNumber;
    createSVGPoint(): DOMPoint;
    createSVGRect(): DOMRect;
    createSVGTransform(): SVGTransform;
    createSVGTransformFromMatrix(matrix?: DOMMatrix2DInit): SVGTransform;
    deselectAll(): void;
    /** @deprecated */
    forceRedraw(): void;
    getCurrentTime(): number;
    getElementById(elementId: string): Element;
    getEnclosureList(rect: DOMRectReadOnly, referenceElement: SVGElement | null): NodeListOf<SVGCircleElement | SVGEllipseElement | SVGImageElement | SVGLineElement | SVGPathElement | SVGPolygonElement | SVGPolylineElement | SVGRectElement | SVGTextElement | SVGUseElement>;
    getIntersectionList(rect: DOMRectReadOnly, referenceElement: SVGElement | null): NodeListOf<SVGCircleElement | SVGEllipseElement | SVGImageElement | SVGLineElement | SVGPathElement | SVGPolygonElement | SVGPolylineElement | SVGRectElement | SVGTextElement | SVGUseElement>;
    pauseAnimations(): void;
    setCurrentTime(seconds: number): void;
    /** @deprecated */
    suspendRedraw(maxWaitMilliseconds: number): number;
    unpauseAnimations(): void;
    /** @deprecated */
    unsuspendRedraw(suspendHandleID: number): void;
    /** @deprecated */
    unsuspendRedrawAll(): void;
    addEventListener<K extends keyof SVGSVGElementEventMap>(type: K, listener: (this: SVGSVGElement, ev: SVGSVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGSVGElementEventMap>(type: K, listener: (this: SVGSVGElement, ev: SVGSVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Corresponds to the <switch> element. */
export interface SVGSwitchElement extends SVGGraphicsElement {
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGSwitchElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGSwitchElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Corresponds to the <symbol> element. */
export interface SVGSymbolElement extends SVGElement, SVGFitToViewBox {
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGSymbolElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGSymbolElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Corresponds to the <text> elements. */
export interface SVGTextElement extends SVGTextPositioningElement {
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGTextElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGTextElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Corresponds to the <textPath> element. */
export interface SVGTextPathElement extends SVGTextContentElement, SVGURIReference {
    readonly method: SVGAnimatedEnumeration;
    readonly spacing: SVGAnimatedEnumeration;
    readonly startOffset: SVGAnimatedLength;
    readonly TEXTPATH_METHODTYPE_ALIGN: number;
    readonly TEXTPATH_METHODTYPE_STRETCH: number;
    readonly TEXTPATH_METHODTYPE_UNKNOWN: number;
    readonly TEXTPATH_SPACINGTYPE_AUTO: number;
    readonly TEXTPATH_SPACINGTYPE_EXACT: number;
    readonly TEXTPATH_SPACINGTYPE_UNKNOWN: number;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGTextPathElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGTextPathElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Corresponds to the <title> element. */
export interface SVGTitleElement extends SVGElement {
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGTitleElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGTitleElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** A <tspan> element. */
export interface SVGTSpanElement extends SVGTextPositioningElement {
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGTSpanElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGTSpanElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Corresponds to the <use> element. */
export interface SVGUseElement extends SVGGraphicsElement, SVGURIReference {
    readonly height: SVGAnimatedLength;
    readonly width: SVGAnimatedLength;
    readonly x: SVGAnimatedLength;
    readonly y: SVGAnimatedLength;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGUseElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGUseElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Provides access to the properties of <view> elements, as well as methods to manipulate them. */
export interface SVGViewElement extends SVGElement, SVGFitToViewBox {
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGViewElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGViewElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

export interface DOMRectReadOnly {
    readonly bottom: number;
    readonly height: number;
    readonly left: number;
    readonly right: number;
    readonly top: number;
    readonly width: number;
    readonly x: number;
    readonly y: number;
    toJSON(): any;
}

export interface SVGElementEventMap extends ElementEventMap, DocumentAndElementEventHandlersEventMap, GlobalEventHandlersEventMap {
}

export interface ScrollOptions {
    behavior?: ScrollBehavior;
}

/** NodeList objects are collections of nodes, usually returned by properties such as Node.childNodes and methods such as document.querySelectorAll(). */
export interface NodeList {
    [index: number]: Node;
    /** Returns the number of nodes in the collection. */
    readonly length: number;
    /** Returns the node with index index from the collection. The nodes are sorted in tree order. */
    item(index: number): Node | null;
    /**
     * Performs the specified action for each node in an list.
     * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the list.
     * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    forEach(callbackfn: (value: Node, key: number, parent: NodeList) => void, thisArg?: any): void;
}

/** A single CSS style sheet. It inherits properties and methods from its parent, StyleSheet. */
export interface CSSStyleSheet extends StyleSheet {
    readonly cssRules: CSSRuleList;
    readonly ownerRule: CSSRule | null;
    /** @deprecated */
    readonly rules: CSSRuleList;
    /** @deprecated */
    addRule(selector?: string, style?: string, index?: number): number;
    deleteRule(index: number): void;
    insertRule(rule: string, index?: number): number;
    /** @deprecated */
    removeRule(index?: number): void;
}

export interface AnimationEffect {
    getComputedTiming(): ComputedEffectTiming;
    getTiming(): EffectTiming;
    updateTiming(timing?: OptionalEffectTiming): void;
}

export interface AnimationPlaybackEvent extends Event {
    readonly currentTime: CSSNumberish | null;
    readonly timelineTime: CSSNumberish | null;
}

export interface AnimationTimeline {
    readonly currentTime: number | null;
}

export interface AnimationEventMap {
    "cancel": AnimationPlaybackEvent;
    "finish": AnimationPlaybackEvent;
    "remove": Event;
}

export interface FontFace {
    ascentOverride: string;
    descentOverride: string;
    display: string;
    family: string;
    featureSettings: string;
    lineGapOverride: string;
    readonly loaded: Promise<FontFace>;
    readonly status: FontFaceLoadStatus;
    stretch: string;
    style: string;
    unicodeRange: string;
    variant: string;
    variationSettings: string;
    weight: string;
    load(): Promise<FontFace>;
}

export interface FontFaceSetEventMap {
    "loading": Event;
    "loadingdone": Event;
    "loadingerror": Event;
}

/** An object that is a CSS declaration block, and exposes style information and various style-related methods and properties. */
export interface CSSStyleDeclaration {
    [index: number]: string;
    accentColor: string;
    alignContent: string;
    alignItems: string;
    alignSelf: string;
    alignmentBaseline: string;
    all: string;
    animation: string;
    animationDelay: string;
    animationDirection: string;
    animationDuration: string;
    animationFillMode: string;
    animationIterationCount: string;
    animationName: string;
    animationPlayState: string;
    animationTimingFunction: string;
    appearance: string;
    aspectRatio: string;
    backfaceVisibility: string;
    background: string;
    backgroundAttachment: string;
    backgroundBlendMode: string;
    backgroundClip: string;
    backgroundColor: string;
    backgroundImage: string;
    backgroundOrigin: string;
    backgroundPosition: string;
    backgroundPositionX: string;
    backgroundPositionY: string;
    backgroundRepeat: string;
    backgroundSize: string;
    baselineShift: string;
    blockSize: string;
    border: string;
    borderBlock: string;
    borderBlockColor: string;
    borderBlockEnd: string;
    borderBlockEndColor: string;
    borderBlockEndStyle: string;
    borderBlockEndWidth: string;
    borderBlockStart: string;
    borderBlockStartColor: string;
    borderBlockStartStyle: string;
    borderBlockStartWidth: string;
    borderBlockStyle: string;
    borderBlockWidth: string;
    borderBottom: string;
    borderBottomColor: string;
    borderBottomLeftRadius: string;
    borderBottomRightRadius: string;
    borderBottomStyle: string;
    borderBottomWidth: string;
    borderCollapse: string;
    borderColor: string;
    borderEndEndRadius: string;
    borderEndStartRadius: string;
    borderImage: string;
    borderImageOutset: string;
    borderImageRepeat: string;
    borderImageSlice: string;
    borderImageSource: string;
    borderImageWidth: string;
    borderInline: string;
    borderInlineColor: string;
    borderInlineEnd: string;
    borderInlineEndColor: string;
    borderInlineEndStyle: string;
    borderInlineEndWidth: string;
    borderInlineStart: string;
    borderInlineStartColor: string;
    borderInlineStartStyle: string;
    borderInlineStartWidth: string;
    borderInlineStyle: string;
    borderInlineWidth: string;
    borderLeft: string;
    borderLeftColor: string;
    borderLeftStyle: string;
    borderLeftWidth: string;
    borderRadius: string;
    borderRight: string;
    borderRightColor: string;
    borderRightStyle: string;
    borderRightWidth: string;
    borderSpacing: string;
    borderStartEndRadius: string;
    borderStartStartRadius: string;
    borderStyle: string;
    borderTop: string;
    borderTopColor: string;
    borderTopLeftRadius: string;
    borderTopRightRadius: string;
    borderTopStyle: string;
    borderTopWidth: string;
    borderWidth: string;
    bottom: string;
    boxShadow: string;
    boxSizing: string;
    breakAfter: string;
    breakBefore: string;
    breakInside: string;
    captionSide: string;
    caretColor: string;
    clear: string;
    /** @deprecated */
    clip: string;
    clipPath: string;
    clipRule: string;
    color: string;
    colorInterpolation: string;
    colorInterpolationFilters: string;
    colorScheme: string;
    columnCount: string;
    columnFill: string;
    columnGap: string;
    columnRule: string;
    columnRuleColor: string;
    columnRuleStyle: string;
    columnRuleWidth: string;
    columnSpan: string;
    columnWidth: string;
    columns: string;
    contain: string;
    content: string;
    counterIncrement: string;
    counterReset: string;
    counterSet: string;
    cssFloat: string;
    cssText: string;
    cursor: string;
    direction: string;
    display: string;
    dominantBaseline: string;
    emptyCells: string;
    fill: string;
    fillOpacity: string;
    fillRule: string;
    filter: string;
    flex: string;
    flexBasis: string;
    flexDirection: string;
    flexFlow: string;
    flexGrow: string;
    flexShrink: string;
    flexWrap: string;
    float: string;
    floodColor: string;
    floodOpacity: string;
    font: string;
    fontFamily: string;
    fontFeatureSettings: string;
    fontKerning: string;
    fontOpticalSizing: string;
    fontSize: string;
    fontSizeAdjust: string;
    fontStretch: string;
    fontStyle: string;
    fontSynthesis: string;
    fontVariant: string;
    /** @deprecated */
    fontVariantAlternates: string;
    fontVariantCaps: string;
    fontVariantEastAsian: string;
    fontVariantLigatures: string;
    fontVariantNumeric: string;
    fontVariantPosition: string;
    fontVariationSettings: string;
    fontWeight: string;
    gap: string;
    grid: string;
    gridArea: string;
    gridAutoColumns: string;
    gridAutoFlow: string;
    gridAutoRows: string;
    gridColumn: string;
    gridColumnEnd: string;
    /** @deprecated This is a legacy alias of `columnGap`. */
    gridColumnGap: string;
    gridColumnStart: string;
    /** @deprecated This is a legacy alias of `gap`. */
    gridGap: string;
    gridRow: string;
    gridRowEnd: string;
    /** @deprecated This is a legacy alias of `rowGap`. */
    gridRowGap: string;
    gridRowStart: string;
    gridTemplate: string;
    gridTemplateAreas: string;
    gridTemplateColumns: string;
    gridTemplateRows: string;
    height: string;
    hyphens: string;
    /** @deprecated */
    imageOrientation: string;
    imageRendering: string;
    inlineSize: string;
    inset: string;
    insetBlock: string;
    insetBlockEnd: string;
    insetBlockStart: string;
    insetInline: string;
    insetInlineEnd: string;
    insetInlineStart: string;
    isolation: string;
    justifyContent: string;
    justifyItems: string;
    justifySelf: string;
    left: string;
    readonly length: number;
    letterSpacing: string;
    lightingColor: string;
    lineBreak: string;
    lineHeight: string;
    listStyle: string;
    listStyleImage: string;
    listStylePosition: string;
    listStyleType: string;
    margin: string;
    marginBlock: string;
    marginBlockEnd: string;
    marginBlockStart: string;
    marginBottom: string;
    marginInline: string;
    marginInlineEnd: string;
    marginInlineStart: string;
    marginLeft: string;
    marginRight: string;
    marginTop: string;
    marker: string;
    markerEnd: string;
    markerMid: string;
    markerStart: string;
    mask: string;
    maskType: string;
    maxBlockSize: string;
    maxHeight: string;
    maxInlineSize: string;
    maxWidth: string;
    minBlockSize: string;
    minHeight: string;
    minInlineSize: string;
    minWidth: string;
    mixBlendMode: string;
    objectFit: string;
    objectPosition: string;
    offset: string;
    offsetAnchor: string;
    offsetDistance: string;
    offsetPath: string;
    offsetRotate: string;
    opacity: string;
    order: string;
    orphans: string;
    outline: string;
    outlineColor: string;
    outlineOffset: string;
    outlineStyle: string;
    outlineWidth: string;
    overflow: string;
    overflowAnchor: string;
    overflowWrap: string;
    overflowX: string;
    overflowY: string;
    overscrollBehavior: string;
    overscrollBehaviorBlock: string;
    overscrollBehaviorInline: string;
    overscrollBehaviorX: string;
    overscrollBehaviorY: string;
    padding: string;
    paddingBlock: string;
    paddingBlockEnd: string;
    paddingBlockStart: string;
    paddingBottom: string;
    paddingInline: string;
    paddingInlineEnd: string;
    paddingInlineStart: string;
    paddingLeft: string;
    paddingRight: string;
    paddingTop: string;
    pageBreakAfter: string;
    pageBreakBefore: string;
    pageBreakInside: string;
    paintOrder: string;
    readonly parentRule: CSSRule | null;
    perspective: string;
    perspectiveOrigin: string;
    placeContent: string;
    placeItems: string;
    placeSelf: string;
    pointerEvents: string;
    position: string;
    quotes: string;
    resize: string;
    right: string;
    rotate: string;
    rowGap: string;
    rubyPosition: string;
    scale: string;
    scrollBehavior: string;
    scrollMargin: string;
    scrollMarginBlock: string;
    scrollMarginBlockEnd: string;
    scrollMarginBlockStart: string;
    scrollMarginBottom: string;
    scrollMarginInline: string;
    scrollMarginInlineEnd: string;
    scrollMarginInlineStart: string;
    scrollMarginLeft: string;
    scrollMarginRight: string;
    scrollMarginTop: string;
    scrollPadding: string;
    scrollPaddingBlock: string;
    scrollPaddingBlockEnd: string;
    scrollPaddingBlockStart: string;
    scrollPaddingBottom: string;
    scrollPaddingInline: string;
    scrollPaddingInlineEnd: string;
    scrollPaddingInlineStart: string;
    scrollPaddingLeft: string;
    scrollPaddingRight: string;
    scrollPaddingTop: string;
    scrollSnapAlign: string;
    scrollSnapStop: string;
    scrollSnapType: string;
    shapeImageThreshold: string;
    shapeMargin: string;
    shapeOutside: string;
    shapeRendering: string;
    stopColor: string;
    stopOpacity: string;
    stroke: string;
    strokeDasharray: string;
    strokeDashoffset: string;
    strokeLinecap: string;
    strokeLinejoin: string;
    strokeMiterlimit: string;
    strokeOpacity: string;
    strokeWidth: string;
    tabSize: string;
    tableLayout: string;
    textAlign: string;
    textAlignLast: string;
    textAnchor: string;
    textCombineUpright: string;
    textDecoration: string;
    textDecorationColor: string;
    textDecorationLine: string;
    textDecorationSkipInk: string;
    textDecorationStyle: string;
    textDecorationThickness: string;
    textEmphasis: string;
    textEmphasisColor: string;
    textEmphasisPosition: string;
    textEmphasisStyle: string;
    textIndent: string;
    textOrientation: string;
    textOverflow: string;
    textRendering: string;
    textShadow: string;
    textTransform: string;
    textUnderlineOffset: string;
    textUnderlinePosition: string;
    top: string;
    touchAction: string;
    transform: string;
    transformBox: string;
    transformOrigin: string;
    transformStyle: string;
    transition: string;
    transitionDelay: string;
    transitionDuration: string;
    transitionProperty: string;
    transitionTimingFunction: string;
    translate: string;
    unicodeBidi: string;
    userSelect: string;
    verticalAlign: string;
    visibility: string;
    /** @deprecated This is a legacy alias of `alignContent`. */
    webkitAlignContent: string;
    /** @deprecated This is a legacy alias of `alignItems`. */
    webkitAlignItems: string;
    /** @deprecated This is a legacy alias of `alignSelf`. */
    webkitAlignSelf: string;
    /** @deprecated This is a legacy alias of `animation`. */
    webkitAnimation: string;
    /** @deprecated This is a legacy alias of `animationDelay`. */
    webkitAnimationDelay: string;
    /** @deprecated This is a legacy alias of `animationDirection`. */
    webkitAnimationDirection: string;
    /** @deprecated This is a legacy alias of `animationDuration`. */
    webkitAnimationDuration: string;
    /** @deprecated This is a legacy alias of `animationFillMode`. */
    webkitAnimationFillMode: string;
    /** @deprecated This is a legacy alias of `animationIterationCount`. */
    webkitAnimationIterationCount: string;
    /** @deprecated This is a legacy alias of `animationName`. */
    webkitAnimationName: string;
    /** @deprecated This is a legacy alias of `animationPlayState`. */
    webkitAnimationPlayState: string;
    /** @deprecated This is a legacy alias of `animationTimingFunction`. */
    webkitAnimationTimingFunction: string;
    /** @deprecated This is a legacy alias of `appearance`. */
    webkitAppearance: string;
    /** @deprecated This is a legacy alias of `backfaceVisibility`. */
    webkitBackfaceVisibility: string;
    /** @deprecated This is a legacy alias of `backgroundClip`. */
    webkitBackgroundClip: string;
    /** @deprecated This is a legacy alias of `backgroundOrigin`. */
    webkitBackgroundOrigin: string;
    /** @deprecated This is a legacy alias of `backgroundSize`. */
    webkitBackgroundSize: string;
    /** @deprecated This is a legacy alias of `borderBottomLeftRadius`. */
    webkitBorderBottomLeftRadius: string;
    /** @deprecated This is a legacy alias of `borderBottomRightRadius`. */
    webkitBorderBottomRightRadius: string;
    /** @deprecated This is a legacy alias of `borderRadius`. */
    webkitBorderRadius: string;
    /** @deprecated This is a legacy alias of `borderTopLeftRadius`. */
    webkitBorderTopLeftRadius: string;
    /** @deprecated This is a legacy alias of `borderTopRightRadius`. */
    webkitBorderTopRightRadius: string;
    /** @deprecated This is a legacy alias of `boxAlign`. */
    webkitBoxAlign: string;
    /** @deprecated This is a legacy alias of `boxFlex`. */
    webkitBoxFlex: string;
    /** @deprecated This is a legacy alias of `boxOrdinalGroup`. */
    webkitBoxOrdinalGroup: string;
    /** @deprecated This is a legacy alias of `boxOrient`. */
    webkitBoxOrient: string;
    /** @deprecated This is a legacy alias of `boxPack`. */
    webkitBoxPack: string;
    /** @deprecated This is a legacy alias of `boxShadow`. */
    webkitBoxShadow: string;
    /** @deprecated This is a legacy alias of `boxSizing`. */
    webkitBoxSizing: string;
    /** @deprecated This is a legacy alias of `filter`. */
    webkitFilter: string;
    /** @deprecated This is a legacy alias of `flex`. */
    webkitFlex: string;
    /** @deprecated This is a legacy alias of `flexBasis`. */
    webkitFlexBasis: string;
    /** @deprecated This is a legacy alias of `flexDirection`. */
    webkitFlexDirection: string;
    /** @deprecated This is a legacy alias of `flexFlow`. */
    webkitFlexFlow: string;
    /** @deprecated This is a legacy alias of `flexGrow`. */
    webkitFlexGrow: string;
    /** @deprecated This is a legacy alias of `flexShrink`. */
    webkitFlexShrink: string;
    /** @deprecated This is a legacy alias of `flexWrap`. */
    webkitFlexWrap: string;
    /** @deprecated This is a legacy alias of `justifyContent`. */
    webkitJustifyContent: string;
    webkitLineClamp: string;
    /** @deprecated This is a legacy alias of `mask`. */
    webkitMask: string;
    /** @deprecated This is a legacy alias of `maskBorder`. */
    webkitMaskBoxImage: string;
    /** @deprecated This is a legacy alias of `maskBorderOutset`. */
    webkitMaskBoxImageOutset: string;
    /** @deprecated This is a legacy alias of `maskBorderRepeat`. */
    webkitMaskBoxImageRepeat: string;
    /** @deprecated This is a legacy alias of `maskBorderSlice`. */
    webkitMaskBoxImageSlice: string;
    /** @deprecated This is a legacy alias of `maskBorderSource`. */
    webkitMaskBoxImageSource: string;
    /** @deprecated This is a legacy alias of `maskBorderWidth`. */
    webkitMaskBoxImageWidth: string;
    /** @deprecated This is a legacy alias of `maskClip`. */
    webkitMaskClip: string;
    webkitMaskComposite: string;
    /** @deprecated This is a legacy alias of `maskImage`. */
    webkitMaskImage: string;
    /** @deprecated This is a legacy alias of `maskOrigin`. */
    webkitMaskOrigin: string;
    /** @deprecated This is a legacy alias of `maskPosition`. */
    webkitMaskPosition: string;
    /** @deprecated This is a legacy alias of `maskRepeat`. */
    webkitMaskRepeat: string;
    /** @deprecated This is a legacy alias of `maskSize`. */
    webkitMaskSize: string;
    /** @deprecated This is a legacy alias of `order`. */
    webkitOrder: string;
    /** @deprecated This is a legacy alias of `perspective`. */
    webkitPerspective: string;
    /** @deprecated This is a legacy alias of `perspectiveOrigin`. */
    webkitPerspectiveOrigin: string;
    webkitTextFillColor: string;
    webkitTextStroke: string;
    webkitTextStrokeColor: string;
    webkitTextStrokeWidth: string;
    /** @deprecated This is a legacy alias of `transform`. */
    webkitTransform: string;
    /** @deprecated This is a legacy alias of `transformOrigin`. */
    webkitTransformOrigin: string;
    /** @deprecated This is a legacy alias of `transformStyle`. */
    webkitTransformStyle: string;
    /** @deprecated This is a legacy alias of `transition`. */
    webkitTransition: string;
    /** @deprecated This is a legacy alias of `transitionDelay`. */
    webkitTransitionDelay: string;
    /** @deprecated This is a legacy alias of `transitionDuration`. */
    webkitTransitionDuration: string;
    /** @deprecated This is a legacy alias of `transitionProperty`. */
    webkitTransitionProperty: string;
    /** @deprecated This is a legacy alias of `transitionTimingFunction`. */
    webkitTransitionTimingFunction: string;
    /** @deprecated This is a legacy alias of `userSelect`. */
    webkitUserSelect: string;
    whiteSpace: string;
    widows: string;
    width: string;
    willChange: string;
    wordBreak: string;
    wordSpacing: string;
    /** @deprecated */
    wordWrap: string;
    writingMode: string;
    zIndex: string;
    getPropertyPriority(property: string): string;
    getPropertyValue(property: string): string;
    item(index: number): string;
    removeProperty(property: string): string;
    setProperty(property: string, value: string | null, priority?: string): void;
}

/** Used by the dataset HTML attribute to represent data for custom attributes added to elements. */
export interface DOMStringMap {
    [name: string]: string | undefined;
}

export interface FocusOptions {
    preventScroll?: boolean;
}

export interface SVGURIReference {
    readonly href: SVGAnimatedString;
}

export interface RadioNodeList extends NodeList {
    value: string;
}

export interface DocumentEventMap extends DocumentAndElementEventHandlersEventMap, GlobalEventHandlersEventMap {
    "fullscreenchange": Event;
    "fullscreenerror": Event;
    "pointerlockchange": Event;
    "pointerlockerror": Event;
    "readystatechange": Event;
    "visibilitychange": Event;
}

/**
 * Provides contains information about a MIME type associated with a particular plugin. NavigatorPlugins.mimeTypes returns an array of this object.
 * @deprecated
 */
export interface MimeType {
    /**
     * Returns the MIME type's description.
     * @deprecated
     */
    readonly description: string;
    /**
     * Returns the Plugin object that implements this MIME type.
     * @deprecated
     */
    readonly enabledPlugin: Plugin;
    /**
     * Returns the MIME type's typical file extensions, in a comma-separated list.
     * @deprecated
     */
    readonly suffixes: string;
    /**
     * Returns the MIME type.
     * @deprecated
     */
    readonly type: string;
}

/**
 * Provides information about a browser plugin.
 * @deprecated
 */
export interface Plugin {
    [index: number]: MimeType;
    /**
     * Returns the plugin's description.
     * @deprecated
     */
    readonly description: string;
    /**
     * Returns the plugin library's filename, if applicable on the current platform.
     * @deprecated
     */
    readonly filename: string;
    /**
     * Returns the number of MIME types, represented by MimeType objects, supported by the plugin.
     * @deprecated
     */
    readonly length: number;
    /**
     * Returns the plugin's name.
     * @deprecated
     */
    readonly name: string;
    /**
     * Returns the specified MimeType object.
     * @deprecated
     */
    item(index: number): MimeType | null;
    /** @deprecated */
    namedItem(name: string): MimeType | null;
}

export interface StorageEstimate {
    quota?: number;
    usage?: number;
}

export interface ClipboardItem {
    readonly types: ReadonlyArray<string>;
    getType(type: string): Promise<Blob>;
}

export interface PublicKeyCredentialCreationOptions {
    attestation?: AttestationConveyancePreference;
    authenticatorSelection?: AuthenticatorSelectionCriteria;
    challenge: BufferSource;
    excludeCredentials?: PublicKeyCredentialDescriptor[];
    extensions?: AuthenticationExtensionsClientInputs;
    pubKeyCredParams: PublicKeyCredentialParameters[];
    rp: PublicKeyCredentialRpEntity;
    timeout?: number;
    user: PublicKeyCredentialUserEntity;
}

export interface PublicKeyCredentialRequestOptions {
    allowCredentials?: PublicKeyCredentialDescriptor[];
    challenge: BufferSource;
    extensions?: AuthenticationExtensionsClientInputs;
    rpId?: string;
    timeout?: number;
    userVerification?: UserVerificationRequirement;
}

/** Available only in secure contexts. */
export interface GeolocationPosition {
    readonly coords: GeolocationCoordinates;
    readonly timestamp: DOMTimeStamp;
}

export interface GeolocationPositionError {
    readonly code: number;
    readonly message: string;
    readonly PERMISSION_DENIED: number;
    readonly POSITION_UNAVAILABLE: number;
    readonly TIMEOUT: number;
}

export interface MediaConfiguration {
    audio?: AudioConfiguration;
    video?: VideoConfiguration;
}

export interface MediaCapabilitiesInfo {
    powerEfficient: boolean;
    smooth: boolean;
    supported: boolean;
}

export interface MediaTrackConstraints extends MediaTrackConstraintSet {
    advanced?: MediaTrackConstraintSet[];
}

/** Events which indicate that a MediaStream has had tracks added to or removed from the stream through calls to Media Stream API methods. These events are sent to the stream when these changes occur. */
export interface MediaStreamTrackEvent extends Event {
    readonly track: MediaStreamTrack;
}

/** A single media track within a stream; typically, these are audio or video tracks, but other track types may exist as well. */
export interface MediaStreamTrack extends EventTarget {
    contentHint: string;
    enabled: boolean;
    readonly id: string;
    readonly kind: string;
    readonly label: string;
    readonly muted: boolean;
    onended: ((this: MediaStreamTrack, ev: Event) => any) | null;
    onmute: ((this: MediaStreamTrack, ev: Event) => any) | null;
    onunmute: ((this: MediaStreamTrack, ev: Event) => any) | null;
    readonly readyState: MediaStreamTrackState;
    applyConstraints(constraints?: MediaTrackConstraints): Promise<void>;
    clone(): MediaStreamTrack;
    getCapabilities(): MediaTrackCapabilities;
    getConstraints(): MediaTrackConstraints;
    getSettings(): MediaTrackSettings;
    stop(): void;
    addEventListener<K extends keyof MediaStreamTrackEventMap>(type: K, listener: (this: MediaStreamTrack, ev: MediaStreamTrackEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof MediaStreamTrackEventMap>(type: K, listener: (this: MediaStreamTrack, ev: MediaStreamTrackEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

export interface MediaStreamEventMap {
    "addtrack": MediaStreamTrackEvent;
    "removetrack": MediaStreamTrackEvent;
}

export interface MediaImage {
    sizes?: string;
    src: string;
    type?: string;
}

export interface MediaSessionActionDetails {
    action: MediaSessionAction;
    fastSeek?: boolean | null;
    seekOffset?: number | null;
    seekTime?: number | null;
}

export interface PermissionStatusEventMap {
    "change": Event;
}

export interface AbstractWorker {
    onerror: ((this: AbstractWorker, ev: ErrorEvent) => any) | null;
    addEventListener<K extends keyof AbstractWorkerEventMap>(type: K, listener: (this: AbstractWorker, ev: AbstractWorkerEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof AbstractWorkerEventMap>(type: K, listener: (this: AbstractWorker, ev: AbstractWorkerEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

export interface StructuredSerializeOptions {
    transfer?: any[];
}

export interface ServiceWorkerEventMap extends AbstractWorkerEventMap {
    "statechange": Event;
}

/**
 * This Push API interface provides a way to receive notifications from third-party servers as well as request URLs for push notifications.
 * Available only in secure contexts.
 */
export interface PushManager {
    getSubscription(): Promise<PushSubscription | null>;
    permissionState(options?: PushSubscriptionOptionsInit): Promise<PushPermissionState>;
    subscribe(options?: PushSubscriptionOptionsInit): Promise<PushSubscription>;
}

export interface GetNotificationOptions {
    tag?: string;
}

/** This Notifications API interface is used to configure and display desktop notifications to the user. */
export interface Notification extends EventTarget {
    readonly body: string;
    readonly data: any;
    readonly dir: NotificationDirection;
    readonly icon: string;
    readonly lang: string;
    onclick: ((this: Notification, ev: Event) => any) | null;
    onclose: ((this: Notification, ev: Event) => any) | null;
    onerror: ((this: Notification, ev: Event) => any) | null;
    onshow: ((this: Notification, ev: Event) => any) | null;
    readonly tag: string;
    readonly title: string;
    close(): void;
    addEventListener<K extends keyof NotificationEventMap>(type: K, listener: (this: Notification, ev: NotificationEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof NotificationEventMap>(type: K, listener: (this: Notification, ev: NotificationEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

export interface NotificationOptions {
    actions?: NotificationAction[];
    badge?: string;
    body?: string;
    data?: any;
    dir?: NotificationDirection;
    icon?: string;
    image?: string;
    lang?: string;
    renotify?: boolean;
    requireInteraction?: boolean;
    silent?: boolean;
    tag?: string;
    timestamp?: DOMTimeStamp;
    vibrate?: VibratePattern;
}

export interface ServiceWorkerRegistrationEventMap {
    "updatefound": Event;
}

/**
 * This EncryptedMediaExtensions API interface represents a context for message exchange with a content decryption module (CDM).
 * Available only in secure contexts.
 */
export interface MediaKeySession extends EventTarget {
    readonly closed: Promise<MediaKeySessionClosedReason>;
    readonly expiration: number;
    readonly keyStatuses: MediaKeyStatusMap;
    onkeystatuseschange: ((this: MediaKeySession, ev: Event) => any) | null;
    onmessage: ((this: MediaKeySession, ev: MediaKeyMessageEvent) => any) | null;
    readonly sessionId: string;
    close(): Promise<void>;
    generateRequest(initDataType: string, initData: BufferSource): Promise<void>;
    load(sessionId: string): Promise<boolean>;
    remove(): Promise<void>;
    update(response: BufferSource): Promise<void>;
    addEventListener<K extends keyof MediaKeySessionEventMap>(type: K, listener: (this: MediaKeySession, ev: MediaKeySessionEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof MediaKeySessionEventMap>(type: K, listener: (this: MediaKeySession, ev: MediaKeySessionEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

export interface ReadableStreamDefaultReader<R = any> extends ReadableStreamGenericReader {
    read(): Promise<ReadableStreamDefaultReadResult<R>>;
    releaseLock(): void;
}

export interface ReadableWritablePair<R = any, W = any> {
    readable: ReadableStream<R>;
    /**
     * Provides a convenient, chainable way of piping this readable stream through a transform stream (or any other { writable, readable } pair). It simply pipes the stream into the writable side of the supplied pair, and returns the readable side for further use.
     *
     * Piping a stream will lock it for the duration of the pipe, preventing any other consumer from acquiring a reader.
     */
    writable: WritableStream<W>;
}

export interface StreamPipeOptions {
    preventAbort?: boolean;
    preventCancel?: boolean;
    /**
     * Pipes this readable stream to a given writable stream destination. The way in which the piping process behaves under various error conditions can be customized with a number of passed options. It returns a promise that fulfills when the piping process completes successfully, or rejects if any errors were encountered.
     *
     * Piping a stream will lock it for the duration of the pipe, preventing any other consumer from acquiring a reader.
     *
     * Errors and closures of the source and destination streams propagate as follows:
     *
     * An error in this source readable stream will abort destination, unless preventAbort is truthy. The returned promise will be rejected with the source's error, or with any error that occurs during aborting the destination.
     *
     * An error in destination will cancel this source readable stream, unless preventCancel is truthy. The returned promise will be rejected with the destination's error, or with any error that occurs during canceling the source.
     *
     * When this source readable stream closes, destination will be closed, unless preventClose is truthy. The returned promise will be fulfilled once this process completes, unless an error is encountered while closing the destination, in which case it will be rejected with that error.
     *
     * If destination starts out closed or closing, this source readable stream will be canceled, unless preventCancel is true. The returned promise will be rejected with an error indicating piping to a closed stream failed, or with any error that occurs during canceling the source.
     *
     * The signal option can be set to an AbortSignal to allow aborting an ongoing pipe operation via the corresponding AbortController. In this case, this source readable stream will be canceled, and destination aborted, unless the respective options preventCancel or preventAbort are set.
     */
    preventClose?: boolean;
    signal?: AbortSignal;
}

/** This Streams API interface provides a standard abstraction for writing streaming data to a destination, known as a sink. This object comes with built-in backpressure and queuing. */
export interface WritableStream<W = any> {
    readonly locked: boolean;
    abort(reason?: any): Promise<void>;
    close(): Promise<void>;
    getWriter(): WritableStreamDefaultWriter<W>;
}

export interface AbortSignalEventMap {
    "abort": Event;
}

/** An object of this type is returned by the files property of the HTML <input> element; this lets you access the list of files selected with the <input type="file"> element. It's also used for a list of files dropped into web content when using the drag and drop API; see the DataTransfer object for details on this usage. */
export interface FileList {
    [index: number]: File;
    readonly length: number;
    item(index: number): File | null;
}

/** A list of DataTransferItem objects representing items being dragged. During a drag operation, each DragEvent has a dataTransfer property and that property is a DataTransferItemList. */
export interface DataTransferItemList {
    [index: number]: DataTransferItem;
    /** Returns the number of items in the drag data store. */
    readonly length: number;
    /** Adds a new entry for the given data to the drag data store. If the data is plain text then a type string has to be provided also. */
    add(data: string, type: string): DataTransferItem | null;
    add(data: File): DataTransferItem | null;
    /** Removes all the entries in the drag data store. */
    clear(): void;
    /** Removes the indexth entry in the drag data store. */
    remove(index: number): void;
}

/** A single contact point on a touch-sensitive device. The contact point is commonly a finger or stylus and the device may be a touchscreen or trackpad. */
export interface Touch {
    readonly clientX: number;
    readonly clientY: number;
    readonly force: number;
    readonly identifier: number;
    readonly pageX: number;
    readonly pageY: number;
    readonly radiusX: number;
    readonly radiusY: number;
    readonly rotationAngle: number;
    readonly screenX: number;
    readonly screenY: number;
    readonly target: EventTarget;
}

export interface StaticRange extends AbstractRange {
}

export interface MessagePortEventMap {
    "message": MessageEvent;
    "messageerror": MessageEvent;
}

export interface CacheQueryOptions {
    ignoreMethod?: boolean;
    ignoreSearch?: boolean;
    ignoreVary?: boolean;
}

export interface RsaOaepParams extends Algorithm {
    label?: BufferSource;
}

export interface AesCtrParams extends Algorithm {
    counter: BufferSource;
    length: number;
}

export interface AesCbcParams extends Algorithm {
    iv: BufferSource;
}

export interface AesGcmParams extends Algorithm {
    additionalData?: BufferSource;
    iv: BufferSource;
    tagLength?: number;
}

/**
 * The CryptoKey dictionary of the Web Crypto API represents a cryptographic key.
 * Available only in secure contexts.
 */
export interface CryptoKey {
    readonly algorithm: KeyAlgorithm;
    readonly extractable: boolean;
    readonly type: KeyType;
    readonly usages: KeyUsage[];
}

export interface EcdhKeyDeriveParams extends Algorithm {
    public: CryptoKey;
}

export interface HkdfParams extends Algorithm {
    hash: HashAlgorithmIdentifier;
    info: BufferSource;
    salt: BufferSource;
}

export interface Pbkdf2Params extends Algorithm {
    hash: HashAlgorithmIdentifier;
    iterations: number;
    salt: BufferSource;
}

export interface AesDerivedKeyParams extends Algorithm {
    length: number;
}

export interface HmacImportParams extends Algorithm {
    hash: HashAlgorithmIdentifier;
    length?: number;
}

export interface JsonWebKey {
    alg?: string;
    crv?: string;
    d?: string;
    dp?: string;
    dq?: string;
    e?: string;
    ext?: boolean;
    k?: string;
    key_ops?: string[];
    kty?: string;
    n?: string;
    oth?: RsaOtherPrimesInfo[];
    p?: string;
    q?: string;
    qi?: string;
    use?: string;
    x?: string;
    y?: string;
}

export interface RsaHashedKeyGenParams extends RsaKeyGenParams {
    hash: HashAlgorithmIdentifier;
}

export interface EcKeyGenParams extends Algorithm {
    namedCurve: NamedCurve;
}

export interface CryptoKeyPair {
    privateKey?: CryptoKey;
    publicKey?: CryptoKey;
}

export interface AesKeyGenParams extends Algorithm {
    length: number;
}

export interface HmacKeyGenParams extends Algorithm {
    hash: HashAlgorithmIdentifier;
    length?: number;
}

export interface RsaHashedImportParams extends Algorithm {
    hash: HashAlgorithmIdentifier;
}

export interface EcKeyImportParams extends Algorithm {
    namedCurve: NamedCurve;
}

export interface AesKeyAlgorithm extends KeyAlgorithm {
    length: number;
}

export interface RsaPssParams extends Algorithm {
    saltLength: number;
}

export interface EcdsaParams extends Algorithm {
    hash: HashAlgorithmIdentifier;
}

/** The request object does not initially contain any information about the result of the operation, but once information becomes available, an event is fired on the request, and the information becomes available through the properties of the IDBRequest instance. */
export interface IDBRequest<T = any> extends EventTarget {
    /** When a request is completed, returns the error (a DOMException), or null if the request succeeded. Throws a "InvalidStateError" DOMException if the request is still pending. */
    readonly error: DOMException | null;
    onerror: ((this: IDBRequest<T>, ev: Event) => any) | null;
    onsuccess: ((this: IDBRequest<T>, ev: Event) => any) | null;
    /** Returns "pending" until a request is complete, then returns "done". */
    readonly readyState: IDBRequestReadyState;
    /** When a request is completed, returns the result, or undefined if the request failed. Throws a "InvalidStateError" DOMException if the request is still pending. */
    readonly result: T;
    /** Returns the IDBObjectStore, IDBIndex, or IDBCursor the request was made against, or null if is was an open request. */
    readonly source: IDBObjectStore | IDBIndex | IDBCursor;
    /** Returns the IDBTransaction the request was made within. If this as an open request, then it returns an upgrade transaction while it is running, or null otherwise. */
    readonly transaction: IDBTransaction | null;
    addEventListener<K extends keyof IDBRequestEventMap>(type: K, listener: (this: IDBRequest<T>, ev: IDBRequestEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof IDBRequestEventMap>(type: K, listener: (this: IDBRequest<T>, ev: IDBRequestEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** This IndexedDB API interface provides a connection to a database; you can use an IDBDatabase object to open a transaction on your database then create, manipulate, and delete objects (data) in that database. The interface provides the only way to get and manage versions of the database. */
export interface IDBDatabase extends EventTarget {
    /** Returns the name of the database. */
    readonly name: string;
    /** Returns a list of the names of object stores in the database. */
    readonly objectStoreNames: DOMStringList;
    onabort: ((this: IDBDatabase, ev: Event) => any) | null;
    onclose: ((this: IDBDatabase, ev: Event) => any) | null;
    onerror: ((this: IDBDatabase, ev: Event) => any) | null;
    onversionchange: ((this: IDBDatabase, ev: IDBVersionChangeEvent) => any) | null;
    /** Returns the version of the database. */
    readonly version: number;
    /** Closes the connection once all running transactions have finished. */
    close(): void;
    /**
     * Creates a new object store with the given name and options and returns a new IDBObjectStore.
     *
     * Throws a "InvalidStateError" DOMException if not called within an upgrade transaction.
     */
    createObjectStore(name: string, options?: IDBObjectStoreParameters): IDBObjectStore;
    /**
     * Deletes the object store with the given name.
     *
     * Throws a "InvalidStateError" DOMException if not called within an upgrade transaction.
     */
    deleteObjectStore(name: string): void;
    /** Returns a new transaction with the given mode ("readonly" or "readwrite") and scope which can be a single object store name or an array of names. */
    transaction(storeNames: string | string[], mode?: IDBTransactionMode): IDBTransaction;
    addEventListener<K extends keyof IDBDatabaseEventMap>(type: K, listener: (this: IDBDatabase, ev: IDBDatabaseEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof IDBDatabaseEventMap>(type: K, listener: (this: IDBDatabase, ev: IDBDatabaseEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** This IndexedDB API interface indicates that the version of the database has changed, as the result of an IDBOpenDBRequest.onupgradeneeded event handler function. */
export interface IDBVersionChangeEvent extends Event {
    readonly newVersion: number | null;
    readonly oldVersion: number;
}

export interface IDBOpenDBRequestEventMap extends IDBRequestEventMap {
    "blocked": Event;
    "upgradeneeded": IDBVersionChangeEvent;
}

/** Encapsulates a single performance metric that is part of the performance timeline. A performance entry can be directly created by making a performance mark or measure (for example by calling the mark() method) at an explicit point in an application. Performance entries are also created in indirect ways such as loading a resource (such as an image). */
export interface PerformanceEntry {
    readonly duration: DOMHighResTimeStamp;
    readonly entryType: string;
    readonly name: string;
    readonly startTime: DOMHighResTimeStamp;
    toJSON(): any;
}

export interface KeyframeEffectOptions extends EffectTiming {
    composite?: CompositeOperation;
    iterationComposite?: IterationCompositeOperation;
    pseudoElement?: string | null;
}

/** The textual content of Element or Attr. If an element has no markup within its content, it has a single child implementing Text that contains the element's text. However, if the element contains markup, it is parsed into information items and Text nodes that form its children. */
export interface Text extends CharacterData, Slottable {
    /** Returns the combined data of all direct Text node siblings. */
    readonly wholeText: string;
    /** Splits data at the given offset and returns the remainder as Text node. */
    splitText(offset: number): Text;
}

export interface AssignedNodesOptions {
    flatten?: boolean;
}

/** Adds to HTMLElement the properties and methods needed to support basic media-related capabilities that are common to audio and video. */
export interface HTMLMediaElement extends HTMLElement {
    /** Gets or sets a value that indicates whether to start playing the media automatically. */
    autoplay: boolean;
    /** Gets a collection of buffered time ranges. */
    readonly buffered: TimeRanges;
    /** Gets or sets a flag that indicates whether the client provides a set of controls for the media (in case the developer does not include controls for the player). */
    controls: boolean;
    crossOrigin: string | null;
    /** Gets the address or URL of the current media resource that is selected by IHTMLMediaElement. */
    readonly currentSrc: string;
    /** Gets or sets the current playback position, in seconds. */
    currentTime: number;
    defaultMuted: boolean;
    /** Gets or sets the default playback rate when the user is not using fast forward or reverse for a video or audio resource. */
    defaultPlaybackRate: number;
    disableRemotePlayback: boolean;
    /** Returns the duration in seconds of the current media resource. A NaN value is returned if duration is not available, or Infinity if the media resource is streaming. */
    readonly duration: number;
    /** Gets information about whether the playback has ended or not. */
    readonly ended: boolean;
    /** Returns an object representing the current error state of the audio or video element. */
    readonly error: MediaError | null;
    /** Gets or sets a flag to specify whether playback should restart after it completes. */
    loop: boolean;
    /** Available only in secure contexts. */
    readonly mediaKeys: MediaKeys | null;
    /** Gets or sets a flag that indicates whether the audio (either audio or the audio track on video media) is muted. */
    muted: boolean;
    /** Gets the current network activity for the element. */
    readonly networkState: number;
    onencrypted: ((this: HTMLMediaElement, ev: MediaEncryptedEvent) => any) | null;
    onwaitingforkey: ((this: HTMLMediaElement, ev: Event) => any) | null;
    /** Gets a flag that specifies whether playback is paused. */
    readonly paused: boolean;
    /** Gets or sets the current rate of speed for the media resource to play. This speed is expressed as a multiple of the normal speed of the media resource. */
    playbackRate: number;
    /** Gets TimeRanges for the current media resource that has been played. */
    readonly played: TimeRanges;
    /** Gets or sets a value indicating what data should be preloaded, if any. */
    preload: "none" | "metadata" | "auto" | "";
    readonly readyState: number;
    readonly remote: RemotePlayback;
    /** Returns a TimeRanges object that represents the ranges of the current media resource that can be seeked. */
    readonly seekable: TimeRanges;
    /** Gets a flag that indicates whether the client is currently moving to a new playback position in the media resource. */
    readonly seeking: boolean;
    /** The address or URL of the a media resource that is to be considered. */
    src: string;
    srcObject: MediaProvider | null;
    readonly textTracks: TextTrackList;
    /** Gets or sets the volume level for audio portions of the media element. */
    volume: number;
    readonly HAVE_CURRENT_DATA: number;
    readonly HAVE_ENOUGH_DATA: number;
    readonly HAVE_FUTURE_DATA: number;
    readonly HAVE_METADATA: number;
    readonly HAVE_NOTHING: number;
    readonly NETWORK_EMPTY: number;
    readonly NETWORK_IDLE: number;
    readonly NETWORK_LOADING: number;
    readonly NETWORK_NO_SOURCE: number;
    addTextTrack(kind: TextTrackKind, label?: string, language?: string): TextTrack;
    /** Returns a string that specifies whether the client can play a given media resource type. */
    canPlayType(type: string): CanPlayTypeResult;
    fastSeek(time: number): void;
    /** Resets the audio or video object and loads a new media resource. */
    load(): void;
    /** Pauses the current playback and sets paused to TRUE. This can be used to test whether the media is playing or paused. You can also use the pause or play events to tell whether the media is playing or not. */
    pause(): void;
    /** Loads and starts playback of a media resource. */
    play(): Promise<void>;
    /** Available only in secure contexts. */
    setMediaKeys(mediaKeys: MediaKeys | null): Promise<void>;
    addEventListener<K extends keyof HTMLMediaElementEventMap>(type: K, listener: (this: HTMLMediaElement, ev: HTMLMediaElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLMediaElementEventMap>(type: K, listener: (this: HTMLMediaElement, ev: HTMLMediaElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

export interface HTMLMediaElementEventMap extends HTMLElementEventMap {
    "encrypted": MediaEncryptedEvent;
    "waitingforkey": Event;
}

export interface HTMLBodyElementEventMap extends HTMLElementEventMap, WindowEventHandlersEventMap {
    "orientationchange": Event;
}

/** The validity states that an element can be in, with respect to constraint validation. Together, they help explain why an element's value fails to validate, if it's not valid. */
export interface ValidityState {
    readonly badInput: boolean;
    readonly customError: boolean;
    readonly patternMismatch: boolean;
    readonly rangeOverflow: boolean;
    readonly rangeUnderflow: boolean;
    readonly stepMismatch: boolean;
    readonly tooLong: boolean;
    readonly tooShort: boolean;
    readonly typeMismatch: boolean;
    readonly valid: boolean;
    readonly valueMissing: boolean;
}

export interface CanvasRenderingContext2DSettings {
    alpha?: boolean;
    colorSpace?: PredefinedColorSpace;
    desynchronized?: boolean;
    willReadFrequently?: boolean;
}

/** The CanvasRenderingContext2D interface, part of the Canvas API, provides the 2D rendering context for the drawing surface of a <canvas> element. It is used for drawing shapes, text, images, and other objects. */
export interface CanvasRenderingContext2D extends CanvasCompositing, CanvasDrawImage, CanvasDrawPath, CanvasFillStrokeStyles, CanvasFilters, CanvasImageData, CanvasImageSmoothing, CanvasPath, CanvasPathDrawingStyles, CanvasRect, CanvasShadowStyles, CanvasState, CanvasText, CanvasTextDrawingStyles, CanvasTransform, CanvasUserInterface {
    readonly canvas: HTMLCanvasElement;
    getContextAttributes(): CanvasRenderingContext2DSettings;
}

export interface ImageBitmapRenderingContextSettings {
    alpha?: boolean;
}

export interface ImageBitmapRenderingContext {
    /** Returns the canvas element that the context is bound to. */
    readonly canvas: HTMLCanvasElement;
    /** Transfers the underlying bitmap data from imageBitmap to context, and the bitmap becomes the contents of the canvas element to which context is bound. */
    transferFromImageBitmap(bitmap: ImageBitmap | null): void;
}

export interface WebGLContextAttributes {
    alpha?: boolean;
    antialias?: boolean;
    depth?: boolean;
    desynchronized?: boolean;
    failIfMajorPerformanceCaveat?: boolean;
    powerPreference?: WebGLPowerPreference;
    premultipliedAlpha?: boolean;
    preserveDrawingBuffer?: boolean;
    stencil?: boolean;
}

/** Provides an interface to the OpenGL ES 2.0 graphics rendering context for the drawing surface of an HTML <canvas> element. */
export interface WebGLRenderingContext extends WebGLRenderingContextBase, WebGLRenderingContextOverloads {
}

export interface WebGL2RenderingContext extends WebGL2RenderingContextBase, WebGL2RenderingContextOverloads, WebGLRenderingContextBase {
}

export interface BlobCallback {
    (blob: Blob | null): void;
}

export interface HTMLFrameSetElementEventMap extends HTMLElementEventMap, WindowEventHandlersEventMap {
}

export interface FileSystemEntry {
    readonly filesystem: FileSystem;
    readonly fullPath: string;
    readonly isDirectory: boolean;
    readonly isFile: boolean;
    readonly name: string;
    getParent(successCallback?: FileSystemEntryCallback, errorCallback?: ErrorCallback): void;
}

export interface LinkStyle {
    readonly sheet: CSSStyleSheet | null;
}

/** HTMLOptionsCollection is an interface representing a collection of HTML option elements (in document order) and offers methods and properties for traversing the list as well as optionally altering its items. This type is returned solely by the "options" property of select. */
export interface HTMLOptionsCollection extends HTMLCollectionOf<HTMLOptionElement> {
    /**
     * Returns the number of elements in the collection.
     *
     * When set to a smaller number, truncates the number of option elements in the corresponding container.
     *
     * When set to a greater number, adds new blank option elements to that container.
     */
    length: number;
    /**
     * Returns the index of the first selected item, if any, or −1 if there is no selected item.
     *
     * Can be set, to change the selection.
     */
    selectedIndex: number;
    /**
     * Inserts element before the node given by before.
     *
     * The before argument can be a number, in which case element is inserted before the item with that number, or an element from the collection, in which case element is inserted before that element.
     *
     * If before is omitted, null, or a number out of range, then element will be added at the end of the list.
     *
     * This method will throw a "HierarchyRequestError" DOMException if element is an ancestor of the element into which it is to be inserted.
     */
    add(element: HTMLOptionElement | HTMLOptGroupElement, before?: HTMLElement | number | null): void;
    /** Removes the item with index index from the collection. */
    remove(index: number): void;
}

/** This interface also inherits properties from EventTarget. */
export interface TextTrack extends EventTarget {
    /** Returns the text track cues from the text track list of cues that are currently active (i.e. that start before the current playback position and end after it), as a TextTrackCueList object. */
    readonly activeCues: TextTrackCueList | null;
    /** Returns the text track list of cues, as a TextTrackCueList object. */
    readonly cues: TextTrackCueList | null;
    /**
     * Returns the ID of the given track.
     *
     * For in-band tracks, this is the ID that can be used with a fragment if the format supports media fragment syntax, and that can be used with the getTrackById() method.
     *
     * For TextTrack objects corresponding to track elements, this is the ID of the track element.
     */
    readonly id: string;
    /** Returns the text track in-band metadata track dispatch type string. */
    readonly inBandMetadataTrackDispatchType: string;
    /** Returns the text track kind string. */
    readonly kind: TextTrackKind;
    /** Returns the text track label, if there is one, or the empty string otherwise (indicating that a custom label probably needs to be generated from the other attributes of the object if the object is exposed to the user). */
    readonly label: string;
    /** Returns the text track language string. */
    readonly language: string;
    /**
     * Returns the text track mode, represented by a string from the following list:
     *
     * Can be set, to change the mode.
     */
    mode: TextTrackMode;
    oncuechange: ((this: TextTrack, ev: Event) => any) | null;
    /** Adds the given cue to textTrack's text track list of cues. */
    addCue(cue: TextTrackCue): void;
    /** Removes the given cue from textTrack's text track list of cues. */
    removeCue(cue: TextTrackCue): void;
    addEventListener<K extends keyof TextTrackEventMap>(type: K, listener: (this: TextTrack, ev: TextTrackEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof TextTrackEventMap>(type: K, listener: (this: TextTrack, ev: TextTrackEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Returned by the HTMLVideoElement.getVideoPlaybackQuality() method and contains metrics that can be used to determine the playback quality of a video. */
export interface VideoPlaybackQuality {
    /** @deprecated */
    readonly corruptedVideoFrames: number;
    readonly creationTime: DOMHighResTimeStamp;
    readonly droppedVideoFrames: number;
    readonly totalVideoFrames: number;
}

export interface PictureInPictureWindow extends EventTarget {
    readonly height: number;
    onresize: ((this: PictureInPictureWindow, ev: Event) => any) | null;
    readonly width: number;
    addEventListener<K extends keyof PictureInPictureWindowEventMap>(type: K, listener: (this: PictureInPictureWindow, ev: PictureInPictureWindowEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof PictureInPictureWindowEventMap>(type: K, listener: (this: PictureInPictureWindow, ev: PictureInPictureWindowEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

export interface HTMLVideoElementEventMap extends HTMLMediaElementEventMap {
    "enterpictureinpicture": Event;
    "leavepictureinpicture": Event;
}

/** SVG elements whose primary purpose is to directly render graphics into a group. */
export interface SVGGraphicsElement extends SVGElement, SVGTests {
    readonly transform: SVGAnimatedTransformList;
    getBBox(options?: SVGBoundingBoxOptions): DOMRect;
    getCTM(): DOMMatrix | null;
    getScreenCTM(): DOMMatrix | null;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGGraphicsElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGGraphicsElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** The SVGAnimatedString interface represents string attributes which can be animated from each SVG declaration. You need to create SVG attribute before doing anything else, everything should be declared inside this. */
export interface SVGAnimatedString {
    readonly animVal: string;
    baseVal: string;
}

export interface SVGAnimationElement extends SVGElement, SVGTests {
    readonly targetElement: SVGElement | null;
    beginElement(): void;
    beginElementAt(offset: number): void;
    endElement(): void;
    endElementAt(offset: number): void;
    getCurrentTime(): number;
    getSimpleDuration(): number;
    getStartTime(): number;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGAnimationElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGAnimationElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

export interface SVGGeometryElement extends SVGGraphicsElement {
    readonly pathLength: SVGAnimatedNumber;
    getPointAtLength(distance: number): DOMPoint;
    getTotalLength(): number;
    isPointInFill(point?: DOMPointInit): boolean;
    isPointInStroke(point?: DOMPointInit): boolean;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGGeometryElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGGeometryElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Used for attributes of basic type <length> which can be animated. */
export interface SVGAnimatedLength {
    readonly animVal: SVGLength;
    readonly baseVal: SVGLength;
}

/** Used for attributes whose value must be a constant from a particular enumeration and which can be animated. */
export interface SVGAnimatedEnumeration {
    readonly animVal: number;
    baseVal: number;
}

/** Used for attributes which take a list of numbers and which can be animated. */
export interface SVGAnimatedTransformList {
    readonly animVal: SVGTransformList;
    readonly baseVal: SVGTransformList;
}

export interface SVGFilterPrimitiveStandardAttributes {
    readonly height: SVGAnimatedLength;
    readonly result: SVGAnimatedString;
    readonly width: SVGAnimatedLength;
    readonly x: SVGAnimatedLength;
    readonly y: SVGAnimatedLength;
}

/** The SVGAnimatedNumber interface is used for attributes which take a list of numbers and which can be animated. */
export interface SVGAnimatedNumberList {
    readonly animVal: SVGNumberList;
    readonly baseVal: SVGNumberList;
}

/** Used for attributes of basic type <Number> which can be animated. */
export interface SVGAnimatedNumber {
    readonly animVal: number;
    baseVal: number;
}

/** Used for attributes of basic type <integer> which can be animated. */
export interface SVGAnimatedInteger {
    readonly animVal: number;
    baseVal: number;
}

/** Used for attributes of type boolean which can be animated. */
export interface SVGAnimatedBoolean {
    readonly animVal: boolean;
    baseVal: boolean;
}

/** A base interface used by the component transfer function interfaces. */
export interface SVGComponentTransferFunctionElement extends SVGElement {
    readonly amplitude: SVGAnimatedNumber;
    readonly exponent: SVGAnimatedNumber;
    readonly intercept: SVGAnimatedNumber;
    readonly offset: SVGAnimatedNumber;
    readonly slope: SVGAnimatedNumber;
    readonly tableValues: SVGAnimatedNumberList;
    readonly type: SVGAnimatedEnumeration;
    readonly SVG_FECOMPONENTTRANSFER_TYPE_DISCRETE: number;
    readonly SVG_FECOMPONENTTRANSFER_TYPE_GAMMA: number;
    readonly SVG_FECOMPONENTTRANSFER_TYPE_IDENTITY: number;
    readonly SVG_FECOMPONENTTRANSFER_TYPE_LINEAR: number;
    readonly SVG_FECOMPONENTTRANSFER_TYPE_TABLE: number;
    readonly SVG_FECOMPONENTTRANSFER_TYPE_UNKNOWN: number;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGComponentTransferFunctionElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGComponentTransferFunctionElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Used for attributes of type SVGPreserveAspectRatio which can be animated. */
export interface SVGAnimatedPreserveAspectRatio {
    readonly animVal: SVGPreserveAspectRatio;
    readonly baseVal: SVGPreserveAspectRatio;
}

/** The SVGGradient interface is a base interface used by SVGLinearGradientElement and SVGRadialGradientElement. */
export interface SVGGradientElement extends SVGElement, SVGURIReference {
    readonly gradientTransform: SVGAnimatedTransformList;
    readonly gradientUnits: SVGAnimatedEnumeration;
    readonly spreadMethod: SVGAnimatedEnumeration;
    readonly SVG_SPREADMETHOD_PAD: number;
    readonly SVG_SPREADMETHOD_REFLECT: number;
    readonly SVG_SPREADMETHOD_REPEAT: number;
    readonly SVG_SPREADMETHOD_UNKNOWN: number;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGGradientElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGGradientElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

export interface SVGFitToViewBox {
    readonly preserveAspectRatio: SVGAnimatedPreserveAspectRatio;
    readonly viewBox: SVGAnimatedRect;
}

/** Used for attributes of basic type <angle> which can be animated. */
export interface SVGAnimatedAngle {
    readonly animVal: SVGAngle;
    readonly baseVal: SVGAngle;
}

/** Used to represent a value that can be an <angle> or <number> value. An SVGAngle reflected through the animVal attribute is always read only. */
export interface SVGAngle {
    readonly unitType: number;
    value: number;
    valueAsString: string;
    valueInSpecifiedUnits: number;
    readonly SVG_ANGLETYPE_DEG: number;
    readonly SVG_ANGLETYPE_GRAD: number;
    readonly SVG_ANGLETYPE_RAD: number;
    readonly SVG_ANGLETYPE_UNKNOWN: number;
    readonly SVG_ANGLETYPE_UNSPECIFIED: number;
    convertToSpecifiedUnits(unitType: number): void;
    newValueSpecifiedUnits(unitType: number, valueInSpecifiedUnits: number): void;
}

export interface SVGAnimatedPoints {
    readonly animatedPoints: SVGPointList;
    readonly points: SVGPointList;
}

export interface DOMPointReadOnly {
    readonly w: number;
    readonly x: number;
    readonly y: number;
    readonly z: number;
    matrixTransform(matrix?: DOMMatrixInit): DOMPoint;
    toJSON(): any;
}

/** Correspond to the <length> basic data type. */
export interface SVGLength {
    readonly unitType: number;
    value: number;
    valueAsString: string;
    valueInSpecifiedUnits: number;
    readonly SVG_LENGTHTYPE_CM: number;
    readonly SVG_LENGTHTYPE_EMS: number;
    readonly SVG_LENGTHTYPE_EXS: number;
    readonly SVG_LENGTHTYPE_IN: number;
    readonly SVG_LENGTHTYPE_MM: number;
    readonly SVG_LENGTHTYPE_NUMBER: number;
    readonly SVG_LENGTHTYPE_PC: number;
    readonly SVG_LENGTHTYPE_PERCENTAGE: number;
    readonly SVG_LENGTHTYPE_PT: number;
    readonly SVG_LENGTHTYPE_PX: number;
    readonly SVG_LENGTHTYPE_UNKNOWN: number;
    convertToSpecifiedUnits(unitType: number): void;
    newValueSpecifiedUnits(unitType: number, valueInSpecifiedUnits: number): void;
}

export interface DOMMatrix extends DOMMatrixReadOnly {
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;
    m11: number;
    m12: number;
    m13: number;
    m14: number;
    m21: number;
    m22: number;
    m23: number;
    m24: number;
    m31: number;
    m32: number;
    m33: number;
    m34: number;
    m41: number;
    m42: number;
    m43: number;
    m44: number;
    invertSelf(): DOMMatrix;
    multiplySelf(other?: DOMMatrixInit): DOMMatrix;
    preMultiplySelf(other?: DOMMatrixInit): DOMMatrix;
    rotateAxisAngleSelf(x?: number, y?: number, z?: number, angle?: number): DOMMatrix;
    rotateFromVectorSelf(x?: number, y?: number): DOMMatrix;
    rotateSelf(rotX?: number, rotY?: number, rotZ?: number): DOMMatrix;
    scale3dSelf(scale?: number, originX?: number, originY?: number, originZ?: number): DOMMatrix;
    scaleSelf(scaleX?: number, scaleY?: number, scaleZ?: number, originX?: number, originY?: number, originZ?: number): DOMMatrix;
    setMatrixValue(transformList: string): DOMMatrix;
    skewXSelf(sx?: number): DOMMatrix;
    skewYSelf(sy?: number): DOMMatrix;
    translateSelf(tx?: number, ty?: number, tz?: number): DOMMatrix;
}

/** Corresponds to the <number> basic data type. */
export interface SVGNumber {
    value: number;
}

export interface DOMPoint extends DOMPointReadOnly {
    w: number;
    x: number;
    y: number;
    z: number;
}

/** SVGTransform is the interface for one of the component transformations within an SVGTransformList; thus, an SVGTransform object corresponds to a single component (e.g., scale(…) or matrix(…)) within a transform attribute. */
export interface SVGTransform {
    readonly angle: number;
    readonly matrix: DOMMatrix;
    readonly type: number;
    readonly SVG_TRANSFORM_MATRIX: number;
    readonly SVG_TRANSFORM_ROTATE: number;
    readonly SVG_TRANSFORM_SCALE: number;
    readonly SVG_TRANSFORM_SKEWX: number;
    readonly SVG_TRANSFORM_SKEWY: number;
    readonly SVG_TRANSFORM_TRANSLATE: number;
    readonly SVG_TRANSFORM_UNKNOWN: number;
    setMatrix(matrix?: DOMMatrix2DInit): void;
    setRotate(angle: number, cx: number, cy: number): void;
    setScale(sx: number, sy: number): void;
    setSkewX(angle: number): void;
    setSkewY(angle: number): void;
    setTranslate(tx: number, ty: number): void;
}

export interface DOMMatrix2DInit {
    a?: number;
    b?: number;
    c?: number;
    d?: number;
    e?: number;
    f?: number;
    m11?: number;
    m12?: number;
    m21?: number;
    m22?: number;
    m41?: number;
    m42?: number;
}

export interface SVGSVGElementEventMap extends SVGElementEventMap, WindowEventHandlersEventMap {
}

/** Implemented by elements that support attributes that position individual text glyphs. It is inherited by SVGTextElement, SVGTSpanElement, SVGTRefElement and SVGAltGlyphElement. */
export interface SVGTextPositioningElement extends SVGTextContentElement {
    readonly dx: SVGAnimatedLengthList;
    readonly dy: SVGAnimatedLengthList;
    readonly rotate: SVGAnimatedNumberList;
    readonly x: SVGAnimatedLengthList;
    readonly y: SVGAnimatedLengthList;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGTextPositioningElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGTextPositioningElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** Implemented by elements that support rendering child text content. It is inherited by various text-related interfaces, such as SVGTextElement, SVGTSpanElement, SVGTRefElement, SVGAltGlyphElement and SVGTextPathElement. */
export interface SVGTextContentElement extends SVGGraphicsElement {
    readonly lengthAdjust: SVGAnimatedEnumeration;
    readonly textLength: SVGAnimatedLength;
    readonly LENGTHADJUST_SPACING: number;
    readonly LENGTHADJUST_SPACINGANDGLYPHS: number;
    readonly LENGTHADJUST_UNKNOWN: number;
    getCharNumAtPosition(point?: DOMPointInit): number;
    getComputedTextLength(): number;
    getEndPositionOfChar(charnum: number): DOMPoint;
    getExtentOfChar(charnum: number): DOMRect;
    getNumberOfChars(): number;
    getRotationOfChar(charnum: number): number;
    getStartPositionOfChar(charnum: number): DOMPoint;
    getSubStringLength(charnum: number, nchars: number): number;
    /** @deprecated */
    selectSubString(charnum: number, nchars: number): void;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGTextContentElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGTextContentElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** A single style sheet. CSS style sheets will further implement the more specialized CSSStyleSheet interface. */
export interface StyleSheet {
    disabled: boolean;
    readonly href: string | null;
    readonly media: MediaList;
    readonly ownerNode: Element | ProcessingInstruction | null;
    readonly parentStyleSheet: CSSStyleSheet | null;
    readonly title: string | null;
    readonly type: string;
}

/** A CSSRuleList is an (indirect-modify only) array-like object containing an ordered collection of CSSRule objects. */
export interface CSSRuleList {
    [index: number]: CSSRule;
    readonly length: number;
    item(index: number): CSSRule | null;
}

/** A single CSS rule. There are several types of rules, listed in the Type constants section below. */
export interface CSSRule {
    cssText: string;
    readonly parentRule: CSSRule | null;
    readonly parentStyleSheet: CSSStyleSheet | null;
    /** @deprecated */
    readonly type: number;
    readonly CHARSET_RULE: number;
    readonly FONT_FACE_RULE: number;
    readonly IMPORT_RULE: number;
    readonly KEYFRAMES_RULE: number;
    readonly KEYFRAME_RULE: number;
    readonly MEDIA_RULE: number;
    readonly NAMESPACE_RULE: number;
    readonly PAGE_RULE: number;
    readonly STYLE_RULE: number;
    readonly SUPPORTS_RULE: number;
}

export interface ComputedEffectTiming extends EffectTiming {
    activeDuration?: CSSNumberish;
    currentIteration?: number | null;
    endTime?: CSSNumberish;
    localTime?: CSSNumberish | null;
    progress?: CSSNumberish | null;
    startTime?: CSSNumberish;
}

export interface EffectTiming {
    delay?: number;
    direction?: PlaybackDirection;
    duration?: number | string;
    easing?: string;
    endDelay?: number;
    fill?: FillMode;
    iterationStart?: number;
    iterations?: number;
    playbackRate?: number;
}

export interface OptionalEffectTiming {
    delay?: number;
    direction?: PlaybackDirection;
    duration?: number | string;
    easing?: string;
    endDelay?: number;
    fill?: FillMode;
    iterationStart?: number;
    iterations?: number;
    playbackRate?: number;
}

export interface AuthenticatorSelectionCriteria {
    authenticatorAttachment?: AuthenticatorAttachment;
    requireResidentKey?: boolean;
    residentKey?: ResidentKeyRequirement;
    userVerification?: UserVerificationRequirement;
}

export interface PublicKeyCredentialDescriptor {
    id: BufferSource;
    transports?: AuthenticatorTransport[];
    type: PublicKeyCredentialType;
}

export interface AuthenticationExtensionsClientInputs {
    appid?: string;
    appidExclude?: string;
    credProps?: boolean;
    uvm?: boolean;
}

export interface PublicKeyCredentialParameters {
    alg: COSEAlgorithmIdentifier;
    type: PublicKeyCredentialType;
}

export interface PublicKeyCredentialRpEntity extends PublicKeyCredentialEntity {
    id?: string;
}

export interface PublicKeyCredentialUserEntity extends PublicKeyCredentialEntity {
    displayName: string;
    id: BufferSource;
}

/** Available only in secure contexts. */
export interface GeolocationCoordinates {
    readonly accuracy: number;
    readonly altitude: number | null;
    readonly altitudeAccuracy: number | null;
    readonly heading: number | null;
    readonly latitude: number;
    readonly longitude: number;
    readonly speed: number | null;
}

export interface AudioConfiguration {
    bitrate?: number;
    channels?: string;
    contentType: string;
    samplerate?: number;
    spatialRendering?: boolean;
}

export interface VideoConfiguration {
    bitrate: number;
    colorGamut?: ColorGamut;
    contentType: string;
    framerate: number;
    hdrMetadataType?: HdrMetadataType;
    height: number;
    scalabilityMode?: string;
    transferFunction?: TransferFunction;
    width: number;
}

export interface MediaTrackConstraintSet {
    aspectRatio?: ConstrainDouble;
    autoGainControl?: ConstrainBoolean;
    channelCount?: ConstrainULong;
    deviceId?: ConstrainDOMString;
    echoCancellation?: ConstrainBoolean;
    facingMode?: ConstrainDOMString;
    frameRate?: ConstrainDouble;
    groupId?: ConstrainDOMString;
    height?: ConstrainULong;
    latency?: ConstrainDouble;
    noiseSuppression?: ConstrainBoolean;
    sampleRate?: ConstrainULong;
    sampleSize?: ConstrainULong;
    suppressLocalAudioPlayback?: ConstrainBoolean;
    width?: ConstrainULong;
}

export interface MediaTrackCapabilities {
    aspectRatio?: DoubleRange;
    autoGainControl?: boolean[];
    channelCount?: ULongRange;
    cursor?: string[];
    deviceId?: string;
    displaySurface?: string;
    echoCancellation?: boolean[];
    facingMode?: string[];
    frameRate?: DoubleRange;
    groupId?: string;
    height?: ULongRange;
    latency?: DoubleRange;
    logicalSurface?: boolean;
    noiseSuppression?: boolean[];
    resizeMode?: string[];
    sampleRate?: ULongRange;
    sampleSize?: ULongRange;
    width?: ULongRange;
}

export interface MediaTrackSettings {
    aspectRatio?: number;
    autoGainControl?: boolean;
    deviceId?: string;
    echoCancellation?: boolean;
    facingMode?: string;
    frameRate?: number;
    groupId?: string;
    height?: number;
    noiseSuppression?: boolean;
    restrictOwnAudio?: boolean;
    sampleRate?: number;
    sampleSize?: number;
    width?: number;
}

export interface MediaStreamTrackEventMap {
    "ended": Event;
    "mute": Event;
    "unmute": Event;
}

export interface AbstractWorkerEventMap {
    "error": ErrorEvent;
}

/**
 * This Push API interface provides a subcription's URL endpoint and allows unsubscription from a push service.
 * Available only in secure contexts.
 */
export interface PushSubscription {
    readonly endpoint: string;
    readonly options: PushSubscriptionOptions;
    getKey(name: PushEncryptionKeyName): ArrayBuffer | null;
    toJSON(): PushSubscriptionJSON;
    unsubscribe(): Promise<boolean>;
}

export interface PushSubscriptionOptionsInit {
    applicationServerKey?: BufferSource | string | null;
    userVisibleOnly?: boolean;
}

export interface NotificationEventMap {
    "click": Event;
    "close": Event;
    "error": Event;
    "show": Event;
}

export interface NotificationAction {
    action: string;
    icon?: string;
    title: string;
}

/**
 * This EncryptedMediaExtensions API interface is a read-only map of media key statuses by key IDs.
 * Available only in secure contexts.
 */
export interface MediaKeyStatusMap {
    readonly size: number;
    get(keyId: BufferSource): MediaKeyStatus | undefined;
    has(keyId: BufferSource): boolean;
    forEach(callbackfn: (value: MediaKeyStatus, key: BufferSource, parent: MediaKeyStatusMap) => void, thisArg?: any): void;
}

/**
 * This EncryptedMediaExtensions API interface contains the content and related data when the content decryption module generates a message for the session.
 * Available only in secure contexts.
 */
export interface MediaKeyMessageEvent extends Event {
    readonly message: ArrayBuffer;
    readonly messageType: MediaKeyMessageType;
}

export interface MediaKeySessionEventMap {
    "keystatuseschange": Event;
    "message": MediaKeyMessageEvent;
}

export interface ReadableStreamGenericReader {
    readonly closed: Promise<undefined>;
    cancel(reason?: any): Promise<void>;
}

/** This Streams API interface is the object returned by WritableStream.getWriter() and once created locks the < writer to the WritableStream ensuring that no other streams can write to the underlying sink. */
export interface WritableStreamDefaultWriter<W = any> {
    readonly closed: Promise<undefined>;
    readonly desiredSize: number | null;
    readonly ready: Promise<undefined>;
    abort(reason?: any): Promise<void>;
    close(): Promise<void>;
    releaseLock(): void;
    write(chunk?: W): Promise<void>;
}

/** One drag data item. During a drag operation, each drag event has a dataTransfer property which contains a list of drag data items. Each item in the list is a DataTransferItem object. */
export interface DataTransferItem {
    /** Returns the drag data item kind, one of: "string", "file". */
    readonly kind: string;
    /** Returns the drag data item type string. */
    readonly type: string;
    /** Returns a File object, if the drag data item kind is File. */
    getAsFile(): File | null;
    /** Invokes the callback with the string data as the argument, if the drag data item kind is text. */
    getAsString(callback: FunctionStringCallback | null): void;
    webkitGetAsEntry(): FileSystemEntry | null;
}

export interface AbstractRange {
    /** Returns true if range is collapsed, and false otherwise. */
    readonly collapsed: boolean;
    /** Returns range's end node. */
    readonly endContainer: Node;
    /** Returns range's end offset. */
    readonly endOffset: number;
    /** Returns range's start node. */
    readonly startContainer: Node;
    /** Returns range's start offset. */
    readonly startOffset: number;
}

export interface Algorithm {
    name: string;
}

export interface KeyAlgorithm {
    name: string;
}

export interface RsaOtherPrimesInfo {
    d?: string;
    r?: string;
    t?: string;
}

export interface RsaKeyGenParams extends Algorithm {
    modulusLength: number;
    publicExponent: BigInteger;
}

/** An abnormal event (called an exception) which occurs as a result of calling a method or accessing a property of a web API. */
export interface DOMException extends Error {
    readonly code: number;
    readonly message: string;
    readonly name: string;
    readonly ABORT_ERR: number;
    readonly DATA_CLONE_ERR: number;
    readonly DOMSTRING_SIZE_ERR: number;
    readonly HIERARCHY_REQUEST_ERR: number;
    readonly INDEX_SIZE_ERR: number;
    readonly INUSE_ATTRIBUTE_ERR: number;
    readonly INVALID_ACCESS_ERR: number;
    readonly INVALID_CHARACTER_ERR: number;
    readonly INVALID_MODIFICATION_ERR: number;
    readonly INVALID_NODE_TYPE_ERR: number;
    readonly INVALID_STATE_ERR: number;
    readonly NAMESPACE_ERR: number;
    readonly NETWORK_ERR: number;
    readonly NOT_FOUND_ERR: number;
    readonly NOT_SUPPORTED_ERR: number;
    readonly NO_DATA_ALLOWED_ERR: number;
    readonly NO_MODIFICATION_ALLOWED_ERR: number;
    readonly QUOTA_EXCEEDED_ERR: number;
    readonly SECURITY_ERR: number;
    readonly SYNTAX_ERR: number;
    readonly TIMEOUT_ERR: number;
    readonly TYPE_MISMATCH_ERR: number;
    readonly URL_MISMATCH_ERR: number;
    readonly VALIDATION_ERR: number;
    readonly WRONG_DOCUMENT_ERR: number;
}

/** This example shows a variety of different uses of object stores, from updating the data structure with IDBObjectStore.createIndex inside an onupgradeneeded function, to adding a new item to our object store with IDBObjectStore.add. For a full working example, see our To-do Notifications app (view example live.) */
export interface IDBObjectStore {
    /** Returns true if the store has a key generator, and false otherwise. */
    readonly autoIncrement: boolean;
    /** Returns a list of the names of indexes in the store. */
    readonly indexNames: DOMStringList;
    /** Returns the key path of the store, or null if none. */
    readonly keyPath: string | string[];
    /** Returns the name of the store. */
    name: string;
    /** Returns the associated transaction. */
    readonly transaction: IDBTransaction;
    /**
     * Adds or updates a record in store with the given value and key.
     *
     * If the store uses in-line keys and key is specified a "DataError" DOMException will be thrown.
     *
     * If put() is used, any existing record with the key will be replaced. If add() is used, and if a record with the key already exists the request will fail, with request's error set to a "ConstraintError" DOMException.
     *
     * If successful, request's result will be the record's key.
     */
    add(value: any, key?: IDBValidKey): IDBRequest<IDBValidKey>;
    /**
     * Deletes all records in store.
     *
     * If successful, request's result will be undefined.
     */
    clear(): IDBRequest<undefined>;
    /**
     * Retrieves the number of records matching the given key or key range in query.
     *
     * If successful, request's result will be the count.
     */
    count(query?: IDBValidKey | IDBKeyRange): IDBRequest<number>;
    /**
     * Creates a new index in store with the given name, keyPath and options and returns a new IDBIndex. If the keyPath and options define constraints that cannot be satisfied with the data already in store the upgrade transaction will abort with a "ConstraintError" DOMException.
     *
     * Throws an "InvalidStateError" DOMException if not called within an upgrade transaction.
     */
    createIndex(name: string, keyPath: string | string[], options?: IDBIndexParameters): IDBIndex;
    /**
     * Deletes records in store with the given key or in the given key range in query.
     *
     * If successful, request's result will be undefined.
     */
    delete(query: IDBValidKey | IDBKeyRange): IDBRequest<undefined>;
    /**
     * Deletes the index in store with the given name.
     *
     * Throws an "InvalidStateError" DOMException if not called within an upgrade transaction.
     */
    deleteIndex(name: string): void;
    /**
     * Retrieves the value of the first record matching the given key or key range in query.
     *
     * If successful, request's result will be the value, or undefined if there was no matching record.
     */
    get(query: IDBValidKey | IDBKeyRange): IDBRequest<any>;
    /**
     * Retrieves the values of the records matching the given key or key range in query (up to count if given).
     *
     * If successful, request's result will be an Array of the values.
     */
    getAll(query?: IDBValidKey | IDBKeyRange | null, count?: number): IDBRequest<any[]>;
    /**
     * Retrieves the keys of records matching the given key or key range in query (up to count if given).
     *
     * If successful, request's result will be an Array of the keys.
     */
    getAllKeys(query?: IDBValidKey | IDBKeyRange | null, count?: number): IDBRequest<IDBValidKey[]>;
    /**
     * Retrieves the key of the first record matching the given key or key range in query.
     *
     * If successful, request's result will be the key, or undefined if there was no matching record.
     */
    getKey(query: IDBValidKey | IDBKeyRange): IDBRequest<IDBValidKey | undefined>;
    index(name: string): IDBIndex;
    /**
     * Opens a cursor over the records matching query, ordered by direction. If query is null, all records in store are matched.
     *
     * If successful, request's result will be an IDBCursorWithValue pointing at the first matching record, or null if there were no matching records.
     */
    openCursor(query?: IDBValidKey | IDBKeyRange | null, direction?: IDBCursorDirection): IDBRequest<IDBCursorWithValue | null>;
    /**
     * Opens a cursor with key only flag set over the records matching query, ordered by direction. If query is null, all records in store are matched.
     *
     * If successful, request's result will be an IDBCursor pointing at the first matching record, or null if there were no matching records.
     */
    openKeyCursor(query?: IDBValidKey | IDBKeyRange | null, direction?: IDBCursorDirection): IDBRequest<IDBCursor | null>;
    /**
     * Adds or updates a record in store with the given value and key.
     *
     * If the store uses in-line keys and key is specified a "DataError" DOMException will be thrown.
     *
     * If put() is used, any existing record with the key will be replaced. If add() is used, and if a record with the key already exists the request will fail, with request's error set to a "ConstraintError" DOMException.
     *
     * If successful, request's result will be the record's key.
     */
    put(value: any, key?: IDBValidKey): IDBRequest<IDBValidKey>;
}

/** IDBIndex interface of the IndexedDB API provides asynchronous access to an index in a database. An index is a kind of object store for looking up records in another object store, called the referenced object store. You use this interface to retrieve data. */
export interface IDBIndex {
    readonly keyPath: string | string[];
    readonly multiEntry: boolean;
    /** Returns the name of the index. */
    name: string;
    /** Returns the IDBObjectStore the index belongs to. */
    readonly objectStore: IDBObjectStore;
    readonly unique: boolean;
    /**
     * Retrieves the number of records matching the given key or key range in query.
     *
     * If successful, request's result will be the count.
     */
    count(query?: IDBValidKey | IDBKeyRange): IDBRequest<number>;
    /**
     * Retrieves the value of the first record matching the given key or key range in query.
     *
     * If successful, request's result will be the value, or undefined if there was no matching record.
     */
    get(query: IDBValidKey | IDBKeyRange): IDBRequest<any>;
    /**
     * Retrieves the values of the records matching the given key or key range in query (up to count if given).
     *
     * If successful, request's result will be an Array of the values.
     */
    getAll(query?: IDBValidKey | IDBKeyRange | null, count?: number): IDBRequest<any[]>;
    /**
     * Retrieves the keys of records matching the given key or key range in query (up to count if given).
     *
     * If successful, request's result will be an Array of the keys.
     */
    getAllKeys(query?: IDBValidKey | IDBKeyRange | null, count?: number): IDBRequest<IDBValidKey[]>;
    /**
     * Retrieves the key of the first record matching the given key or key range in query.
     *
     * If successful, request's result will be the key, or undefined if there was no matching record.
     */
    getKey(query: IDBValidKey | IDBKeyRange): IDBRequest<IDBValidKey | undefined>;
    /**
     * Opens a cursor over the records matching query, ordered by direction. If query is null, all records in index are matched.
     *
     * If successful, request's result will be an IDBCursorWithValue, or null if there were no matching records.
     */
    openCursor(query?: IDBValidKey | IDBKeyRange | null, direction?: IDBCursorDirection): IDBRequest<IDBCursorWithValue | null>;
    /**
     * Opens a cursor with key only flag set over the records matching query, ordered by direction. If query is null, all records in index are matched.
     *
     * If successful, request's result will be an IDBCursor, or null if there were no matching records.
     */
    openKeyCursor(query?: IDBValidKey | IDBKeyRange | null, direction?: IDBCursorDirection): IDBRequest<IDBCursor | null>;
}

/** This IndexedDB API interface represents a cursor for traversing or iterating over multiple records in a database. */
export interface IDBCursor {
    /** Returns the direction ("next", "nextunique", "prev" or "prevunique") of the cursor. */
    readonly direction: IDBCursorDirection;
    /** Returns the key of the cursor. Throws a "InvalidStateError" DOMException if the cursor is advancing or is finished. */
    readonly key: IDBValidKey;
    /** Returns the effective key of the cursor. Throws a "InvalidStateError" DOMException if the cursor is advancing or is finished. */
    readonly primaryKey: IDBValidKey;
    readonly request: IDBRequest;
    /** Returns the IDBObjectStore or IDBIndex the cursor was opened from. */
    readonly source: IDBObjectStore | IDBIndex;
    /** Advances the cursor through the next count records in range. */
    advance(count: number): void;
    /** Advances the cursor to the next record in range. */
    continue(key?: IDBValidKey): void;
    /** Advances the cursor to the next record in range matching or after key and primaryKey. Throws an "InvalidAccessError" DOMException if the source is not an index. */
    continuePrimaryKey(key: IDBValidKey, primaryKey: IDBValidKey): void;
    /**
     * Delete the record pointed at by the cursor with a new value.
     *
     * If successful, request's result will be undefined.
     */
    delete(): IDBRequest<undefined>;
    /**
     * Updated the record pointed at by the cursor with a new value.
     *
     * Throws a "DataError" DOMException if the effective object store uses in-line keys and the key would have changed.
     *
     * If successful, request's result will be the record's key.
     */
    update(value: any): IDBRequest<IDBValidKey>;
}

export interface IDBTransaction extends EventTarget {
    /** Returns the transaction's connection. */
    readonly db: IDBDatabase;
    /** If the transaction was aborted, returns the error (a DOMException) providing the reason. */
    readonly error: DOMException | null;
    /** Returns the mode the transaction was created with ("readonly" or "readwrite"), or "versionchange" for an upgrade transaction. */
    readonly mode: IDBTransactionMode;
    /** Returns a list of the names of object stores in the transaction's scope. For an upgrade transaction this is all object stores in the database. */
    readonly objectStoreNames: DOMStringList;
    onabort: ((this: IDBTransaction, ev: Event) => any) | null;
    oncomplete: ((this: IDBTransaction, ev: Event) => any) | null;
    onerror: ((this: IDBTransaction, ev: Event) => any) | null;
    /** Aborts the transaction. All pending requests will fail with a "AbortError" DOMException and all changes made to the database will be reverted. */
    abort(): void;
    commit(): void;
    /** Returns an IDBObjectStore in the transaction's scope. */
    objectStore(name: string): IDBObjectStore;
    addEventListener<K extends keyof IDBTransactionEventMap>(type: K, listener: (this: IDBTransaction, ev: IDBTransactionEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof IDBTransactionEventMap>(type: K, listener: (this: IDBTransaction, ev: IDBTransactionEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

export interface IDBRequestEventMap {
    "error": Event;
    "success": Event;
}

/** A type returned by some APIs which contains a list of DOMString (strings). */
export interface DOMStringList {
    [index: number]: string;
    /** Returns the number of strings in strings. */
    readonly length: number;
    /** Returns true if strings contains string, and false otherwise. */
    contains(string: string): boolean;
    /** Returns the string with index index from strings. */
    item(index: number): string | null;
}

export interface IDBObjectStoreParameters {
    autoIncrement?: boolean;
    keyPath?: string | string[] | null;
}

export interface IDBDatabaseEventMap {
    "abort": Event;
    "close": Event;
    "error": Event;
    "versionchange": IDBVersionChangeEvent;
}

/** The CharacterData abstract interface represents a Node object that contains characters. This is an abstract interface, meaning there aren't any object of type CharacterData: it is implemented by other interfaces, like Text, Comment, or ProcessingInstruction which aren't abstract. */
export interface CharacterData extends Node, ChildNode, NonDocumentTypeChildNode {
    data: string;
    readonly length: number;
    readonly ownerDocument: Document;
    appendData(data: string): void;
    deleteData(offset: number, count: number): void;
    insertData(offset: number, data: string): void;
    replaceData(offset: number, count: number, data: string): void;
    substringData(offset: number, count: number): string;
}

/** Used to represent a set of time ranges, primarily for the purpose of tracking which portions of media have been buffered when loading it for use by the <audio> and <video> elements. */
export interface TimeRanges {
    /** Returns the number of ranges in the object. */
    readonly length: number;
    /**
     * Returns the time for the end of the range with the given index.
     *
     * Throws an "IndexSizeError" DOMException if the index is out of range.
     */
    end(index: number): number;
    /**
     * Returns the time for the start of the range with the given index.
     *
     * Throws an "IndexSizeError" DOMException if the index is out of range.
     */
    start(index: number): number;
}

/** An error which occurred while handling media in an HTML media element based on HTMLMediaElement, such as <audio> or <video>. */
export interface MediaError {
    readonly code: number;
    readonly message: string;
    readonly MEDIA_ERR_ABORTED: number;
    readonly MEDIA_ERR_DECODE: number;
    readonly MEDIA_ERR_NETWORK: number;
    readonly MEDIA_ERR_SRC_NOT_SUPPORTED: number;
}

export interface MediaEncryptedEvent extends Event {
    readonly initData: ArrayBuffer | null;
    readonly initDataType: string;
}

export interface RemotePlayback extends EventTarget {
    onconnect: ((this: RemotePlayback, ev: Event) => any) | null;
    onconnecting: ((this: RemotePlayback, ev: Event) => any) | null;
    ondisconnect: ((this: RemotePlayback, ev: Event) => any) | null;
    readonly state: RemotePlaybackState;
    cancelWatchAvailability(id?: number): Promise<void>;
    prompt(): Promise<void>;
    watchAvailability(callback: RemotePlaybackAvailabilityCallback): Promise<number>;
    addEventListener<K extends keyof RemotePlaybackEventMap>(type: K, listener: (this: RemotePlayback, ev: RemotePlaybackEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof RemotePlaybackEventMap>(type: K, listener: (this: RemotePlayback, ev: RemotePlaybackEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

export interface TextTrackList extends EventTarget {
    [index: number]: TextTrack;
    readonly length: number;
    onaddtrack: ((this: TextTrackList, ev: TrackEvent) => any) | null;
    onchange: ((this: TextTrackList, ev: Event) => any) | null;
    onremovetrack: ((this: TextTrackList, ev: TrackEvent) => any) | null;
    getTrackById(id: string): TextTrack | null;
    addEventListener<K extends keyof TextTrackListEventMap>(type: K, listener: (this: TextTrackList, ev: TextTrackListEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof TextTrackListEventMap>(type: K, listener: (this: TextTrackList, ev: TextTrackListEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

export interface CanvasCompositing {
    globalAlpha: number;
    globalCompositeOperation: string;
}

export interface CanvasDrawImage {
    drawImage(image: CanvasImageSource, dx: number, dy: number): void;
    drawImage(image: CanvasImageSource, dx: number, dy: number, dw: number, dh: number): void;
    drawImage(image: CanvasImageSource, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number): void;
}

export interface CanvasDrawPath {
    beginPath(): void;
    clip(fillRule?: CanvasFillRule): void;
    clip(path: Path2D, fillRule?: CanvasFillRule): void;
    fill(fillRule?: CanvasFillRule): void;
    fill(path: Path2D, fillRule?: CanvasFillRule): void;
    isPointInPath(x: number, y: number, fillRule?: CanvasFillRule): boolean;
    isPointInPath(path: Path2D, x: number, y: number, fillRule?: CanvasFillRule): boolean;
    isPointInStroke(x: number, y: number): boolean;
    isPointInStroke(path: Path2D, x: number, y: number): boolean;
    stroke(): void;
    stroke(path: Path2D): void;
}

export interface CanvasFillStrokeStyles {
    fillStyle: string | CanvasGradient | CanvasPattern;
    strokeStyle: string | CanvasGradient | CanvasPattern;
    createLinearGradient(x0: number, y0: number, x1: number, y1: number): CanvasGradient;
    createPattern(image: CanvasImageSource, repetition: string | null): CanvasPattern | null;
    createRadialGradient(x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): CanvasGradient;
}

export interface CanvasFilters {
    filter: string;
}

export interface CanvasImageData {
    createImageData(sw: number, sh: number, settings?: ImageDataSettings): ImageData;
    createImageData(imagedata: ImageData): ImageData;
    getImageData(sx: number, sy: number, sw: number, sh: number, settings?: ImageDataSettings): ImageData;
    putImageData(imagedata: ImageData, dx: number, dy: number): void;
    putImageData(imagedata: ImageData, dx: number, dy: number, dirtyX: number, dirtyY: number, dirtyWidth: number, dirtyHeight: number): void;
}

export interface CanvasImageSmoothing {
    imageSmoothingEnabled: boolean;
    imageSmoothingQuality: ImageSmoothingQuality;
}

export interface CanvasPath {
    arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, counterclockwise?: boolean): void;
    arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void;
    bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void;
    closePath(): void;
    ellipse(x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, counterclockwise?: boolean): void;
    lineTo(x: number, y: number): void;
    moveTo(x: number, y: number): void;
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
    rect(x: number, y: number, w: number, h: number): void;
}

export interface CanvasPathDrawingStyles {
    lineCap: CanvasLineCap;
    lineDashOffset: number;
    lineJoin: CanvasLineJoin;
    lineWidth: number;
    miterLimit: number;
    getLineDash(): number[];
    setLineDash(segments: number[]): void;
}

export interface CanvasRect {
    clearRect(x: number, y: number, w: number, h: number): void;
    fillRect(x: number, y: number, w: number, h: number): void;
    strokeRect(x: number, y: number, w: number, h: number): void;
}

export interface CanvasShadowStyles {
    shadowBlur: number;
    shadowColor: string;
    shadowOffsetX: number;
    shadowOffsetY: number;
}

export interface CanvasState {
    restore(): void;
    save(): void;
}

export interface CanvasText {
    fillText(text: string, x: number, y: number, maxWidth?: number): void;
    measureText(text: string): TextMetrics;
    strokeText(text: string, x: number, y: number, maxWidth?: number): void;
}

export interface CanvasTextDrawingStyles {
    direction: CanvasDirection;
    font: string;
    textAlign: CanvasTextAlign;
    textBaseline: CanvasTextBaseline;
}

export interface CanvasTransform {
    getTransform(): DOMMatrix;
    resetTransform(): void;
    rotate(angle: number): void;
    scale(x: number, y: number): void;
    setTransform(a: number, b: number, c: number, d: number, e: number, f: number): void;
    setTransform(transform?: DOMMatrix2DInit): void;
    transform(a: number, b: number, c: number, d: number, e: number, f: number): void;
    translate(x: number, y: number): void;
}

export interface CanvasUserInterface {
    drawFocusIfNeeded(element: Element): void;
    drawFocusIfNeeded(path: Path2D, element: Element): void;
}

export interface WebGLRenderingContextBase {
    readonly canvas: HTMLCanvasElement;
    readonly drawingBufferHeight: GLsizei;
    readonly drawingBufferWidth: GLsizei;
    readonly ACTIVE_ATTRIBUTES: GLenum;
    readonly ACTIVE_TEXTURE: GLenum;
    readonly ACTIVE_UNIFORMS: GLenum;
    readonly ALIASED_LINE_WIDTH_RANGE: GLenum;
    readonly ALIASED_POINT_SIZE_RANGE: GLenum;
    readonly ALPHA: GLenum;
    readonly ALPHA_BITS: GLenum;
    readonly ALWAYS: GLenum;
    readonly ARRAY_BUFFER: GLenum;
    readonly ARRAY_BUFFER_BINDING: GLenum;
    readonly ATTACHED_SHADERS: GLenum;
    readonly BACK: GLenum;
    readonly BLEND: GLenum;
    readonly BLEND_COLOR: GLenum;
    readonly BLEND_DST_ALPHA: GLenum;
    readonly BLEND_DST_RGB: GLenum;
    readonly BLEND_EQUATION: GLenum;
    readonly BLEND_EQUATION_ALPHA: GLenum;
    readonly BLEND_EQUATION_RGB: GLenum;
    readonly BLEND_SRC_ALPHA: GLenum;
    readonly BLEND_SRC_RGB: GLenum;
    readonly BLUE_BITS: GLenum;
    readonly BOOL: GLenum;
    readonly BOOL_VEC2: GLenum;
    readonly BOOL_VEC3: GLenum;
    readonly BOOL_VEC4: GLenum;
    readonly BROWSER_DEFAULT_WEBGL: GLenum;
    readonly BUFFER_SIZE: GLenum;
    readonly BUFFER_USAGE: GLenum;
    readonly BYTE: GLenum;
    readonly CCW: GLenum;
    readonly CLAMP_TO_EDGE: GLenum;
    readonly COLOR_ATTACHMENT0: GLenum;
    readonly COLOR_BUFFER_BIT: GLenum;
    readonly COLOR_CLEAR_VALUE: GLenum;
    readonly COLOR_WRITEMASK: GLenum;
    readonly COMPILE_STATUS: GLenum;
    readonly COMPRESSED_TEXTURE_FORMATS: GLenum;
    readonly CONSTANT_ALPHA: GLenum;
    readonly CONSTANT_COLOR: GLenum;
    readonly CONTEXT_LOST_WEBGL: GLenum;
    readonly CULL_FACE: GLenum;
    readonly CULL_FACE_MODE: GLenum;
    readonly CURRENT_PROGRAM: GLenum;
    readonly CURRENT_VERTEX_ATTRIB: GLenum;
    readonly CW: GLenum;
    readonly DECR: GLenum;
    readonly DECR_WRAP: GLenum;
    readonly DELETE_STATUS: GLenum;
    readonly DEPTH_ATTACHMENT: GLenum;
    readonly DEPTH_BITS: GLenum;
    readonly DEPTH_BUFFER_BIT: GLenum;
    readonly DEPTH_CLEAR_VALUE: GLenum;
    readonly DEPTH_COMPONENT: GLenum;
    readonly DEPTH_COMPONENT16: GLenum;
    readonly DEPTH_FUNC: GLenum;
    readonly DEPTH_RANGE: GLenum;
    readonly DEPTH_STENCIL: GLenum;
    readonly DEPTH_STENCIL_ATTACHMENT: GLenum;
    readonly DEPTH_TEST: GLenum;
    readonly DEPTH_WRITEMASK: GLenum;
    readonly DITHER: GLenum;
    readonly DONT_CARE: GLenum;
    readonly DST_ALPHA: GLenum;
    readonly DST_COLOR: GLenum;
    readonly DYNAMIC_DRAW: GLenum;
    readonly ELEMENT_ARRAY_BUFFER: GLenum;
    readonly ELEMENT_ARRAY_BUFFER_BINDING: GLenum;
    readonly EQUAL: GLenum;
    readonly FASTEST: GLenum;
    readonly FLOAT: GLenum;
    readonly FLOAT_MAT2: GLenum;
    readonly FLOAT_MAT3: GLenum;
    readonly FLOAT_MAT4: GLenum;
    readonly FLOAT_VEC2: GLenum;
    readonly FLOAT_VEC3: GLenum;
    readonly FLOAT_VEC4: GLenum;
    readonly FRAGMENT_SHADER: GLenum;
    readonly FRAMEBUFFER: GLenum;
    readonly FRAMEBUFFER_ATTACHMENT_OBJECT_NAME: GLenum;
    readonly FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE: GLenum;
    readonly FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE: GLenum;
    readonly FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL: GLenum;
    readonly FRAMEBUFFER_BINDING: GLenum;
    readonly FRAMEBUFFER_COMPLETE: GLenum;
    readonly FRAMEBUFFER_INCOMPLETE_ATTACHMENT: GLenum;
    readonly FRAMEBUFFER_INCOMPLETE_DIMENSIONS: GLenum;
    readonly FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT: GLenum;
    readonly FRAMEBUFFER_UNSUPPORTED: GLenum;
    readonly FRONT: GLenum;
    readonly FRONT_AND_BACK: GLenum;
    readonly FRONT_FACE: GLenum;
    readonly FUNC_ADD: GLenum;
    readonly FUNC_REVERSE_SUBTRACT: GLenum;
    readonly FUNC_SUBTRACT: GLenum;
    readonly GENERATE_MIPMAP_HINT: GLenum;
    readonly GEQUAL: GLenum;
    readonly GREATER: GLenum;
    readonly GREEN_BITS: GLenum;
    readonly HIGH_FLOAT: GLenum;
    readonly HIGH_INT: GLenum;
    readonly IMPLEMENTATION_COLOR_READ_FORMAT: GLenum;
    readonly IMPLEMENTATION_COLOR_READ_TYPE: GLenum;
    readonly INCR: GLenum;
    readonly INCR_WRAP: GLenum;
    readonly INT: GLenum;
    readonly INT_VEC2: GLenum;
    readonly INT_VEC3: GLenum;
    readonly INT_VEC4: GLenum;
    readonly INVALID_ENUM: GLenum;
    readonly INVALID_FRAMEBUFFER_OPERATION: GLenum;
    readonly INVALID_OPERATION: GLenum;
    readonly INVALID_VALUE: GLenum;
    readonly INVERT: GLenum;
    readonly KEEP: GLenum;
    readonly LEQUAL: GLenum;
    readonly LESS: GLenum;
    readonly LINEAR: GLenum;
    readonly LINEAR_MIPMAP_LINEAR: GLenum;
    readonly LINEAR_MIPMAP_NEAREST: GLenum;
    readonly LINES: GLenum;
    readonly LINE_LOOP: GLenum;
    readonly LINE_STRIP: GLenum;
    readonly LINE_WIDTH: GLenum;
    readonly LINK_STATUS: GLenum;
    readonly LOW_FLOAT: GLenum;
    readonly LOW_INT: GLenum;
    readonly LUMINANCE: GLenum;
    readonly LUMINANCE_ALPHA: GLenum;
    readonly MAX_COMBINED_TEXTURE_IMAGE_UNITS: GLenum;
    readonly MAX_CUBE_MAP_TEXTURE_SIZE: GLenum;
    readonly MAX_FRAGMENT_UNIFORM_VECTORS: GLenum;
    readonly MAX_RENDERBUFFER_SIZE: GLenum;
    readonly MAX_TEXTURE_IMAGE_UNITS: GLenum;
    readonly MAX_TEXTURE_SIZE: GLenum;
    readonly MAX_VARYING_VECTORS: GLenum;
    readonly MAX_VERTEX_ATTRIBS: GLenum;
    readonly MAX_VERTEX_TEXTURE_IMAGE_UNITS: GLenum;
    readonly MAX_VERTEX_UNIFORM_VECTORS: GLenum;
    readonly MAX_VIEWPORT_DIMS: GLenum;
    readonly MEDIUM_FLOAT: GLenum;
    readonly MEDIUM_INT: GLenum;
    readonly MIRRORED_REPEAT: GLenum;
    readonly NEAREST: GLenum;
    readonly NEAREST_MIPMAP_LINEAR: GLenum;
    readonly NEAREST_MIPMAP_NEAREST: GLenum;
    readonly NEVER: GLenum;
    readonly NICEST: GLenum;
    readonly NONE: GLenum;
    readonly NOTEQUAL: GLenum;
    readonly NO_ERROR: GLenum;
    readonly ONE: GLenum;
    readonly ONE_MINUS_CONSTANT_ALPHA: GLenum;
    readonly ONE_MINUS_CONSTANT_COLOR: GLenum;
    readonly ONE_MINUS_DST_ALPHA: GLenum;
    readonly ONE_MINUS_DST_COLOR: GLenum;
    readonly ONE_MINUS_SRC_ALPHA: GLenum;
    readonly ONE_MINUS_SRC_COLOR: GLenum;
    readonly OUT_OF_MEMORY: GLenum;
    readonly PACK_ALIGNMENT: GLenum;
    readonly POINTS: GLenum;
    readonly POLYGON_OFFSET_FACTOR: GLenum;
    readonly POLYGON_OFFSET_FILL: GLenum;
    readonly POLYGON_OFFSET_UNITS: GLenum;
    readonly RED_BITS: GLenum;
    readonly RENDERBUFFER: GLenum;
    readonly RENDERBUFFER_ALPHA_SIZE: GLenum;
    readonly RENDERBUFFER_BINDING: GLenum;
    readonly RENDERBUFFER_BLUE_SIZE: GLenum;
    readonly RENDERBUFFER_DEPTH_SIZE: GLenum;
    readonly RENDERBUFFER_GREEN_SIZE: GLenum;
    readonly RENDERBUFFER_HEIGHT: GLenum;
    readonly RENDERBUFFER_INTERNAL_FORMAT: GLenum;
    readonly RENDERBUFFER_RED_SIZE: GLenum;
    readonly RENDERBUFFER_STENCIL_SIZE: GLenum;
    readonly RENDERBUFFER_WIDTH: GLenum;
    readonly RENDERER: GLenum;
    readonly REPEAT: GLenum;
    readonly REPLACE: GLenum;
    readonly RGB: GLenum;
    readonly RGB565: GLenum;
    readonly RGB5_A1: GLenum;
    readonly RGBA: GLenum;
    readonly RGBA4: GLenum;
    readonly SAMPLER_2D: GLenum;
    readonly SAMPLER_CUBE: GLenum;
    readonly SAMPLES: GLenum;
    readonly SAMPLE_ALPHA_TO_COVERAGE: GLenum;
    readonly SAMPLE_BUFFERS: GLenum;
    readonly SAMPLE_COVERAGE: GLenum;
    readonly SAMPLE_COVERAGE_INVERT: GLenum;
    readonly SAMPLE_COVERAGE_VALUE: GLenum;
    readonly SCISSOR_BOX: GLenum;
    readonly SCISSOR_TEST: GLenum;
    readonly SHADER_TYPE: GLenum;
    readonly SHADING_LANGUAGE_VERSION: GLenum;
    readonly SHORT: GLenum;
    readonly SRC_ALPHA: GLenum;
    readonly SRC_ALPHA_SATURATE: GLenum;
    readonly SRC_COLOR: GLenum;
    readonly STATIC_DRAW: GLenum;
    readonly STENCIL_ATTACHMENT: GLenum;
    readonly STENCIL_BACK_FAIL: GLenum;
    readonly STENCIL_BACK_FUNC: GLenum;
    readonly STENCIL_BACK_PASS_DEPTH_FAIL: GLenum;
    readonly STENCIL_BACK_PASS_DEPTH_PASS: GLenum;
    readonly STENCIL_BACK_REF: GLenum;
    readonly STENCIL_BACK_VALUE_MASK: GLenum;
    readonly STENCIL_BACK_WRITEMASK: GLenum;
    readonly STENCIL_BITS: GLenum;
    readonly STENCIL_BUFFER_BIT: GLenum;
    readonly STENCIL_CLEAR_VALUE: GLenum;
    readonly STENCIL_FAIL: GLenum;
    readonly STENCIL_FUNC: GLenum;
    readonly STENCIL_INDEX8: GLenum;
    readonly STENCIL_PASS_DEPTH_FAIL: GLenum;
    readonly STENCIL_PASS_DEPTH_PASS: GLenum;
    readonly STENCIL_REF: GLenum;
    readonly STENCIL_TEST: GLenum;
    readonly STENCIL_VALUE_MASK: GLenum;
    readonly STENCIL_WRITEMASK: GLenum;
    readonly STREAM_DRAW: GLenum;
    readonly SUBPIXEL_BITS: GLenum;
    readonly TEXTURE: GLenum;
    readonly TEXTURE0: GLenum;
    readonly TEXTURE1: GLenum;
    readonly TEXTURE10: GLenum;
    readonly TEXTURE11: GLenum;
    readonly TEXTURE12: GLenum;
    readonly TEXTURE13: GLenum;
    readonly TEXTURE14: GLenum;
    readonly TEXTURE15: GLenum;
    readonly TEXTURE16: GLenum;
    readonly TEXTURE17: GLenum;
    readonly TEXTURE18: GLenum;
    readonly TEXTURE19: GLenum;
    readonly TEXTURE2: GLenum;
    readonly TEXTURE20: GLenum;
    readonly TEXTURE21: GLenum;
    readonly TEXTURE22: GLenum;
    readonly TEXTURE23: GLenum;
    readonly TEXTURE24: GLenum;
    readonly TEXTURE25: GLenum;
    readonly TEXTURE26: GLenum;
    readonly TEXTURE27: GLenum;
    readonly TEXTURE28: GLenum;
    readonly TEXTURE29: GLenum;
    readonly TEXTURE3: GLenum;
    readonly TEXTURE30: GLenum;
    readonly TEXTURE31: GLenum;
    readonly TEXTURE4: GLenum;
    readonly TEXTURE5: GLenum;
    readonly TEXTURE6: GLenum;
    readonly TEXTURE7: GLenum;
    readonly TEXTURE8: GLenum;
    readonly TEXTURE9: GLenum;
    readonly TEXTURE_2D: GLenum;
    readonly TEXTURE_BINDING_2D: GLenum;
    readonly TEXTURE_BINDING_CUBE_MAP: GLenum;
    readonly TEXTURE_CUBE_MAP: GLenum;
    readonly TEXTURE_CUBE_MAP_NEGATIVE_X: GLenum;
    readonly TEXTURE_CUBE_MAP_NEGATIVE_Y: GLenum;
    readonly TEXTURE_CUBE_MAP_NEGATIVE_Z: GLenum;
    readonly TEXTURE_CUBE_MAP_POSITIVE_X: GLenum;
    readonly TEXTURE_CUBE_MAP_POSITIVE_Y: GLenum;
    readonly TEXTURE_CUBE_MAP_POSITIVE_Z: GLenum;
    readonly TEXTURE_MAG_FILTER: GLenum;
    readonly TEXTURE_MIN_FILTER: GLenum;
    readonly TEXTURE_WRAP_S: GLenum;
    readonly TEXTURE_WRAP_T: GLenum;
    readonly TRIANGLES: GLenum;
    readonly TRIANGLE_FAN: GLenum;
    readonly TRIANGLE_STRIP: GLenum;
    readonly UNPACK_ALIGNMENT: GLenum;
    readonly UNPACK_COLORSPACE_CONVERSION_WEBGL: GLenum;
    readonly UNPACK_FLIP_Y_WEBGL: GLenum;
    readonly UNPACK_PREMULTIPLY_ALPHA_WEBGL: GLenum;
    readonly UNSIGNED_BYTE: GLenum;
    readonly UNSIGNED_INT: GLenum;
    readonly UNSIGNED_SHORT: GLenum;
    readonly UNSIGNED_SHORT_4_4_4_4: GLenum;
    readonly UNSIGNED_SHORT_5_5_5_1: GLenum;
    readonly UNSIGNED_SHORT_5_6_5: GLenum;
    readonly VALIDATE_STATUS: GLenum;
    readonly VENDOR: GLenum;
    readonly VERSION: GLenum;
    readonly VERTEX_ATTRIB_ARRAY_BUFFER_BINDING: GLenum;
    readonly VERTEX_ATTRIB_ARRAY_ENABLED: GLenum;
    readonly VERTEX_ATTRIB_ARRAY_NORMALIZED: GLenum;
    readonly VERTEX_ATTRIB_ARRAY_POINTER: GLenum;
    readonly VERTEX_ATTRIB_ARRAY_SIZE: GLenum;
    readonly VERTEX_ATTRIB_ARRAY_STRIDE: GLenum;
    readonly VERTEX_ATTRIB_ARRAY_TYPE: GLenum;
    readonly VERTEX_SHADER: GLenum;
    readonly VIEWPORT: GLenum;
    readonly ZERO: GLenum;
    activeTexture(texture: GLenum): void;
    attachShader(program: WebGLProgram, shader: WebGLShader): void;
    bindAttribLocation(program: WebGLProgram, index: GLuint, name: string): void;
    bindBuffer(target: GLenum, buffer: WebGLBuffer | null): void;
    bindFramebuffer(target: GLenum, framebuffer: WebGLFramebuffer | null): void;
    bindRenderbuffer(target: GLenum, renderbuffer: WebGLRenderbuffer | null): void;
    bindTexture(target: GLenum, texture: WebGLTexture | null): void;
    blendColor(red: GLclampf, green: GLclampf, blue: GLclampf, alpha: GLclampf): void;
    blendEquation(mode: GLenum): void;
    blendEquationSeparate(modeRGB: GLenum, modeAlpha: GLenum): void;
    blendFunc(sfactor: GLenum, dfactor: GLenum): void;
    blendFuncSeparate(srcRGB: GLenum, dstRGB: GLenum, srcAlpha: GLenum, dstAlpha: GLenum): void;
    checkFramebufferStatus(target: GLenum): GLenum;
    clear(mask: GLbitfield): void;
    clearColor(red: GLclampf, green: GLclampf, blue: GLclampf, alpha: GLclampf): void;
    clearDepth(depth: GLclampf): void;
    clearStencil(s: GLint): void;
    colorMask(red: GLboolean, green: GLboolean, blue: GLboolean, alpha: GLboolean): void;
    compileShader(shader: WebGLShader): void;
    copyTexImage2D(target: GLenum, level: GLint, internalformat: GLenum, x: GLint, y: GLint, width: GLsizei, height: GLsizei, border: GLint): void;
    copyTexSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, x: GLint, y: GLint, width: GLsizei, height: GLsizei): void;
    createBuffer(): WebGLBuffer | null;
    createFramebuffer(): WebGLFramebuffer | null;
    createProgram(): WebGLProgram | null;
    createRenderbuffer(): WebGLRenderbuffer | null;
    createShader(type: GLenum): WebGLShader | null;
    createTexture(): WebGLTexture | null;
    cullFace(mode: GLenum): void;
    deleteBuffer(buffer: WebGLBuffer | null): void;
    deleteFramebuffer(framebuffer: WebGLFramebuffer | null): void;
    deleteProgram(program: WebGLProgram | null): void;
    deleteRenderbuffer(renderbuffer: WebGLRenderbuffer | null): void;
    deleteShader(shader: WebGLShader | null): void;
    deleteTexture(texture: WebGLTexture | null): void;
    depthFunc(func: GLenum): void;
    depthMask(flag: GLboolean): void;
    depthRange(zNear: GLclampf, zFar: GLclampf): void;
    detachShader(program: WebGLProgram, shader: WebGLShader): void;
    disable(cap: GLenum): void;
    disableVertexAttribArray(index: GLuint): void;
    drawArrays(mode: GLenum, first: GLint, count: GLsizei): void;
    drawElements(mode: GLenum, count: GLsizei, type: GLenum, offset: GLintptr): void;
    enable(cap: GLenum): void;
    enableVertexAttribArray(index: GLuint): void;
    finish(): void;
    flush(): void;
    framebufferRenderbuffer(target: GLenum, attachment: GLenum, renderbuffertarget: GLenum, renderbuffer: WebGLRenderbuffer | null): void;
    framebufferTexture2D(target: GLenum, attachment: GLenum, textarget: GLenum, texture: WebGLTexture | null, level: GLint): void;
    frontFace(mode: GLenum): void;
    generateMipmap(target: GLenum): void;
    getActiveAttrib(program: WebGLProgram, index: GLuint): WebGLActiveInfo | null;
    getActiveUniform(program: WebGLProgram, index: GLuint): WebGLActiveInfo | null;
    getAttachedShaders(program: WebGLProgram): WebGLShader[] | null;
    getAttribLocation(program: WebGLProgram, name: string): GLint;
    getBufferParameter(target: GLenum, pname: GLenum): any;
    getContextAttributes(): WebGLContextAttributes | null;
    getError(): GLenum;
    getExtension(extensionName: "EXT_blend_minmax"): EXT_blend_minmax | null;
    getExtension(extensionName: "EXT_color_buffer_float"): EXT_color_buffer_float | null;
    getExtension(extensionName: "EXT_color_buffer_half_float"): EXT_color_buffer_half_float | null;
    getExtension(extensionName: "EXT_float_blend"): EXT_float_blend | null;
    getExtension(extensionName: "EXT_texture_filter_anisotropic"): EXT_texture_filter_anisotropic | null;
    getExtension(extensionName: "EXT_frag_depth"): EXT_frag_depth | null;
    getExtension(extensionName: "EXT_shader_texture_lod"): EXT_shader_texture_lod | null;
    getExtension(extensionName: "EXT_sRGB"): EXT_sRGB | null;
    getExtension(extensionName: "KHR_parallel_shader_compile"): KHR_parallel_shader_compile | null;
    getExtension(extensionName: "OES_vertex_array_object"): OES_vertex_array_object | null;
    getExtension(extensionName: "OVR_multiview2"): OVR_multiview2 | null;
    getExtension(extensionName: "WEBGL_color_buffer_float"): WEBGL_color_buffer_float | null;
    getExtension(extensionName: "WEBGL_compressed_texture_astc"): WEBGL_compressed_texture_astc | null;
    getExtension(extensionName: "WEBGL_compressed_texture_etc"): WEBGL_compressed_texture_etc | null;
    getExtension(extensionName: "WEBGL_compressed_texture_etc1"): WEBGL_compressed_texture_etc1 | null;
    getExtension(extensionName: "WEBGL_compressed_texture_pvrtc"): WEBGL_compressed_texture_pvrtc | null;
    getExtension(extensionName: "WEBGL_compressed_texture_s3tc_srgb"): WEBGL_compressed_texture_s3tc_srgb | null;
    getExtension(extensionName: "WEBGL_debug_shaders"): WEBGL_debug_shaders | null;
    getExtension(extensionName: "WEBGL_draw_buffers"): WEBGL_draw_buffers | null;
    getExtension(extensionName: "WEBGL_lose_context"): WEBGL_lose_context | null;
    getExtension(extensionName: "WEBGL_depth_texture"): WEBGL_depth_texture | null;
    getExtension(extensionName: "WEBGL_debug_renderer_info"): WEBGL_debug_renderer_info | null;
    getExtension(extensionName: "WEBGL_compressed_texture_s3tc"): WEBGL_compressed_texture_s3tc | null;
    getExtension(extensionName: "OES_texture_half_float_linear"): OES_texture_half_float_linear | null;
    getExtension(extensionName: "OES_texture_half_float"): OES_texture_half_float | null;
    getExtension(extensionName: "OES_texture_float_linear"): OES_texture_float_linear | null;
    getExtension(extensionName: "OES_texture_float"): OES_texture_float | null;
    getExtension(extensionName: "OES_standard_derivatives"): OES_standard_derivatives | null;
    getExtension(extensionName: "OES_element_index_uint"): OES_element_index_uint | null;
    getExtension(extensionName: "ANGLE_instanced_arrays"): ANGLE_instanced_arrays | null;
    getExtension(name: string): any;
    getFramebufferAttachmentParameter(target: GLenum, attachment: GLenum, pname: GLenum): any;
    getParameter(pname: GLenum): any;
    getProgramInfoLog(program: WebGLProgram): string | null;
    getProgramParameter(program: WebGLProgram, pname: GLenum): any;
    getRenderbufferParameter(target: GLenum, pname: GLenum): any;
    getShaderInfoLog(shader: WebGLShader): string | null;
    getShaderParameter(shader: WebGLShader, pname: GLenum): any;
    getShaderPrecisionFormat(shadertype: GLenum, precisiontype: GLenum): WebGLShaderPrecisionFormat | null;
    getShaderSource(shader: WebGLShader): string | null;
    getSupportedExtensions(): string[] | null;
    getTexParameter(target: GLenum, pname: GLenum): any;
    getUniform(program: WebGLProgram, location: WebGLUniformLocation): any;
    getUniformLocation(program: WebGLProgram, name: string): WebGLUniformLocation | null;
    getVertexAttrib(index: GLuint, pname: GLenum): any;
    getVertexAttribOffset(index: GLuint, pname: GLenum): GLintptr;
    hint(target: GLenum, mode: GLenum): void;
    isBuffer(buffer: WebGLBuffer | null): GLboolean;
    isContextLost(): boolean;
    isEnabled(cap: GLenum): GLboolean;
    isFramebuffer(framebuffer: WebGLFramebuffer | null): GLboolean;
    isProgram(program: WebGLProgram | null): GLboolean;
    isRenderbuffer(renderbuffer: WebGLRenderbuffer | null): GLboolean;
    isShader(shader: WebGLShader | null): GLboolean;
    isTexture(texture: WebGLTexture | null): GLboolean;
    lineWidth(width: GLfloat): void;
    linkProgram(program: WebGLProgram): void;
    pixelStorei(pname: GLenum, param: GLint | GLboolean): void;
    polygonOffset(factor: GLfloat, units: GLfloat): void;
    renderbufferStorage(target: GLenum, internalformat: GLenum, width: GLsizei, height: GLsizei): void;
    sampleCoverage(value: GLclampf, invert: GLboolean): void;
    scissor(x: GLint, y: GLint, width: GLsizei, height: GLsizei): void;
    shaderSource(shader: WebGLShader, source: string): void;
    stencilFunc(func: GLenum, ref: GLint, mask: GLuint): void;
    stencilFuncSeparate(face: GLenum, func: GLenum, ref: GLint, mask: GLuint): void;
    stencilMask(mask: GLuint): void;
    stencilMaskSeparate(face: GLenum, mask: GLuint): void;
    stencilOp(fail: GLenum, zfail: GLenum, zpass: GLenum): void;
    stencilOpSeparate(face: GLenum, fail: GLenum, zfail: GLenum, zpass: GLenum): void;
    texParameterf(target: GLenum, pname: GLenum, param: GLfloat): void;
    texParameteri(target: GLenum, pname: GLenum, param: GLint): void;
    uniform1f(location: WebGLUniformLocation | null, x: GLfloat): void;
    uniform1i(location: WebGLUniformLocation | null, x: GLint): void;
    uniform2f(location: WebGLUniformLocation | null, x: GLfloat, y: GLfloat): void;
    uniform2i(location: WebGLUniformLocation | null, x: GLint, y: GLint): void;
    uniform3f(location: WebGLUniformLocation | null, x: GLfloat, y: GLfloat, z: GLfloat): void;
    uniform3i(location: WebGLUniformLocation | null, x: GLint, y: GLint, z: GLint): void;
    uniform4f(location: WebGLUniformLocation | null, x: GLfloat, y: GLfloat, z: GLfloat, w: GLfloat): void;
    uniform4i(location: WebGLUniformLocation | null, x: GLint, y: GLint, z: GLint, w: GLint): void;
    useProgram(program: WebGLProgram | null): void;
    validateProgram(program: WebGLProgram): void;
    vertexAttrib1f(index: GLuint, x: GLfloat): void;
    vertexAttrib1fv(index: GLuint, values: Float32List): void;
    vertexAttrib2f(index: GLuint, x: GLfloat, y: GLfloat): void;
    vertexAttrib2fv(index: GLuint, values: Float32List): void;
    vertexAttrib3f(index: GLuint, x: GLfloat, y: GLfloat, z: GLfloat): void;
    vertexAttrib3fv(index: GLuint, values: Float32List): void;
    vertexAttrib4f(index: GLuint, x: GLfloat, y: GLfloat, z: GLfloat, w: GLfloat): void;
    vertexAttrib4fv(index: GLuint, values: Float32List): void;
    vertexAttribPointer(index: GLuint, size: GLint, type: GLenum, normalized: GLboolean, stride: GLsizei, offset: GLintptr): void;
    viewport(x: GLint, y: GLint, width: GLsizei, height: GLsizei): void;
}

export interface WebGLRenderingContextOverloads {
    bufferData(target: GLenum, size: GLsizeiptr, usage: GLenum): void;
    bufferData(target: GLenum, data: BufferSource | null, usage: GLenum): void;
    bufferSubData(target: GLenum, offset: GLintptr, data: BufferSource): void;
    compressedTexImage2D(target: GLenum, level: GLint, internalformat: GLenum, width: GLsizei, height: GLsizei, border: GLint, data: ArrayBufferView): void;
    compressedTexSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GLenum, data: ArrayBufferView): void;
    readPixels(x: GLint, y: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, pixels: ArrayBufferView | null): void;
    texImage2D(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, border: GLint, format: GLenum, type: GLenum, pixels: ArrayBufferView | null): void;
    texImage2D(target: GLenum, level: GLint, internalformat: GLint, format: GLenum, type: GLenum, source: TexImageSource): void;
    texSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, pixels: ArrayBufferView | null): void;
    texSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, format: GLenum, type: GLenum, source: TexImageSource): void;
    uniform1fv(location: WebGLUniformLocation | null, v: Float32List): void;
    uniform1iv(location: WebGLUniformLocation | null, v: Int32List): void;
    uniform2fv(location: WebGLUniformLocation | null, v: Float32List): void;
    uniform2iv(location: WebGLUniformLocation | null, v: Int32List): void;
    uniform3fv(location: WebGLUniformLocation | null, v: Float32List): void;
    uniform3iv(location: WebGLUniformLocation | null, v: Int32List): void;
    uniform4fv(location: WebGLUniformLocation | null, v: Float32List): void;
    uniform4iv(location: WebGLUniformLocation | null, v: Int32List): void;
    uniformMatrix2fv(location: WebGLUniformLocation | null, transpose: GLboolean, value: Float32List): void;
    uniformMatrix3fv(location: WebGLUniformLocation | null, transpose: GLboolean, value: Float32List): void;
    uniformMatrix4fv(location: WebGLUniformLocation | null, transpose: GLboolean, value: Float32List): void;
}

export interface WebGL2RenderingContextBase {
    readonly ACTIVE_UNIFORM_BLOCKS: GLenum;
    readonly ALREADY_SIGNALED: GLenum;
    readonly ANY_SAMPLES_PASSED: GLenum;
    readonly ANY_SAMPLES_PASSED_CONSERVATIVE: GLenum;
    readonly COLOR: GLenum;
    readonly COLOR_ATTACHMENT1: GLenum;
    readonly COLOR_ATTACHMENT10: GLenum;
    readonly COLOR_ATTACHMENT11: GLenum;
    readonly COLOR_ATTACHMENT12: GLenum;
    readonly COLOR_ATTACHMENT13: GLenum;
    readonly COLOR_ATTACHMENT14: GLenum;
    readonly COLOR_ATTACHMENT15: GLenum;
    readonly COLOR_ATTACHMENT2: GLenum;
    readonly COLOR_ATTACHMENT3: GLenum;
    readonly COLOR_ATTACHMENT4: GLenum;
    readonly COLOR_ATTACHMENT5: GLenum;
    readonly COLOR_ATTACHMENT6: GLenum;
    readonly COLOR_ATTACHMENT7: GLenum;
    readonly COLOR_ATTACHMENT8: GLenum;
    readonly COLOR_ATTACHMENT9: GLenum;
    readonly COMPARE_REF_TO_TEXTURE: GLenum;
    readonly CONDITION_SATISFIED: GLenum;
    readonly COPY_READ_BUFFER: GLenum;
    readonly COPY_READ_BUFFER_BINDING: GLenum;
    readonly COPY_WRITE_BUFFER: GLenum;
    readonly COPY_WRITE_BUFFER_BINDING: GLenum;
    readonly CURRENT_QUERY: GLenum;
    readonly DEPTH: GLenum;
    readonly DEPTH24_STENCIL8: GLenum;
    readonly DEPTH32F_STENCIL8: GLenum;
    readonly DEPTH_COMPONENT24: GLenum;
    readonly DEPTH_COMPONENT32F: GLenum;
    readonly DRAW_BUFFER0: GLenum;
    readonly DRAW_BUFFER1: GLenum;
    readonly DRAW_BUFFER10: GLenum;
    readonly DRAW_BUFFER11: GLenum;
    readonly DRAW_BUFFER12: GLenum;
    readonly DRAW_BUFFER13: GLenum;
    readonly DRAW_BUFFER14: GLenum;
    readonly DRAW_BUFFER15: GLenum;
    readonly DRAW_BUFFER2: GLenum;
    readonly DRAW_BUFFER3: GLenum;
    readonly DRAW_BUFFER4: GLenum;
    readonly DRAW_BUFFER5: GLenum;
    readonly DRAW_BUFFER6: GLenum;
    readonly DRAW_BUFFER7: GLenum;
    readonly DRAW_BUFFER8: GLenum;
    readonly DRAW_BUFFER9: GLenum;
    readonly DRAW_FRAMEBUFFER: GLenum;
    readonly DRAW_FRAMEBUFFER_BINDING: GLenum;
    readonly DYNAMIC_COPY: GLenum;
    readonly DYNAMIC_READ: GLenum;
    readonly FLOAT_32_UNSIGNED_INT_24_8_REV: GLenum;
    readonly FLOAT_MAT2x3: GLenum;
    readonly FLOAT_MAT2x4: GLenum;
    readonly FLOAT_MAT3x2: GLenum;
    readonly FLOAT_MAT3x4: GLenum;
    readonly FLOAT_MAT4x2: GLenum;
    readonly FLOAT_MAT4x3: GLenum;
    readonly FRAGMENT_SHADER_DERIVATIVE_HINT: GLenum;
    readonly FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE: GLenum;
    readonly FRAMEBUFFER_ATTACHMENT_BLUE_SIZE: GLenum;
    readonly FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING: GLenum;
    readonly FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE: GLenum;
    readonly FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE: GLenum;
    readonly FRAMEBUFFER_ATTACHMENT_GREEN_SIZE: GLenum;
    readonly FRAMEBUFFER_ATTACHMENT_RED_SIZE: GLenum;
    readonly FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE: GLenum;
    readonly FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER: GLenum;
    readonly FRAMEBUFFER_DEFAULT: GLenum;
    readonly FRAMEBUFFER_INCOMPLETE_MULTISAMPLE: GLenum;
    readonly HALF_FLOAT: GLenum;
    readonly INTERLEAVED_ATTRIBS: GLenum;
    readonly INT_2_10_10_10_REV: GLenum;
    readonly INT_SAMPLER_2D: GLenum;
    readonly INT_SAMPLER_2D_ARRAY: GLenum;
    readonly INT_SAMPLER_3D: GLenum;
    readonly INT_SAMPLER_CUBE: GLenum;
    readonly INVALID_INDEX: GLenum;
    readonly MAX: GLenum;
    readonly MAX_3D_TEXTURE_SIZE: GLenum;
    readonly MAX_ARRAY_TEXTURE_LAYERS: GLenum;
    readonly MAX_CLIENT_WAIT_TIMEOUT_WEBGL: GLenum;
    readonly MAX_COLOR_ATTACHMENTS: GLenum;
    readonly MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS: GLenum;
    readonly MAX_COMBINED_UNIFORM_BLOCKS: GLenum;
    readonly MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS: GLenum;
    readonly MAX_DRAW_BUFFERS: GLenum;
    readonly MAX_ELEMENTS_INDICES: GLenum;
    readonly MAX_ELEMENTS_VERTICES: GLenum;
    readonly MAX_ELEMENT_INDEX: GLenum;
    readonly MAX_FRAGMENT_INPUT_COMPONENTS: GLenum;
    readonly MAX_FRAGMENT_UNIFORM_BLOCKS: GLenum;
    readonly MAX_FRAGMENT_UNIFORM_COMPONENTS: GLenum;
    readonly MAX_PROGRAM_TEXEL_OFFSET: GLenum;
    readonly MAX_SAMPLES: GLenum;
    readonly MAX_SERVER_WAIT_TIMEOUT: GLenum;
    readonly MAX_TEXTURE_LOD_BIAS: GLenum;
    readonly MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS: GLenum;
    readonly MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS: GLenum;
    readonly MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS: GLenum;
    readonly MAX_UNIFORM_BLOCK_SIZE: GLenum;
    readonly MAX_UNIFORM_BUFFER_BINDINGS: GLenum;
    readonly MAX_VARYING_COMPONENTS: GLenum;
    readonly MAX_VERTEX_OUTPUT_COMPONENTS: GLenum;
    readonly MAX_VERTEX_UNIFORM_BLOCKS: GLenum;
    readonly MAX_VERTEX_UNIFORM_COMPONENTS: GLenum;
    readonly MIN: GLenum;
    readonly MIN_PROGRAM_TEXEL_OFFSET: GLenum;
    readonly OBJECT_TYPE: GLenum;
    readonly PACK_ROW_LENGTH: GLenum;
    readonly PACK_SKIP_PIXELS: GLenum;
    readonly PACK_SKIP_ROWS: GLenum;
    readonly PIXEL_PACK_BUFFER: GLenum;
    readonly PIXEL_PACK_BUFFER_BINDING: GLenum;
    readonly PIXEL_UNPACK_BUFFER: GLenum;
    readonly PIXEL_UNPACK_BUFFER_BINDING: GLenum;
    readonly QUERY_RESULT: GLenum;
    readonly QUERY_RESULT_AVAILABLE: GLenum;
    readonly R11F_G11F_B10F: GLenum;
    readonly R16F: GLenum;
    readonly R16I: GLenum;
    readonly R16UI: GLenum;
    readonly R32F: GLenum;
    readonly R32I: GLenum;
    readonly R32UI: GLenum;
    readonly R8: GLenum;
    readonly R8I: GLenum;
    readonly R8UI: GLenum;
    readonly R8_SNORM: GLenum;
    readonly RASTERIZER_DISCARD: GLenum;
    readonly READ_BUFFER: GLenum;
    readonly READ_FRAMEBUFFER: GLenum;
    readonly READ_FRAMEBUFFER_BINDING: GLenum;
    readonly RED: GLenum;
    readonly RED_INTEGER: GLenum;
    readonly RENDERBUFFER_SAMPLES: GLenum;
    readonly RG: GLenum;
    readonly RG16F: GLenum;
    readonly RG16I: GLenum;
    readonly RG16UI: GLenum;
    readonly RG32F: GLenum;
    readonly RG32I: GLenum;
    readonly RG32UI: GLenum;
    readonly RG8: GLenum;
    readonly RG8I: GLenum;
    readonly RG8UI: GLenum;
    readonly RG8_SNORM: GLenum;
    readonly RGB10_A2: GLenum;
    readonly RGB10_A2UI: GLenum;
    readonly RGB16F: GLenum;
    readonly RGB16I: GLenum;
    readonly RGB16UI: GLenum;
    readonly RGB32F: GLenum;
    readonly RGB32I: GLenum;
    readonly RGB32UI: GLenum;
    readonly RGB8: GLenum;
    readonly RGB8I: GLenum;
    readonly RGB8UI: GLenum;
    readonly RGB8_SNORM: GLenum;
    readonly RGB9_E5: GLenum;
    readonly RGBA16F: GLenum;
    readonly RGBA16I: GLenum;
    readonly RGBA16UI: GLenum;
    readonly RGBA32F: GLenum;
    readonly RGBA32I: GLenum;
    readonly RGBA32UI: GLenum;
    readonly RGBA8: GLenum;
    readonly RGBA8I: GLenum;
    readonly RGBA8UI: GLenum;
    readonly RGBA8_SNORM: GLenum;
    readonly RGBA_INTEGER: GLenum;
    readonly RGB_INTEGER: GLenum;
    readonly RG_INTEGER: GLenum;
    readonly SAMPLER_2D_ARRAY: GLenum;
    readonly SAMPLER_2D_ARRAY_SHADOW: GLenum;
    readonly SAMPLER_2D_SHADOW: GLenum;
    readonly SAMPLER_3D: GLenum;
    readonly SAMPLER_BINDING: GLenum;
    readonly SAMPLER_CUBE_SHADOW: GLenum;
    readonly SEPARATE_ATTRIBS: GLenum;
    readonly SIGNALED: GLenum;
    readonly SIGNED_NORMALIZED: GLenum;
    readonly SRGB: GLenum;
    readonly SRGB8: GLenum;
    readonly SRGB8_ALPHA8: GLenum;
    readonly STATIC_COPY: GLenum;
    readonly STATIC_READ: GLenum;
    readonly STENCIL: GLenum;
    readonly STREAM_COPY: GLenum;
    readonly STREAM_READ: GLenum;
    readonly SYNC_CONDITION: GLenum;
    readonly SYNC_FENCE: GLenum;
    readonly SYNC_FLAGS: GLenum;
    readonly SYNC_FLUSH_COMMANDS_BIT: GLenum;
    readonly SYNC_GPU_COMMANDS_COMPLETE: GLenum;
    readonly SYNC_STATUS: GLenum;
    readonly TEXTURE_2D_ARRAY: GLenum;
    readonly TEXTURE_3D: GLenum;
    readonly TEXTURE_BASE_LEVEL: GLenum;
    readonly TEXTURE_BINDING_2D_ARRAY: GLenum;
    readonly TEXTURE_BINDING_3D: GLenum;
    readonly TEXTURE_COMPARE_FUNC: GLenum;
    readonly TEXTURE_COMPARE_MODE: GLenum;
    readonly TEXTURE_IMMUTABLE_FORMAT: GLenum;
    readonly TEXTURE_IMMUTABLE_LEVELS: GLenum;
    readonly TEXTURE_MAX_LEVEL: GLenum;
    readonly TEXTURE_MAX_LOD: GLenum;
    readonly TEXTURE_MIN_LOD: GLenum;
    readonly TEXTURE_WRAP_R: GLenum;
    readonly TIMEOUT_EXPIRED: GLenum;
    readonly TIMEOUT_IGNORED: GLint64;
    readonly TRANSFORM_FEEDBACK: GLenum;
    readonly TRANSFORM_FEEDBACK_ACTIVE: GLenum;
    readonly TRANSFORM_FEEDBACK_BINDING: GLenum;
    readonly TRANSFORM_FEEDBACK_BUFFER: GLenum;
    readonly TRANSFORM_FEEDBACK_BUFFER_BINDING: GLenum;
    readonly TRANSFORM_FEEDBACK_BUFFER_MODE: GLenum;
    readonly TRANSFORM_FEEDBACK_BUFFER_SIZE: GLenum;
    readonly TRANSFORM_FEEDBACK_BUFFER_START: GLenum;
    readonly TRANSFORM_FEEDBACK_PAUSED: GLenum;
    readonly TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN: GLenum;
    readonly TRANSFORM_FEEDBACK_VARYINGS: GLenum;
    readonly UNIFORM_ARRAY_STRIDE: GLenum;
    readonly UNIFORM_BLOCK_ACTIVE_UNIFORMS: GLenum;
    readonly UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES: GLenum;
    readonly UNIFORM_BLOCK_BINDING: GLenum;
    readonly UNIFORM_BLOCK_DATA_SIZE: GLenum;
    readonly UNIFORM_BLOCK_INDEX: GLenum;
    readonly UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER: GLenum;
    readonly UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER: GLenum;
    readonly UNIFORM_BUFFER: GLenum;
    readonly UNIFORM_BUFFER_BINDING: GLenum;
    readonly UNIFORM_BUFFER_OFFSET_ALIGNMENT: GLenum;
    readonly UNIFORM_BUFFER_SIZE: GLenum;
    readonly UNIFORM_BUFFER_START: GLenum;
    readonly UNIFORM_IS_ROW_MAJOR: GLenum;
    readonly UNIFORM_MATRIX_STRIDE: GLenum;
    readonly UNIFORM_OFFSET: GLenum;
    readonly UNIFORM_SIZE: GLenum;
    readonly UNIFORM_TYPE: GLenum;
    readonly UNPACK_IMAGE_HEIGHT: GLenum;
    readonly UNPACK_ROW_LENGTH: GLenum;
    readonly UNPACK_SKIP_IMAGES: GLenum;
    readonly UNPACK_SKIP_PIXELS: GLenum;
    readonly UNPACK_SKIP_ROWS: GLenum;
    readonly UNSIGNALED: GLenum;
    readonly UNSIGNED_INT_10F_11F_11F_REV: GLenum;
    readonly UNSIGNED_INT_24_8: GLenum;
    readonly UNSIGNED_INT_2_10_10_10_REV: GLenum;
    readonly UNSIGNED_INT_5_9_9_9_REV: GLenum;
    readonly UNSIGNED_INT_SAMPLER_2D: GLenum;
    readonly UNSIGNED_INT_SAMPLER_2D_ARRAY: GLenum;
    readonly UNSIGNED_INT_SAMPLER_3D: GLenum;
    readonly UNSIGNED_INT_SAMPLER_CUBE: GLenum;
    readonly UNSIGNED_INT_VEC2: GLenum;
    readonly UNSIGNED_INT_VEC3: GLenum;
    readonly UNSIGNED_INT_VEC4: GLenum;
    readonly UNSIGNED_NORMALIZED: GLenum;
    readonly VERTEX_ARRAY_BINDING: GLenum;
    readonly VERTEX_ATTRIB_ARRAY_DIVISOR: GLenum;
    readonly VERTEX_ATTRIB_ARRAY_INTEGER: GLenum;
    readonly WAIT_FAILED: GLenum;
    beginQuery(target: GLenum, query: WebGLQuery): void;
    beginTransformFeedback(primitiveMode: GLenum): void;
    bindBufferBase(target: GLenum, index: GLuint, buffer: WebGLBuffer | null): void;
    bindBufferRange(target: GLenum, index: GLuint, buffer: WebGLBuffer | null, offset: GLintptr, size: GLsizeiptr): void;
    bindSampler(unit: GLuint, sampler: WebGLSampler | null): void;
    bindTransformFeedback(target: GLenum, tf: WebGLTransformFeedback | null): void;
    bindVertexArray(array: WebGLVertexArrayObject | null): void;
    blitFramebuffer(srcX0: GLint, srcY0: GLint, srcX1: GLint, srcY1: GLint, dstX0: GLint, dstY0: GLint, dstX1: GLint, dstY1: GLint, mask: GLbitfield, filter: GLenum): void;
    clearBufferfi(buffer: GLenum, drawbuffer: GLint, depth: GLfloat, stencil: GLint): void;
    clearBufferfv(buffer: GLenum, drawbuffer: GLint, values: Float32List, srcOffset?: GLuint): void;
    clearBufferiv(buffer: GLenum, drawbuffer: GLint, values: Int32List, srcOffset?: GLuint): void;
    clearBufferuiv(buffer: GLenum, drawbuffer: GLint, values: Uint32List, srcOffset?: GLuint): void;
    clientWaitSync(sync: WebGLSync, flags: GLbitfield, timeout: GLuint64): GLenum;
    compressedTexImage3D(target: GLenum, level: GLint, internalformat: GLenum, width: GLsizei, height: GLsizei, depth: GLsizei, border: GLint, imageSize: GLsizei, offset: GLintptr): void;
    compressedTexImage3D(target: GLenum, level: GLint, internalformat: GLenum, width: GLsizei, height: GLsizei, depth: GLsizei, border: GLint, srcData: ArrayBufferView, srcOffset?: GLuint, srcLengthOverride?: GLuint): void;
    compressedTexSubImage3D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GLenum, imageSize: GLsizei, offset: GLintptr): void;
    compressedTexSubImage3D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GLenum, srcData: ArrayBufferView, srcOffset?: GLuint, srcLengthOverride?: GLuint): void;
    copyBufferSubData(readTarget: GLenum, writeTarget: GLenum, readOffset: GLintptr, writeOffset: GLintptr, size: GLsizeiptr): void;
    copyTexSubImage3D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, x: GLint, y: GLint, width: GLsizei, height: GLsizei): void;
    createQuery(): WebGLQuery | null;
    createSampler(): WebGLSampler | null;
    createTransformFeedback(): WebGLTransformFeedback | null;
    createVertexArray(): WebGLVertexArrayObject | null;
    deleteQuery(query: WebGLQuery | null): void;
    deleteSampler(sampler: WebGLSampler | null): void;
    deleteSync(sync: WebGLSync | null): void;
    deleteTransformFeedback(tf: WebGLTransformFeedback | null): void;
    deleteVertexArray(vertexArray: WebGLVertexArrayObject | null): void;
    drawArraysInstanced(mode: GLenum, first: GLint, count: GLsizei, instanceCount: GLsizei): void;
    drawBuffers(buffers: GLenum[]): void;
    drawElementsInstanced(mode: GLenum, count: GLsizei, type: GLenum, offset: GLintptr, instanceCount: GLsizei): void;
    drawRangeElements(mode: GLenum, start: GLuint, end: GLuint, count: GLsizei, type: GLenum, offset: GLintptr): void;
    endQuery(target: GLenum): void;
    endTransformFeedback(): void;
    fenceSync(condition: GLenum, flags: GLbitfield): WebGLSync | null;
    framebufferTextureLayer(target: GLenum, attachment: GLenum, texture: WebGLTexture | null, level: GLint, layer: GLint): void;
    getActiveUniformBlockName(program: WebGLProgram, uniformBlockIndex: GLuint): string | null;
    getActiveUniformBlockParameter(program: WebGLProgram, uniformBlockIndex: GLuint, pname: GLenum): any;
    getActiveUniforms(program: WebGLProgram, uniformIndices: GLuint[], pname: GLenum): any;
    getBufferSubData(target: GLenum, srcByteOffset: GLintptr, dstBuffer: ArrayBufferView, dstOffset?: GLuint, length?: GLuint): void;
    getFragDataLocation(program: WebGLProgram, name: string): GLint;
    getIndexedParameter(target: GLenum, index: GLuint): any;
    getInternalformatParameter(target: GLenum, internalformat: GLenum, pname: GLenum): any;
    getQuery(target: GLenum, pname: GLenum): WebGLQuery | null;
    getQueryParameter(query: WebGLQuery, pname: GLenum): any;
    getSamplerParameter(sampler: WebGLSampler, pname: GLenum): any;
    getSyncParameter(sync: WebGLSync, pname: GLenum): any;
    getTransformFeedbackVarying(program: WebGLProgram, index: GLuint): WebGLActiveInfo | null;
    getUniformBlockIndex(program: WebGLProgram, uniformBlockName: string): GLuint;
    getUniformIndices(program: WebGLProgram, uniformNames: string[]): GLuint[] | null;
    invalidateFramebuffer(target: GLenum, attachments: GLenum[]): void;
    invalidateSubFramebuffer(target: GLenum, attachments: GLenum[], x: GLint, y: GLint, width: GLsizei, height: GLsizei): void;
    isQuery(query: WebGLQuery | null): GLboolean;
    isSampler(sampler: WebGLSampler | null): GLboolean;
    isSync(sync: WebGLSync | null): GLboolean;
    isTransformFeedback(tf: WebGLTransformFeedback | null): GLboolean;
    isVertexArray(vertexArray: WebGLVertexArrayObject | null): GLboolean;
    pauseTransformFeedback(): void;
    readBuffer(src: GLenum): void;
    renderbufferStorageMultisample(target: GLenum, samples: GLsizei, internalformat: GLenum, width: GLsizei, height: GLsizei): void;
    resumeTransformFeedback(): void;
    samplerParameterf(sampler: WebGLSampler, pname: GLenum, param: GLfloat): void;
    samplerParameteri(sampler: WebGLSampler, pname: GLenum, param: GLint): void;
    texImage3D(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, border: GLint, format: GLenum, type: GLenum, pboOffset: GLintptr): void;
    texImage3D(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, border: GLint, format: GLenum, type: GLenum, source: TexImageSource): void;
    texImage3D(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, border: GLint, format: GLenum, type: GLenum, srcData: ArrayBufferView | null): void;
    texImage3D(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, border: GLint, format: GLenum, type: GLenum, srcData: ArrayBufferView, srcOffset: GLuint): void;
    texStorage2D(target: GLenum, levels: GLsizei, internalformat: GLenum, width: GLsizei, height: GLsizei): void;
    texStorage3D(target: GLenum, levels: GLsizei, internalformat: GLenum, width: GLsizei, height: GLsizei, depth: GLsizei): void;
    texSubImage3D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GLenum, type: GLenum, pboOffset: GLintptr): void;
    texSubImage3D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GLenum, type: GLenum, source: TexImageSource): void;
    texSubImage3D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GLenum, type: GLenum, srcData: ArrayBufferView | null, srcOffset?: GLuint): void;
    transformFeedbackVaryings(program: WebGLProgram, varyings: string[], bufferMode: GLenum): void;
    uniform1ui(location: WebGLUniformLocation | null, v0: GLuint): void;
    uniform1uiv(location: WebGLUniformLocation | null, data: Uint32List, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniform2ui(location: WebGLUniformLocation | null, v0: GLuint, v1: GLuint): void;
    uniform2uiv(location: WebGLUniformLocation | null, data: Uint32List, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniform3ui(location: WebGLUniformLocation | null, v0: GLuint, v1: GLuint, v2: GLuint): void;
    uniform3uiv(location: WebGLUniformLocation | null, data: Uint32List, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniform4ui(location: WebGLUniformLocation | null, v0: GLuint, v1: GLuint, v2: GLuint, v3: GLuint): void;
    uniform4uiv(location: WebGLUniformLocation | null, data: Uint32List, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniformBlockBinding(program: WebGLProgram, uniformBlockIndex: GLuint, uniformBlockBinding: GLuint): void;
    uniformMatrix2x3fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniformMatrix2x4fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniformMatrix3x2fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniformMatrix3x4fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniformMatrix4x2fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniformMatrix4x3fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void;
    vertexAttribDivisor(index: GLuint, divisor: GLuint): void;
    vertexAttribI4i(index: GLuint, x: GLint, y: GLint, z: GLint, w: GLint): void;
    vertexAttribI4iv(index: GLuint, values: Int32List): void;
    vertexAttribI4ui(index: GLuint, x: GLuint, y: GLuint, z: GLuint, w: GLuint): void;
    vertexAttribI4uiv(index: GLuint, values: Uint32List): void;
    vertexAttribIPointer(index: GLuint, size: GLint, type: GLenum, stride: GLsizei, offset: GLintptr): void;
    waitSync(sync: WebGLSync, flags: GLbitfield, timeout: GLint64): void;
}

export interface WebGL2RenderingContextOverloads {
    bufferData(target: GLenum, size: GLsizeiptr, usage: GLenum): void;
    bufferData(target: GLenum, srcData: BufferSource | null, usage: GLenum): void;
    bufferData(target: GLenum, srcData: ArrayBufferView, usage: GLenum, srcOffset: GLuint, length?: GLuint): void;
    bufferSubData(target: GLenum, dstByteOffset: GLintptr, srcData: BufferSource): void;
    bufferSubData(target: GLenum, dstByteOffset: GLintptr, srcData: ArrayBufferView, srcOffset: GLuint, length?: GLuint): void;
    compressedTexImage2D(target: GLenum, level: GLint, internalformat: GLenum, width: GLsizei, height: GLsizei, border: GLint, imageSize: GLsizei, offset: GLintptr): void;
    compressedTexImage2D(target: GLenum, level: GLint, internalformat: GLenum, width: GLsizei, height: GLsizei, border: GLint, srcData: ArrayBufferView, srcOffset?: GLuint, srcLengthOverride?: GLuint): void;
    compressedTexSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GLenum, imageSize: GLsizei, offset: GLintptr): void;
    compressedTexSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GLenum, srcData: ArrayBufferView, srcOffset?: GLuint, srcLengthOverride?: GLuint): void;
    readPixels(x: GLint, y: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, dstData: ArrayBufferView | null): void;
    readPixels(x: GLint, y: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, offset: GLintptr): void;
    readPixels(x: GLint, y: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, dstData: ArrayBufferView, dstOffset: GLuint): void;
    texImage2D(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, border: GLint, format: GLenum, type: GLenum, pixels: ArrayBufferView | null): void;
    texImage2D(target: GLenum, level: GLint, internalformat: GLint, format: GLenum, type: GLenum, source: TexImageSource): void;
    texImage2D(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, border: GLint, format: GLenum, type: GLenum, pboOffset: GLintptr): void;
    texImage2D(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, border: GLint, format: GLenum, type: GLenum, source: TexImageSource): void;
    texImage2D(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, border: GLint, format: GLenum, type: GLenum, srcData: ArrayBufferView, srcOffset: GLuint): void;
    texSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, pixels: ArrayBufferView | null): void;
    texSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, format: GLenum, type: GLenum, source: TexImageSource): void;
    texSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, pboOffset: GLintptr): void;
    texSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, source: TexImageSource): void;
    texSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, srcData: ArrayBufferView, srcOffset: GLuint): void;
    uniform1fv(location: WebGLUniformLocation | null, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniform1iv(location: WebGLUniformLocation | null, data: Int32List, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniform2fv(location: WebGLUniformLocation | null, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniform2iv(location: WebGLUniformLocation | null, data: Int32List, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniform3fv(location: WebGLUniformLocation | null, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniform3iv(location: WebGLUniformLocation | null, data: Int32List, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniform4fv(location: WebGLUniformLocation | null, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniform4iv(location: WebGLUniformLocation | null, data: Int32List, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniformMatrix2fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniformMatrix3fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniformMatrix4fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void;
}

export interface FileSystem {
    readonly name: string;
    readonly root: FileSystemDirectoryEntry;
}

export interface FileSystemEntryCallback {
    (entry: FileSystemEntry): void;
}

export interface ErrorCallback {
    (err: DOMException): void;
}

export interface TextTrackCueList {
    [index: number]: TextTrackCue;
    /** Returns the number of cues in the list. */
    readonly length: number;
    /**
     * Returns the first text track cue (in text track cue order) with text track cue identifier id.
     *
     * Returns null if none of the cues have the given identifier or if the argument is the empty string.
     */
    getCueById(id: string): TextTrackCue | null;
}

/** TextTrackCues represent a string of text that will be displayed for some duration of time on a TextTrack. This includes the start and end times that the cue will be displayed. A TextTrackCue cannot be used directly, instead one of the derived types (e.g. VTTCue) must be used. */
export interface TextTrackCue extends EventTarget {
    /**
     * Returns the text track cue end time, in seconds.
     *
     * Can be set.
     */
    endTime: number;
    /**
     * Returns the text track cue identifier.
     *
     * Can be set.
     */
    id: string;
    onenter: ((this: TextTrackCue, ev: Event) => any) | null;
    onexit: ((this: TextTrackCue, ev: Event) => any) | null;
    /**
     * Returns true if the text track cue pause-on-exit flag is set, false otherwise.
     *
     * Can be set.
     */
    pauseOnExit: boolean;
    /**
     * Returns the text track cue start time, in seconds.
     *
     * Can be set.
     */
    startTime: number;
    /** Returns the TextTrack object to which this text track cue belongs, if any, or null otherwise. */
    readonly track: TextTrack | null;
    addEventListener<K extends keyof TextTrackCueEventMap>(type: K, listener: (this: TextTrackCue, ev: TextTrackCueEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof TextTrackCueEventMap>(type: K, listener: (this: TextTrackCue, ev: TextTrackCueEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

export interface TextTrackEventMap {
    "cuechange": Event;
}

export interface PictureInPictureWindowEventMap {
    "resize": Event;
}

export interface SVGTests {
    readonly requiredExtensions: SVGStringList;
    readonly systemLanguage: SVGStringList;
}

export interface SVGBoundingBoxOptions {
    clipped?: boolean;
    fill?: boolean;
    markers?: boolean;
    stroke?: boolean;
}

export interface DOMPointInit {
    w?: number;
    x?: number;
    y?: number;
    z?: number;
}

/** The SVGTransformList defines a list of SVGTransform objects. */
export interface SVGTransformList {
    [index: number]: SVGTransform;
    readonly length: number;
    readonly numberOfItems: number;
    appendItem(newItem: SVGTransform): SVGTransform;
    clear(): void;
    consolidate(): SVGTransform | null;
    createSVGTransformFromMatrix(matrix?: DOMMatrix2DInit): SVGTransform;
    getItem(index: number): SVGTransform;
    initialize(newItem: SVGTransform): SVGTransform;
    insertItemBefore(newItem: SVGTransform, index: number): SVGTransform;
    removeItem(index: number): SVGTransform;
    replaceItem(newItem: SVGTransform, index: number): SVGTransform;
}

/** The SVGNumberList defines a list of SVGNumber objects. */
export interface SVGNumberList {
    [index: number]: SVGNumber;
    readonly length: number;
    readonly numberOfItems: number;
    appendItem(newItem: SVGNumber): SVGNumber;
    clear(): void;
    getItem(index: number): SVGNumber;
    initialize(newItem: SVGNumber): SVGNumber;
    insertItemBefore(newItem: SVGNumber, index: number): SVGNumber;
    removeItem(index: number): SVGNumber;
    replaceItem(newItem: SVGNumber, index: number): SVGNumber;
}

/** Corresponds to the preserveAspectRatio attribute, which is available for some of SVG's elements. */
export interface SVGPreserveAspectRatio {
    align: number;
    meetOrSlice: number;
    readonly SVG_MEETORSLICE_MEET: number;
    readonly SVG_MEETORSLICE_SLICE: number;
    readonly SVG_MEETORSLICE_UNKNOWN: number;
    readonly SVG_PRESERVEASPECTRATIO_NONE: number;
    readonly SVG_PRESERVEASPECTRATIO_UNKNOWN: number;
    readonly SVG_PRESERVEASPECTRATIO_XMAXYMAX: number;
    readonly SVG_PRESERVEASPECTRATIO_XMAXYMID: number;
    readonly SVG_PRESERVEASPECTRATIO_XMAXYMIN: number;
    readonly SVG_PRESERVEASPECTRATIO_XMIDYMAX: number;
    readonly SVG_PRESERVEASPECTRATIO_XMIDYMID: number;
    readonly SVG_PRESERVEASPECTRATIO_XMIDYMIN: number;
    readonly SVG_PRESERVEASPECTRATIO_XMINYMAX: number;
    readonly SVG_PRESERVEASPECTRATIO_XMINYMID: number;
    readonly SVG_PRESERVEASPECTRATIO_XMINYMIN: number;
}

/** Used for attributes of basic SVGRect which can be animated. */
export interface SVGAnimatedRect {
    readonly animVal: DOMRectReadOnly;
    readonly baseVal: DOMRect;
}

export interface SVGPointList {
    [index: number]: DOMPoint;
    readonly length: number;
    readonly numberOfItems: number;
    appendItem(newItem: DOMPoint): DOMPoint;
    clear(): void;
    getItem(index: number): DOMPoint;
    initialize(newItem: DOMPoint): DOMPoint;
    insertItemBefore(newItem: DOMPoint, index: number): DOMPoint;
    removeItem(index: number): DOMPoint;
    replaceItem(newItem: DOMPoint, index: number): DOMPoint;
}

export interface DOMMatrixInit extends DOMMatrix2DInit {
    is2D?: boolean;
    m13?: number;
    m14?: number;
    m23?: number;
    m24?: number;
    m31?: number;
    m32?: number;
    m33?: number;
    m34?: number;
    m43?: number;
    m44?: number;
}

export interface DOMMatrixReadOnly {
    readonly a: number;
    readonly b: number;
    readonly c: number;
    readonly d: number;
    readonly e: number;
    readonly f: number;
    readonly is2D: boolean;
    readonly isIdentity: boolean;
    readonly m11: number;
    readonly m12: number;
    readonly m13: number;
    readonly m14: number;
    readonly m21: number;
    readonly m22: number;
    readonly m23: number;
    readonly m24: number;
    readonly m31: number;
    readonly m32: number;
    readonly m33: number;
    readonly m34: number;
    readonly m41: number;
    readonly m42: number;
    readonly m43: number;
    readonly m44: number;
    flipX(): DOMMatrix;
    flipY(): DOMMatrix;
    inverse(): DOMMatrix;
    multiply(other?: DOMMatrixInit): DOMMatrix;
    rotate(rotX?: number, rotY?: number, rotZ?: number): DOMMatrix;
    rotateAxisAngle(x?: number, y?: number, z?: number, angle?: number): DOMMatrix;
    rotateFromVector(x?: number, y?: number): DOMMatrix;
    scale(scaleX?: number, scaleY?: number, scaleZ?: number, originX?: number, originY?: number, originZ?: number): DOMMatrix;
    scale3d(scale?: number, originX?: number, originY?: number, originZ?: number): DOMMatrix;
    /** @deprecated */
    scaleNonUniform(scaleX?: number, scaleY?: number): DOMMatrix;
    skewX(sx?: number): DOMMatrix;
    skewY(sy?: number): DOMMatrix;
    toFloat32Array(): Float32Array;
    toFloat64Array(): Float64Array;
    toJSON(): any;
    transformPoint(point?: DOMPointInit): DOMPoint;
    translate(tx?: number, ty?: number, tz?: number): DOMMatrix;
    toString(): string;
}

/** Used for attributes of type SVGLengthList which can be animated. */
export interface SVGAnimatedLengthList {
    readonly animVal: SVGLengthList;
    readonly baseVal: SVGLengthList;
}

export interface MediaList {
    [index: number]: string;
    readonly length: number;
    mediaText: string;
    toString(): string;
    appendMedium(medium: string): void;
    deleteMedium(medium: string): void;
    item(index: number): string | null;
}

/** A processing instruction embeds application-specific instructions in XML which can be ignored by other applications that don't recognize them. */
export interface ProcessingInstruction extends CharacterData, LinkStyle {
    readonly ownerDocument: Document;
    readonly target: string;
}

export interface PublicKeyCredentialEntity {
    name: string;
}

export interface DoubleRange {
    max?: number;
    min?: number;
}

export interface ULongRange {
    max?: number;
    min?: number;
}

/** Available only in secure contexts. */
export interface PushSubscriptionOptions {
    readonly applicationServerKey: ArrayBuffer | null;
}

export interface PushSubscriptionJSON {
    endpoint?: string;
    expirationTime?: DOMTimeStamp | null;
    keys?: Record<string, string>;
}

export interface ReadableStreamDefaultReadValueResult<T> {
    done: false;
    value: T;
}

export interface ReadableStreamDefaultReadDoneResult {
    done: true;
    value?: undefined;
}

export interface FunctionStringCallback {
    (data: string): void;
}

/** A key range can be a single value or a range with upper and lower bounds or endpoints. If the key range has both upper and lower bounds, then it is bounded; if it has no bounds, it is unbounded. A bounded key range can either be open (the endpoints are excluded) or closed (the endpoints are included). To retrieve all keys within a certain range, you can use the following code constructs: */
export interface IDBKeyRange {
    /** Returns lower bound, or undefined if none. */
    readonly lower: any;
    /** Returns true if the lower open flag is set, and false otherwise. */
    readonly lowerOpen: boolean;
    /** Returns upper bound, or undefined if none. */
    readonly upper: any;
    /** Returns true if the upper open flag is set, and false otherwise. */
    readonly upperOpen: boolean;
    /** Returns true if key is included in the range, and false otherwise. */
    includes(key: any): boolean;
}

export interface IDBIndexParameters {
    multiEntry?: boolean;
    unique?: boolean;
}

/** This IndexedDB API interface represents a cursor for traversing or iterating over multiple records in a database. It is the same as the IDBCursor, except that it includes the value property. */
export interface IDBCursorWithValue extends IDBCursor {
    /** Returns the cursor's current value. */
    readonly value: any;
}

export interface IDBTransactionEventMap {
    "abort": Event;
    "complete": Event;
    "error": Event;
}

export interface RemotePlaybackAvailabilityCallback {
    (available: boolean): void;
}

export interface RemotePlaybackEventMap {
    "connect": Event;
    "connecting": Event;
    "disconnect": Event;
}

/** This Media Source Extensions API interface represents a source of media data for an HTMLMediaElement object. A MediaSource object can be attached to a HTMLMediaElement to be played in the user agent. */
export interface MediaSource extends EventTarget {
    readonly activeSourceBuffers: SourceBufferList;
    duration: number;
    onsourceclose: ((this: MediaSource, ev: Event) => any) | null;
    onsourceended: ((this: MediaSource, ev: Event) => any) | null;
    onsourceopen: ((this: MediaSource, ev: Event) => any) | null;
    readonly readyState: ReadyState;
    readonly sourceBuffers: SourceBufferList;
    addSourceBuffer(type: string): SourceBuffer;
    clearLiveSeekableRange(): void;
    endOfStream(error?: EndOfStreamError): void;
    removeSourceBuffer(sourceBuffer: SourceBuffer): void;
    setLiveSeekableRange(start: number, end: number): void;
    addEventListener<K extends keyof MediaSourceEventMap>(type: K, listener: (this: MediaSource, ev: MediaSourceEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof MediaSourceEventMap>(type: K, listener: (this: MediaSource, ev: MediaSourceEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** The TrackEvent interface, part of the HTML DOM specification, is used for events which represent changes to the set of available tracks on an HTML media element; these events are addtrack and removetrack. */
export interface TrackEvent extends Event {
    /** Returns the track object (TextTrack, AudioTrack, or VideoTrack) to which the event relates. */
    readonly track: TextTrack | null;
}

export interface TextTrackListEventMap {
    "addtrack": TrackEvent;
    "change": Event;
    "removetrack": TrackEvent;
}

/** This Canvas 2D API interface is used to declare a path that can then be used on a CanvasRenderingContext2D object. The path methods of the CanvasRenderingContext2D interface are also present on this interface, which gives you the convenience of being able to retain and replay your path whenever desired. */
export interface Path2D extends CanvasPath {
    /** Adds to the path the path given by the argument. */
    addPath(path: Path2D, transform?: DOMMatrix2DInit): void;
}

/** An opaque object describing a gradient. It is returned by the methods CanvasRenderingContext2D.createLinearGradient() or CanvasRenderingContext2D.createRadialGradient(). */
export interface CanvasGradient {
    /**
     * Adds a color stop with the given color to the gradient at the given offset. 0.0 is the offset at one end of the gradient, 1.0 is the offset at the other end.
     *
     * Throws an "IndexSizeError" DOMException if the offset is out of range. Throws a "SyntaxError" DOMException if the color cannot be parsed.
     */
    addColorStop(offset: number, color: string): void;
}

/** An opaque object describing a pattern, based on an image, a canvas, or a video, created by the CanvasRenderingContext2D.createPattern() method. */
export interface CanvasPattern {
    /** Sets the transformation matrix that will be used when rendering the pattern during a fill or stroke painting operation. */
    setTransform(transform?: DOMMatrix2DInit): void;
}

export interface ImageDataSettings {
    colorSpace?: PredefinedColorSpace;
}

/** The dimensions of a piece of text in the canvas, as created by the CanvasRenderingContext2D.measureText() method. */
export interface TextMetrics {
    /** Returns the measurement described below. */
    readonly actualBoundingBoxAscent: number;
    /** Returns the measurement described below. */
    readonly actualBoundingBoxDescent: number;
    /** Returns the measurement described below. */
    readonly actualBoundingBoxLeft: number;
    /** Returns the measurement described below. */
    readonly actualBoundingBoxRight: number;
    /** Returns the measurement described below. */
    readonly fontBoundingBoxAscent: number;
    /** Returns the measurement described below. */
    readonly fontBoundingBoxDescent: number;
    /** Returns the measurement described below. */
    readonly width: number;
}

/** The WebGLProgram is part of the WebGL API and is a combination of two compiled WebGLShaders consisting of a vertex shader and a fragment shader (both written in GLSL). */
export interface WebGLProgram {
}

/** The WebGLShader is part of the WebGL API and can either be a vertex or a fragment shader. A WebGLProgram requires both types of shaders. */
export interface WebGLShader {
}

/** Part of the WebGL API and represents an opaque buffer object storing data such as vertices or colors. */
export interface WebGLBuffer {
}

/** Part of the WebGL API and represents a collection of buffers that serve as a rendering destination. */
export interface WebGLFramebuffer {
}

/** Part of the WebGL API and represents a buffer that can contain an image, or can be source or target of an rendering operation. */
export interface WebGLRenderbuffer {
}

/** Part of the WebGL API and represents an opaque texture object providing storage and state for texturing operations. */
export interface WebGLTexture {
}

/** Part of the WebGL API and represents the information returned by calling the WebGLRenderingContext.getActiveAttrib() and WebGLRenderingContext.getActiveUniform() methods. */
export interface WebGLActiveInfo {
    readonly name: string;
    readonly size: GLint;
    readonly type: GLenum;
}

export interface EXT_blend_minmax {
    readonly MAX_EXT: GLenum;
    readonly MIN_EXT: GLenum;
}

export interface EXT_color_buffer_float {
}

export interface EXT_color_buffer_half_float {
    readonly FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE_EXT: GLenum;
    readonly RGB16F_EXT: GLenum;
    readonly RGBA16F_EXT: GLenum;
    readonly UNSIGNED_NORMALIZED_EXT: GLenum;
}

export interface EXT_float_blend {
}

/** The EXT_texture_filter_anisotropic extension is part of the WebGL API and exposes two constants for anisotropic filtering (AF). */
export interface EXT_texture_filter_anisotropic {
    readonly MAX_TEXTURE_MAX_ANISOTROPY_EXT: GLenum;
    readonly TEXTURE_MAX_ANISOTROPY_EXT: GLenum;
}

/** The EXT_frag_depth extension is part of the WebGL API and enables to set a depth value of a fragment from within the fragment shader. */
export interface EXT_frag_depth {
}

export interface EXT_shader_texture_lod {
}

export interface EXT_sRGB {
    readonly FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING_EXT: GLenum;
    readonly SRGB8_ALPHA8_EXT: GLenum;
    readonly SRGB_ALPHA_EXT: GLenum;
    readonly SRGB_EXT: GLenum;
}

export interface KHR_parallel_shader_compile {
    readonly COMPLETION_STATUS_KHR: GLenum;
}

export interface OES_vertex_array_object {
    readonly VERTEX_ARRAY_BINDING_OES: GLenum;
    bindVertexArrayOES(arrayObject: WebGLVertexArrayObjectOES | null): void;
    createVertexArrayOES(): WebGLVertexArrayObjectOES | null;
    deleteVertexArrayOES(arrayObject: WebGLVertexArrayObjectOES | null): void;
    isVertexArrayOES(arrayObject: WebGLVertexArrayObjectOES | null): GLboolean;
}

export interface OVR_multiview2 {
    readonly FRAMEBUFFER_ATTACHMENT_TEXTURE_BASE_VIEW_INDEX_OVR: GLenum;
    readonly FRAMEBUFFER_ATTACHMENT_TEXTURE_NUM_VIEWS_OVR: GLenum;
    readonly FRAMEBUFFER_INCOMPLETE_VIEW_TARGETS_OVR: GLenum;
    readonly MAX_VIEWS_OVR: GLenum;
    framebufferTextureMultiviewOVR(target: GLenum, attachment: GLenum, texture: WebGLTexture | null, level: GLint, baseViewIndex: GLint, numViews: GLsizei): void;
}

export interface WEBGL_color_buffer_float {
    readonly FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE_EXT: GLenum;
    readonly RGBA32F_EXT: GLenum;
    readonly UNSIGNED_NORMALIZED_EXT: GLenum;
}

export interface WEBGL_compressed_texture_astc {
    readonly COMPRESSED_RGBA_ASTC_10x10_KHR: GLenum;
    readonly COMPRESSED_RGBA_ASTC_10x5_KHR: GLenum;
    readonly COMPRESSED_RGBA_ASTC_10x6_KHR: GLenum;
    readonly COMPRESSED_RGBA_ASTC_10x8_KHR: GLenum;
    readonly COMPRESSED_RGBA_ASTC_12x10_KHR: GLenum;
    readonly COMPRESSED_RGBA_ASTC_12x12_KHR: GLenum;
    readonly COMPRESSED_RGBA_ASTC_4x4_KHR: GLenum;
    readonly COMPRESSED_RGBA_ASTC_5x4_KHR: GLenum;
    readonly COMPRESSED_RGBA_ASTC_5x5_KHR: GLenum;
    readonly COMPRESSED_RGBA_ASTC_6x5_KHR: GLenum;
    readonly COMPRESSED_RGBA_ASTC_6x6_KHR: GLenum;
    readonly COMPRESSED_RGBA_ASTC_8x5_KHR: GLenum;
    readonly COMPRESSED_RGBA_ASTC_8x6_KHR: GLenum;
    readonly COMPRESSED_RGBA_ASTC_8x8_KHR: GLenum;
    readonly COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR: GLenum;
    readonly COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR: GLenum;
    readonly COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR: GLenum;
    readonly COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR: GLenum;
    readonly COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR: GLenum;
    readonly COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR: GLenum;
    readonly COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR: GLenum;
    readonly COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR: GLenum;
    readonly COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR: GLenum;
    readonly COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR: GLenum;
    readonly COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR: GLenum;
    readonly COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR: GLenum;
    readonly COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR: GLenum;
    readonly COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR: GLenum;
    getSupportedProfiles(): string[];
}

export interface WEBGL_compressed_texture_etc {
    readonly COMPRESSED_R11_EAC: GLenum;
    readonly COMPRESSED_RG11_EAC: GLenum;
    readonly COMPRESSED_RGB8_ETC2: GLenum;
    readonly COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2: GLenum;
    readonly COMPRESSED_RGBA8_ETC2_EAC: GLenum;
    readonly COMPRESSED_SIGNED_R11_EAC: GLenum;
    readonly COMPRESSED_SIGNED_RG11_EAC: GLenum;
    readonly COMPRESSED_SRGB8_ALPHA8_ETC2_EAC: GLenum;
    readonly COMPRESSED_SRGB8_ETC2: GLenum;
    readonly COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2: GLenum;
}

export interface WEBGL_compressed_texture_etc1 {
    readonly COMPRESSED_RGB_ETC1_WEBGL: GLenum;
}

export interface WEBGL_compressed_texture_pvrtc {
    readonly COMPRESSED_RGBA_PVRTC_2BPPV1_IMG: GLenum;
    readonly COMPRESSED_RGBA_PVRTC_4BPPV1_IMG: GLenum;
    readonly COMPRESSED_RGB_PVRTC_2BPPV1_IMG: GLenum;
    readonly COMPRESSED_RGB_PVRTC_4BPPV1_IMG: GLenum;
}

export interface WEBGL_compressed_texture_s3tc_srgb {
    readonly COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT: GLenum;
    readonly COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT: GLenum;
    readonly COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT: GLenum;
    readonly COMPRESSED_SRGB_S3TC_DXT1_EXT: GLenum;
}

export interface WEBGL_debug_shaders {
    getTranslatedShaderSource(shader: WebGLShader): string;
}

export interface WEBGL_draw_buffers {
    readonly COLOR_ATTACHMENT0_WEBGL: GLenum;
    readonly COLOR_ATTACHMENT10_WEBGL: GLenum;
    readonly COLOR_ATTACHMENT11_WEBGL: GLenum;
    readonly COLOR_ATTACHMENT12_WEBGL: GLenum;
    readonly COLOR_ATTACHMENT13_WEBGL: GLenum;
    readonly COLOR_ATTACHMENT14_WEBGL: GLenum;
    readonly COLOR_ATTACHMENT15_WEBGL: GLenum;
    readonly COLOR_ATTACHMENT1_WEBGL: GLenum;
    readonly COLOR_ATTACHMENT2_WEBGL: GLenum;
    readonly COLOR_ATTACHMENT3_WEBGL: GLenum;
    readonly COLOR_ATTACHMENT4_WEBGL: GLenum;
    readonly COLOR_ATTACHMENT5_WEBGL: GLenum;
    readonly COLOR_ATTACHMENT6_WEBGL: GLenum;
    readonly COLOR_ATTACHMENT7_WEBGL: GLenum;
    readonly COLOR_ATTACHMENT8_WEBGL: GLenum;
    readonly COLOR_ATTACHMENT9_WEBGL: GLenum;
    readonly DRAW_BUFFER0_WEBGL: GLenum;
    readonly DRAW_BUFFER10_WEBGL: GLenum;
    readonly DRAW_BUFFER11_WEBGL: GLenum;
    readonly DRAW_BUFFER12_WEBGL: GLenum;
    readonly DRAW_BUFFER13_WEBGL: GLenum;
    readonly DRAW_BUFFER14_WEBGL: GLenum;
    readonly DRAW_BUFFER15_WEBGL: GLenum;
    readonly DRAW_BUFFER1_WEBGL: GLenum;
    readonly DRAW_BUFFER2_WEBGL: GLenum;
    readonly DRAW_BUFFER3_WEBGL: GLenum;
    readonly DRAW_BUFFER4_WEBGL: GLenum;
    readonly DRAW_BUFFER5_WEBGL: GLenum;
    readonly DRAW_BUFFER6_WEBGL: GLenum;
    readonly DRAW_BUFFER7_WEBGL: GLenum;
    readonly DRAW_BUFFER8_WEBGL: GLenum;
    readonly DRAW_BUFFER9_WEBGL: GLenum;
    readonly MAX_COLOR_ATTACHMENTS_WEBGL: GLenum;
    readonly MAX_DRAW_BUFFERS_WEBGL: GLenum;
    drawBuffersWEBGL(buffers: GLenum[]): void;
}

export interface WEBGL_lose_context {
    loseContext(): void;
    restoreContext(): void;
}

/** The WEBGL_depth_texture extension is part of the WebGL API and defines 2D depth and depth-stencil textures. */
export interface WEBGL_depth_texture {
    readonly UNSIGNED_INT_24_8_WEBGL: GLenum;
}

/** The WEBGL_debug_renderer_info extension is part of the WebGL API and exposes two constants with information about the graphics driver for debugging purposes. */
export interface WEBGL_debug_renderer_info {
    readonly UNMASKED_RENDERER_WEBGL: GLenum;
    readonly UNMASKED_VENDOR_WEBGL: GLenum;
}

/** The WEBGL_compressed_texture_s3tc extension is part of the WebGL API and exposes four S3TC compressed texture formats. */
export interface WEBGL_compressed_texture_s3tc {
    readonly COMPRESSED_RGBA_S3TC_DXT1_EXT: GLenum;
    readonly COMPRESSED_RGBA_S3TC_DXT3_EXT: GLenum;
    readonly COMPRESSED_RGBA_S3TC_DXT5_EXT: GLenum;
    readonly COMPRESSED_RGB_S3TC_DXT1_EXT: GLenum;
}

/** The OES_texture_half_float_linear extension is part of the WebGL API and allows linear filtering with half floating-point pixel types for textures. */
export interface OES_texture_half_float_linear {
}

/** The OES_texture_half_float extension is part of the WebGL API and adds texture formats with 16- (aka half float) and 32-bit floating-point components. */
export interface OES_texture_half_float {
    readonly HALF_FLOAT_OES: GLenum;
}

/** The OES_texture_float_linear extension is part of the WebGL API and allows linear filtering with floating-point pixel types for textures. */
export interface OES_texture_float_linear {
}

/** The OES_texture_float extension is part of the WebGL API and exposes floating-point pixel types for textures. */
export interface OES_texture_float {
}

/** The OES_standard_derivatives extension is part of the WebGL API and adds the GLSL derivative functions dFdx, dFdy, and fwidth. */
export interface OES_standard_derivatives {
    readonly FRAGMENT_SHADER_DERIVATIVE_HINT_OES: GLenum;
}

/** The OES_element_index_uint extension is part of the WebGL API and adds support for gl.UNSIGNED_INT types to WebGLRenderingContext.drawElements(). */
export interface OES_element_index_uint {
}

/** The ANGLE_instanced_arrays extension is part of the WebGL API and allows to draw the same object, or groups of similar objects multiple times, if they share the same vertex data, primitive count and type. */
export interface ANGLE_instanced_arrays {
    readonly VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE: GLenum;
    drawArraysInstancedANGLE(mode: GLenum, first: GLint, count: GLsizei, primcount: GLsizei): void;
    drawElementsInstancedANGLE(mode: GLenum, count: GLsizei, type: GLenum, offset: GLintptr, primcount: GLsizei): void;
    vertexAttribDivisorANGLE(index: GLuint, divisor: GLuint): void;
}

/** Part of the WebGL API and represents the information returned by calling the WebGLRenderingContext.getShaderPrecisionFormat() method. */
export interface WebGLShaderPrecisionFormat {
    readonly precision: GLint;
    readonly rangeMax: GLint;
    readonly rangeMin: GLint;
}

/** Part of the WebGL API and represents the location of a uniform variable in a shader program. */
export interface WebGLUniformLocation {
}

export interface WebGLQuery {
}

export interface WebGLSampler {
}

export interface WebGLTransformFeedback {
}

export interface WebGLVertexArrayObject {
}

export interface WebGLSync {
}

export interface FileSystemDirectoryEntry extends FileSystemEntry {
    createReader(): FileSystemDirectoryReader;
    getDirectory(path?: string | null, options?: FileSystemFlags, successCallback?: FileSystemEntryCallback, errorCallback?: ErrorCallback): void;
    getFile(path?: string | null, options?: FileSystemFlags, successCallback?: FileSystemEntryCallback, errorCallback?: ErrorCallback): void;
}

export interface TextTrackCueEventMap {
    "enter": Event;
    "exit": Event;
}

/** The SVGStringList defines a list of DOMString objects. */
export interface SVGStringList {
    [index: number]: string;
    readonly length: number;
    readonly numberOfItems: number;
    appendItem(newItem: string): string;
    clear(): void;
    getItem(index: number): string;
    initialize(newItem: string): string;
    insertItemBefore(newItem: string, index: number): string;
    removeItem(index: number): string;
    replaceItem(newItem: string, index: number): string;
}

/** The SVGLengthList defines a list of SVGLength objects. */
export interface SVGLengthList {
    [index: number]: SVGLength;
    readonly length: number;
    readonly numberOfItems: number;
    appendItem(newItem: SVGLength): SVGLength;
    clear(): void;
    getItem(index: number): SVGLength;
    initialize(newItem: SVGLength): SVGLength;
    insertItemBefore(newItem: SVGLength, index: number): SVGLength;
    removeItem(index: number): SVGLength;
    replaceItem(newItem: SVGLength, index: number): SVGLength;
}

export interface ConstrainDoubleRange extends DoubleRange {
    exact?: number;
    ideal?: number;
}

export interface ConstrainBooleanParameters {
    exact?: boolean;
    ideal?: boolean;
}

export interface ConstrainULongRange extends ULongRange {
    exact?: number;
    ideal?: number;
}

export interface ConstrainDOMStringParameters {
    exact?: string | string[];
    ideal?: string | string[];
}

/** A simple container list for multiple SourceBuffer objects. */
export interface SourceBufferList extends EventTarget {
    [index: number]: SourceBuffer;
    readonly length: number;
    onaddsourcebuffer: ((this: SourceBufferList, ev: Event) => any) | null;
    onremovesourcebuffer: ((this: SourceBufferList, ev: Event) => any) | null;
    addEventListener<K extends keyof SourceBufferListEventMap>(type: K, listener: (this: SourceBufferList, ev: SourceBufferListEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SourceBufferListEventMap>(type: K, listener: (this: SourceBufferList, ev: SourceBufferListEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/** A chunk of media to be passed into an HTMLMediaElement and played, via a MediaSource object. This can be made up of one or several media segments. */
export interface SourceBuffer extends EventTarget {
    appendWindowEnd: number;
    appendWindowStart: number;
    readonly buffered: TimeRanges;
    mode: AppendMode;
    onabort: ((this: SourceBuffer, ev: Event) => any) | null;
    onerror: ((this: SourceBuffer, ev: Event) => any) | null;
    onupdate: ((this: SourceBuffer, ev: Event) => any) | null;
    onupdateend: ((this: SourceBuffer, ev: Event) => any) | null;
    onupdatestart: ((this: SourceBuffer, ev: Event) => any) | null;
    timestampOffset: number;
    readonly updating: boolean;
    abort(): void;
    appendBuffer(data: BufferSource): void;
    changeType(type: string): void;
    remove(start: number, end: number): void;
    addEventListener<K extends keyof SourceBufferEventMap>(type: K, listener: (this: SourceBuffer, ev: SourceBufferEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SourceBufferEventMap>(type: K, listener: (this: SourceBuffer, ev: SourceBufferEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

export interface MediaSourceEventMap {
    "sourceclose": Event;
    "sourceended": Event;
    "sourceopen": Event;
}

export interface WebGLVertexArrayObjectOES {
}

export interface FileSystemDirectoryReader {
    readEntries(successCallback: FileSystemEntriesCallback, errorCallback?: ErrorCallback): void;
}

export interface FileSystemFlags {
    create?: boolean;
    exclusive?: boolean;
}

export interface SourceBufferListEventMap {
    "addsourcebuffer": Event;
    "removesourcebuffer": Event;
}

export interface SourceBufferEventMap {
    "abort": Event;
    "error": Event;
    "update": Event;
    "updateend": Event;
    "updatestart": Event;
}

export interface FileSystemEntriesCallback {
    (entries: FileSystemEntry[]): void;
}

export type WindowProxy = Window;
export type HTMLOrSVGScriptElement = HTMLScriptElement | SVGScriptElement;
export type BodyInit = ReadableStream | XMLHttpRequestBodyInit;
export type VibratePattern = number | number[];
export type EventListenerOrEventListenerObject = EventListener | EventListenerObject;
export type OnErrorEventHandler = OnErrorEventHandlerNonNull | null;
export type ImageBitmapSource = CanvasImageSource | Blob | ImageData;
export type RequestInfo = Request | string;
export type TimerHandler = string | Function;
export type DOMHighResTimeStamp = number;
export type InsertPosition = "beforebegin" | "afterbegin" | "beforeend" | "afterend";
export type ScrollRestoration = "auto" | "manual";
export type XPathNSResolver = ((prefix: string | null) => string | null) | { lookupNamespaceURI(prefix: string | null): string | null; };
export type ClipboardItems = ClipboardItem[];
export type MediaSessionPlaybackState = "none" | "paused" | "playing";
export type MediaSessionAction = "hangup" | "nexttrack" | "pause" | "play" | "previoustrack" | "seekbackward" | "seekforward" | "seekto" | "skipad" | "stop" | "togglecamera" | "togglemicrophone";
export type GamepadMappingType = "" | "standard" | "xr-standard";
export type MediaKeysRequirement = "not-allowed" | "optional" | "required";
export type XMLHttpRequestBodyInit = Blob | BufferSource | FormData | URLSearchParams | string;
export type MessageEventSource = WindowProxy | MessagePort | ServiceWorker;
export type PerformanceEntryList = PerformanceEntry[];
export type CanvasImageSource = HTMLOrSVGImageElement | HTMLVideoElement | HTMLCanvasElement | ImageBitmap;
export type ColorSpaceConversion = "default" | "none";
export type ImageOrientation = "flipY" | "none";
export type PremultiplyAlpha = "default" | "none" | "premultiply";
export type ResizeQuality = "high" | "low" | "medium" | "pixelated";
export type RequestCache = "default" | "force-cache" | "no-cache" | "no-store" | "only-if-cached" | "reload";
export type RequestCredentials = "include" | "omit" | "same-origin";
export type HeadersInit = string[][] | Record<string, string> | Headers;
export type RequestMode = "cors" | "navigate" | "no-cors" | "same-origin";
export type RequestRedirect = "error" | "follow" | "manual";
export type ReferrerPolicy = "" | "no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin" | "unsafe-url";
export type ResponseType = "basic" | "cors" | "default" | "error" | "opaque" | "opaqueredirect";
export type ShadowRootMode = "closed" | "open";
export type SlotAssignmentMode = "manual" | "named";
export type FullscreenNavigationUI = "auto" | "hide" | "show";
export type ScrollLogicalPosition = "center" | "end" | "nearest" | "start";
export type CSSNumberish = number;
export type AnimationPlayState = "finished" | "idle" | "paused" | "running";
export type AnimationReplaceState = "active" | "persisted" | "removed";
export type FontFaceSetLoadStatus = "loaded" | "loading";
export type ConnectionType = "bluetooth" | "cellular" | "ethernet" | "mixed" | "none" | "other" | "unknown" | "wifi";
export type CredentialMediationRequirement = "optional" | "required" | "silent";
export type MediaDecodingType = "file" | "media-source" | "webrtc";
export type MediaEncodingType = "record" | "webrtc";
export type MediaDeviceKind = "audioinput" | "audiooutput" | "videoinput";
export type PermissionName = "geolocation" | "notifications" | "persistent-storage" | "push" | "screen-wake-lock" | "xr-spatial-tracking";
export type PermissionState = "denied" | "granted" | "prompt";
export type ServiceWorkerState = "activated" | "activating" | "installed" | "installing" | "parsed" | "redundant";
export type Transferable = ArrayBuffer | MessagePort | ImageBitmap;
export type ServiceWorkerUpdateViaCache = "all" | "imports" | "none";
export type WorkerType = "classic" | "module";
export type GamepadHapticActuatorType = "vibration";
export type MediaKeySessionType = "persistent-license" | "temporary";
export type BufferSource = ArrayBufferView | ArrayBuffer;
export type FormDataEntryValue = File | string;
export type SecurityPolicyViolationEventDisposition = "enforce" | "report";
export type AlgorithmIdentifier = Algorithm | string;
export type KeyUsage = "decrypt" | "deriveBits" | "deriveKey" | "encrypt" | "sign" | "unwrapKey" | "verify" | "wrapKey";
export type KeyFormat = "jwk" | "pkcs8" | "raw" | "spki";
export type HTMLOrSVGImageElement = HTMLImageElement | SVGImageElement;
export type RequestDestination = "" | "audio" | "audioworklet" | "document" | "embed" | "font" | "frame" | "iframe" | "image" | "manifest" | "object" | "paintworklet" | "report" | "script" | "sharedworker" | "style" | "track" | "video" | "worker" | "xslt";
export type CompositeOperationOrAuto = "accumulate" | "add" | "auto" | "replace";
export type RenderingContext = CanvasRenderingContext2D | ImageBitmapRenderingContext | WebGLRenderingContext | WebGL2RenderingContext;
export type SelectionMode = "end" | "preserve" | "select" | "start";
export type ScrollBehavior = "auto" | "smooth";
export type FontFaceLoadStatus = "error" | "loaded" | "loading" | "unloaded";
export type AttestationConveyancePreference = "direct" | "enterprise" | "indirect" | "none";
export type UserVerificationRequirement = "discouraged" | "preferred" | "required";
export type DOMTimeStamp = number;
export type MediaStreamTrackState = "ended" | "live";
export type PushPermissionState = "denied" | "granted" | "prompt";
export type NotificationDirection = "auto" | "ltr" | "rtl";
export type MediaKeySessionClosedReason = "closed-by-application" | "hardware-context-reset" | "internal-error" | "release-acknowledged" | "resource-evicted";
export type ReadableStreamDefaultReadResult<T> = ReadableStreamDefaultReadValueResult<T> | ReadableStreamDefaultReadDoneResult;
export type KeyType = "private" | "public" | "secret";
export type HashAlgorithmIdentifier = AlgorithmIdentifier;
export type NamedCurve = string;
export type IDBRequestReadyState = "done" | "pending";
export type IDBTransactionMode = "readonly" | "readwrite" | "versionchange";
export type CompositeOperation = "accumulate" | "add" | "replace";
export type IterationCompositeOperation = "accumulate" | "replace";
export type MediaProvider = MediaStream | MediaSource | Blob;
export type TextTrackKind = "captions" | "chapters" | "descriptions" | "metadata" | "subtitles";
export type CanPlayTypeResult = "" | "maybe" | "probably";
export type PredefinedColorSpace = "display-p3" | "srgb";
export type WebGLPowerPreference = "default" | "high-performance" | "low-power";
export type TextTrackMode = "disabled" | "hidden" | "showing";
export type PlaybackDirection = "alternate" | "alternate-reverse" | "normal" | "reverse";
export type FillMode = "auto" | "backwards" | "both" | "forwards" | "none";
export type AuthenticatorAttachment = "cross-platform" | "platform";
export type ResidentKeyRequirement = "discouraged" | "preferred" | "required";
export type AuthenticatorTransport = "ble" | "internal" | "nfc" | "usb";
export type PublicKeyCredentialType = "public-key";
export type COSEAlgorithmIdentifier = number;
export type ColorGamut = "p3" | "rec2020" | "srgb";
export type HdrMetadataType = "smpteSt2086" | "smpteSt2094-10" | "smpteSt2094-40";
export type TransferFunction = "hlg" | "pq" | "srgb";
export type ConstrainDouble = number | ConstrainDoubleRange;
export type ConstrainBoolean = boolean | ConstrainBooleanParameters;
export type ConstrainULong = number | ConstrainULongRange;
export type ConstrainDOMString = string | string[] | ConstrainDOMStringParameters;
export type PushEncryptionKeyName = "auth" | "p256dh";
export type MediaKeyStatus = "expired" | "internal-error" | "output-downscaled" | "output-restricted" | "released" | "status-pending" | "usable" | "usable-in-future";
export type MediaKeyMessageType = "individualization-request" | "license-release" | "license-renewal" | "license-request";
export type BigInteger = Uint8Array;
export type IDBValidKey = number | string | Date | BufferSource | IDBValidKey[];
export type IDBCursorDirection = "next" | "nextunique" | "prev" | "prevunique";
export type RemotePlaybackState = "connected" | "connecting" | "disconnected";
export type CanvasFillRule = "evenodd" | "nonzero";
export type ImageSmoothingQuality = "high" | "low" | "medium";
export type CanvasLineCap = "butt" | "round" | "square";
export type CanvasLineJoin = "bevel" | "miter" | "round";
export type CanvasDirection = "inherit" | "ltr" | "rtl";
export type CanvasTextAlign = "center" | "end" | "left" | "right" | "start";
export type CanvasTextBaseline = "alphabetic" | "bottom" | "hanging" | "ideographic" | "middle" | "top";
export type GLsizei = number;
export type GLenum = number;
export type GLuint = number;
export type GLclampf = number;
export type GLbitfield = number;
export type GLint = number;
export type GLboolean = boolean;
export type GLintptr = number;
export type GLfloat = number;
export type Float32List = Float32Array | GLfloat[];
export type GLsizeiptr = number;
export type TexImageSource = ImageBitmap | ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
export type Int32List = Int32Array | GLint[];
export type Uint32List = Uint32Array | GLuint[];
export type GLuint64 = number;
export type GLint64 = number;
export type ReadyState = "closed" | "ended" | "open";
export type EndOfStreamError = "decode" | "network";
export type AppendMode = "segments" | "sequence";

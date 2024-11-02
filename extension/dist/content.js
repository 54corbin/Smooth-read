/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/dioxus/smooth-read.js":
/*!******************************************!*\
  !*** ./src/assets/dioxus/smooth-read.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JSOwner: () => (/* binding */ JSOwner),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   initSync: () => (/* binding */ initSync)
/* harmony export */ });
/* harmony import */ var _snippets_dioxus_interpreter_js_7e2aed97ebee2c55_inline0_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./snippets/dioxus-interpreter-js-7e2aed97ebee2c55/inline0.js */ "./src/assets/dioxus/snippets/dioxus-interpreter-js-7e2aed97ebee2c55/inline0.js");
/* harmony import */ var _snippets_dioxus_interpreter_js_7e2aed97ebee2c55_src_js_common_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./snippets/dioxus-interpreter-js-7e2aed97ebee2c55/src/js/common.js */ "./src/assets/dioxus/snippets/dioxus-interpreter-js-7e2aed97ebee2c55/src/js/common.js");
/* harmony import */ var _snippets_dioxus_interpreter_js_7e2aed97ebee2c55_src_js_eval_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./snippets/dioxus-interpreter-js-7e2aed97ebee2c55/src/js/eval.js */ "./src/assets/dioxus/snippets/dioxus-interpreter-js-7e2aed97ebee2c55/src/js/eval.js");
/* harmony import */ var _snippets_dioxus_web_10186f9fcc0b4418_inline1_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./snippets/dioxus-web-10186f9fcc0b4418/inline1.js */ "./src/assets/dioxus/snippets/dioxus-web-10186f9fcc0b4418/inline1.js");
/* harmony import */ var _snippets_dioxus_web_10186f9fcc0b4418_inline0_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./snippets/dioxus-web-10186f9fcc0b4418/inline0.js */ "./src/assets/dioxus/snippets/dioxus-web-10186f9fcc0b4418/inline0.js");






let wasm;

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

function _assertBoolean(n) {
    if (typeof(n) !== 'boolean') {
        throw new Error(`expected a boolean argument, found ${typeof(n)}`);
    }
}

let WASM_VECTOR_LEN = 0;

const cachedTextEncoder = (typeof TextEncoder !== 'undefined' ? new TextEncoder('utf-8') : { encode: () => { throw Error('TextEncoder not available') } } );

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (typeof(arg) !== 'string') throw new Error(`expected a string argument, found ${typeof(arg)}`);

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);
        if (ret.read !== arg.length) throw new Error('failed to pass whole string');
        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachedDataViewMemory0 = null;

function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

function _assertNum(n) {
    if (typeof(n) !== 'number') throw new Error(`expected a number argument, found ${typeof(n)}`);
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

function _assertBigInt(n) {
    if (typeof(n) !== 'bigint') throw new Error(`expected a bigint argument, found ${typeof(n)}`);
}

const CLOSURE_DTORS = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(state => {
    wasm.__wbindgen_export_3.get(state.dtor)(state.a, state.b)
});

function makeClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {
        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        try {
            return f(state.a, state.b, ...args);
        } finally {
            if (--state.cnt === 0) {
                wasm.__wbindgen_export_3.get(state.dtor)(state.a, state.b);
                state.a = 0;
                CLOSURE_DTORS.unregister(state);
            }
        }
    };
    real.original = state;
    CLOSURE_DTORS.register(real, state, state);
    return real;
}

function logError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        let error = (function () {
            try {
                return e instanceof Error ? `${e.message}\n\nStack:\n${e.stack}` : e.toString();
            } catch(_) {
                return "<failed to stringify thrown value>";
            }
        }());
        console.error("wasm-bindgen: imported JS function that was not marked as `catch` threw an error:", error);
        throw e;
    }
}
function __wbg_adapter_54(arg0, arg1, arg2) {
    _assertNum(arg0);
    _assertNum(arg1);
    wasm.closure60_externref_shim(arg0, arg1, arg2);
}

function makeMutClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {
        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            if (--state.cnt === 0) {
                wasm.__wbindgen_export_3.get(state.dtor)(a, state.b);
                CLOSURE_DTORS.unregister(state);
            } else {
                state.a = a;
            }
        }
    };
    real.original = state;
    CLOSURE_DTORS.register(real, state, state);
    return real;
}
function __wbg_adapter_57(arg0, arg1, arg2) {
    _assertNum(arg0);
    _assertNum(arg1);
    wasm.closure62_externref_shim(arg0, arg1, arg2);
}

function __wbg_adapter_60(arg0, arg1) {
    _assertNum(arg0);
    _assertNum(arg1);
    wasm._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__he9b987a7cdc0bcbc(arg0, arg1);
}

function __wbg_adapter_63(arg0, arg1, arg2) {
    _assertNum(arg0);
    _assertNum(arg1);
    wasm.closure1010_externref_shim(arg0, arg1, arg2);
}

function __wbg_adapter_66(arg0, arg1, arg2) {
    _assertNum(arg0);
    _assertNum(arg1);
    wasm.closure1008_externref_shim(arg0, arg1, arg2);
}

function __wbg_adapter_69(arg0, arg1, arg2) {
    _assertNum(arg0);
    _assertNum(arg1);
    wasm.closure1067_externref_shim(arg0, arg1, arg2);
}

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_export_2.set(idx, obj);
    return idx;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        const idx = addToExternrefTable0(e);
        wasm.__wbindgen_exn_store(idx);
    }
}

function passArrayJsValueToWasm0(array, malloc) {
    const ptr = malloc(array.length * 4, 4) >>> 0;
    const mem = getDataViewMemory0();
    for (let i = 0; i < array.length; i++) {
        mem.setUint32(ptr + 4 * i, addToExternrefTable0(array[i]), true);
    }
    WASM_VECTOR_LEN = array.length;
    return ptr;
}

function getArrayJsValueFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    const mem = getDataViewMemory0();
    const result = [];
    for (let i = ptr; i < ptr + 4 * len; i += 4) {
        result.push(wasm.__wbindgen_export_2.get(mem.getUint32(i, true)));
    }
    wasm.__externref_drop_slice(ptr, len);
    return result;
}

function notDefined(what) { return () => { throw new Error(`${what} is not defined`); }; }

const __wbindgen_enum_ScrollBehavior = ["auto", "instant", "smooth"];

const __wbindgen_enum_ScrollLogicalPosition = ["start", "center", "end", "nearest"];

const JSOwnerFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_jsowner_free(ptr >>> 0, 1));

class JSOwner {

    constructor() {
        throw new Error('cannot invoke `new` directly');
    }

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(JSOwner.prototype);
        obj.__wbg_ptr = ptr;
        JSOwnerFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        JSOwnerFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_jsowner_free(ptr, 0);
    }
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_json_parse = function(arg0, arg1) {
        const ret = JSON.parse(getStringFromWasm0(arg0, arg1));
        return ret;
    };
    imports.wbg.__wbg_sendmessagetobg_9a6715f98b66c49d = function() { return logError(function (arg0, arg1, arg2, arg3) {
        let deferred0_0;
        let deferred0_1;
        try {
            deferred0_0 = arg0;
            deferred0_1 = arg1;
            send_message_to_bg(getStringFromWasm0(arg0, arg1), arg2, arg3);
        } finally {
            wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
        }
    }, arguments) };
    imports.wbg.__wbindgen_error_new = function(arg0, arg1) {
        const ret = new Error(getStringFromWasm0(arg0, arg1));
        return ret;
    };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        const ret = arg0 === undefined;
        _assertBoolean(ret);
        return ret;
    };
    imports.wbg.__wbindgen_in = function(arg0, arg1) {
        const ret = arg0 in arg1;
        _assertBoolean(ret);
        return ret;
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        const ret = getStringFromWasm0(arg0, arg1);
        return ret;
    };
    imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
        const obj = arg1;
        const ret = typeof(obj) === 'string' ? obj : undefined;
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbindgen_is_bigint = function(arg0) {
        const ret = typeof(arg0) === 'bigint';
        _assertBoolean(ret);
        return ret;
    };
    imports.wbg.__wbindgen_is_object = function(arg0) {
        const val = arg0;
        const ret = typeof(val) === 'object' && val !== null;
        _assertBoolean(ret);
        return ret;
    };
    imports.wbg.__wbindgen_jsval_eq = function(arg0, arg1) {
        const ret = arg0 === arg1;
        _assertBoolean(ret);
        return ret;
    };
    imports.wbg.__wbindgen_bigint_from_u64 = function(arg0) {
        const ret = BigInt.asUintN(64, arg0);
        return ret;
    };
    imports.wbg.__wbindgen_as_number = function(arg0) {
        const ret = +arg0;
        return ret;
    };
    imports.wbg.__wbindgen_number_get = function(arg0, arg1) {
        const obj = arg1;
        const ret = typeof(obj) === 'number' ? obj : undefined;
        if (!isLikeNone(ret)) {
            _assertNum(ret);
        }
        getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
    };
    imports.wbg.__wbindgen_boolean_get = function(arg0) {
        const v = arg0;
        const ret = typeof(v) === 'boolean' ? (v ? 1 : 0) : 2;
        _assertNum(ret);
        return ret;
    };
    imports.wbg.__wbindgen_number_new = function(arg0) {
        const ret = arg0;
        return ret;
    };
    imports.wbg.__wbindgen_jsval_loose_eq = function(arg0, arg1) {
        const ret = arg0 == arg1;
        _assertBoolean(ret);
        return ret;
    };
    imports.wbg.__wbindgen_bigint_from_i64 = function(arg0) {
        const ret = arg0;
        return ret;
    };
    imports.wbg.__wbg_getwithrefkey_edc2c8960f0f1191 = function() { return logError(function (arg0, arg1) {
        const ret = arg0[arg1];
        return ret;
    }, arguments) };
    imports.wbg.__wbg_mark_40e050a77cc39fea = function() { return logError(function (arg0, arg1) {
        performance.mark(getStringFromWasm0(arg0, arg1));
    }, arguments) };
    imports.wbg.__wbg_measure_aa7a73f17813f708 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        let deferred0_0;
        let deferred0_1;
        let deferred1_0;
        let deferred1_1;
        try {
            deferred0_0 = arg0;
            deferred0_1 = arg1;
            deferred1_0 = arg2;
            deferred1_1 = arg3;
            performance.measure(getStringFromWasm0(arg0, arg1), getStringFromWasm0(arg2, arg3));
        } finally {
            wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }, arguments) };
    imports.wbg.__wbg_log_c9486ca5d8e2cbe8 = function() { return logError(function (arg0, arg1) {
        let deferred0_0;
        let deferred0_1;
        try {
            deferred0_0 = arg0;
            deferred0_1 = arg1;
            console.log(getStringFromWasm0(arg0, arg1));
        } finally {
            wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
        }
    }, arguments) };
    imports.wbg.__wbg_log_aba5996d9bde071f = function() { return logError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
        let deferred0_0;
        let deferred0_1;
        try {
            deferred0_0 = arg0;
            deferred0_1 = arg1;
            console.log(getStringFromWasm0(arg0, arg1), getStringFromWasm0(arg2, arg3), getStringFromWasm0(arg4, arg5), getStringFromWasm0(arg6, arg7));
        } finally {
            wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
        }
    }, arguments) };
    imports.wbg.__wbg_rustRecv_1b6f5c2d10fa7141 = function() { return logError(function (arg0) {
        const ret = arg0.rustRecv();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getselectdata_d0a959dad128957f = function() { return logError(function (arg0, arg1) {
        const ret = (0,_snippets_dioxus_web_10186f9fcc0b4418_inline1_js__WEBPACK_IMPORTED_MODULE_3__.get_select_data)(arg1);
        const ptr1 = passArrayJsValueToWasm0(ret, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments) };
    imports.wbg.__wbg_error_f851667af71bcfc6 = function() { return logError(function (arg0, arg1) {
        let deferred0_0;
        let deferred0_1;
        try {
            deferred0_0 = arg0;
            deferred0_1 = arg1;
            console.error(getStringFromWasm0(arg0, arg1));
        } finally {
            wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
        }
    }, arguments) };
    imports.wbg.__wbg_new_abda76e883ba8a5f = function() { return logError(function () {
        const ret = new Error();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_stack_658279fe44541cf6 = function() { return logError(function (arg0, arg1) {
        const ret = arg1.stack;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments) };
    imports.wbg.__wbg_String_88810dfeb4021902 = function() { return logError(function (arg0, arg1) {
        const ret = String(arg1);
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments) };
    imports.wbg.__wbg_set_841ac57cff3d672b = function() { return logError(function (arg0, arg1, arg2) {
        arg0[arg1] = arg2;
    }, arguments) };
    imports.wbg.__wbg_new_c44bca3b6f94b9dc = function() { return logError(function (arg0) {
        const ret = new _snippets_dioxus_interpreter_js_7e2aed97ebee2c55_src_js_eval_js__WEBPACK_IMPORTED_MODULE_2__.WebDioxusChannel(JSOwner.__wrap(arg0));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_weak_cd28ee08d42a73ad = function() { return logError(function (arg0) {
        const ret = arg0.weak();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_rustSend_3b93da3cdc175722 = function() { return logError(function (arg0, arg1) {
        arg0.rustSend(arg1);
    }, arguments) };
    imports.wbg.__wbg_setAttributeInner_2820d9f570125088 = function() { return logError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
        (0,_snippets_dioxus_interpreter_js_7e2aed97ebee2c55_src_js_common_js__WEBPACK_IMPORTED_MODULE_1__.setAttributeInner)(arg0, getStringFromWasm0(arg1, arg2), arg3, arg4 === 0 ? undefined : getStringFromWasm0(arg4, arg5));
    }, arguments) };
    imports.wbg.__wbg_initialize_ed565fb65dd7bcd0 = function() { return logError(function (arg0, arg1, arg2) {
        arg0.initialize(arg1, arg2);
    }, arguments) };
    imports.wbg.__wbg_saveTemplate_e7948f8b7f54cfc9 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        var v0 = getArrayJsValueFromWasm0(arg1, arg2).slice();
        wasm.__wbindgen_free(arg1, arg2 * 4, 4);
        arg0.saveTemplate(v0, arg3);
    }, arguments) };
    imports.wbg.__wbg_getNode_d4db5a1d3bc15eae = function() { return logError(function (arg0, arg1) {
        const ret = arg0.getNode(arg1 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_0924b9f1bd6dd838 = function() { return logError(function (arg0) {
        const ret = new _snippets_dioxus_interpreter_js_7e2aed97ebee2c55_inline0_js__WEBPACK_IMPORTED_MODULE_0__.RawInterpreter(arg0 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_run_47308773c14de567 = function() { return logError(function (arg0) {
        arg0.run();
    }, arguments) };
    imports.wbg.__wbg_updatememory_0fc68f206c0463de = function() { return logError(function (arg0, arg1) {
        arg0.update_memory(arg1);
    }, arguments) };
    imports.wbg.__wbindgen_is_function = function(arg0) {
        const ret = typeof(arg0) === 'function';
        _assertBoolean(ret);
        return ret;
    };
    imports.wbg.__wbg_queueMicrotask_12a30234db4045d3 = typeof queueMicrotask == 'function' ? queueMicrotask : notDefined('queueMicrotask');
    imports.wbg.__wbg_queueMicrotask_48421b3cc9052b68 = function() { return logError(function (arg0) {
        const ret = arg0.queueMicrotask;
        return ret;
    }, arguments) };
    imports.wbg.__wbindgen_cb_drop = function(arg0) {
        const obj = arg0.original;
        if (obj.cnt-- == 1) {
            obj.a = 0;
            return true;
        }
        const ret = false;
        _assertBoolean(ret);
        return ret;
    };
    imports.wbg.__wbg_instanceof_Window_6575cd7f1322f82f = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof Window;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_document_d7fa2c739c2b191a = function() { return logError(function (arg0) {
        const ret = arg0.document;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_location_72721055fbff81f2 = function() { return logError(function (arg0) {
        const ret = arg0.location;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_body_8e909b791b1745d3 = function() { return logError(function (arg0) {
        const ret = arg0.body;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_createElement_e4523490bd0ae51d = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = arg0.createElement(getStringFromWasm0(arg1, arg2));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_createElementNS_e51a368ab3a64b37 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        const ret = arg0.createElementNS(arg1 === 0 ? undefined : getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_createTextNode_3b33c97f8ef3e999 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.createTextNode(getStringFromWasm0(arg1, arg2));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getElementById_734c4eac4fec5911 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.getElementById(getStringFromWasm0(arg1, arg2));
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_querySelectorAll_28e417f74795a70f = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = arg0.querySelectorAll(getStringFromWasm0(arg1, arg2));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_Element_1a81366cc90e70e2 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof Element;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getAttribute_8ac49f4186f4cefd = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = arg1.getAttribute(getStringFromWasm0(arg2, arg3));
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments) };
    imports.wbg.__wbg_getBoundingClientRect_5ad16be1e2955e83 = function() { return logError(function (arg0) {
        const ret = arg0.getBoundingClientRect();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_scrollIntoView_006062858903bbd0 = function() { return logError(function (arg0, arg1) {
        arg0.scrollIntoView(arg1);
    }, arguments) };
    imports.wbg.__wbg_setAttribute_2a8f647a8d92c712 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.setAttribute(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
    }, arguments) };
    imports.wbg.__wbg_toggleAttribute_dbc6a90ae90527b3 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = arg0.toggleAttribute(getStringFromWasm0(arg1, arg2));
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_HtmlElement_aab18e065dc9207d = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof HTMLElement;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_style_04eb1488bc2ceffc = function() { return logError(function (arg0) {
        const ret = arg0.style;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_blur_d7e0bcc31c40e996 = function() { return handleError(function (arg0) {
        arg0.blur();
    }, arguments) };
    imports.wbg.__wbg_focus_6b6181f7644f6dbc = function() { return handleError(function (arg0) {
        arg0.focus();
    }, arguments) };
    imports.wbg.__wbg_top_5f4586313f3e086f = function() { return logError(function (arg0) {
        const ret = arg0.top;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_left_324ad4ce0086311f = function() { return logError(function (arg0) {
        const ret = arg0.left;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_HtmlInputElement_ee25196edbacced9 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof HTMLInputElement;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_checked_5c9846154b6119f6 = function() { return logError(function (arg0) {
        const ret = arg0.checked;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_files_5738c8732c2fc992 = function() { return logError(function (arg0) {
        const ret = arg0.files;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_type_0b40a977ba28a744 = function() { return logError(function (arg0, arg1) {
        const ret = arg1.type;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments) };
    imports.wbg.__wbg_value_0cffd86fb9a5a18d = function() { return logError(function (arg0, arg1) {
        const ret = arg1.value;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments) };
    imports.wbg.__wbg_data_134d3a704b9fca32 = function() { return logError(function (arg0) {
        const ret = arg0.data;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_touches_092e96ce3221acbc = function() { return logError(function (arg0) {
        const ret = arg0.touches;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_targetTouches_faffde5127036c13 = function() { return logError(function (arg0) {
        const ret = arg0.targetTouches;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_changedTouches_ee3dabea7d95ebf2 = function() { return logError(function (arg0) {
        const ret = arg0.changedTouches;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_altKey_e0ebf3eabcb13e08 = function() { return logError(function (arg0) {
        const ret = arg0.altKey;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_metaKey_3b977a6e61a731d7 = function() { return logError(function (arg0) {
        const ret = arg0.metaKey;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_ctrlKey_606cbe2c4322ed56 = function() { return logError(function (arg0) {
        const ret = arg0.ctrlKey;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_shiftKey_863ca71f9f2722ab = function() { return logError(function (arg0) {
        const ret = arg0.shiftKey;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_error_53abcd6a461f73d8 = typeof console.error == 'function' ? console.error : notDefined('console.error');
    imports.wbg.__wbg_log_f740dc2253ea759b = typeof console.log == 'function' ? console.log : notDefined('console.log');
    imports.wbg.__wbg_addEventListener_4357f9b7b3826784 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        arg0.addEventListener(getStringFromWasm0(arg1, arg2), arg3);
    }, arguments) };
    imports.wbg.__wbg_instanceof_HtmlFormElement_b7d5ed0355176c29 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof HTMLFormElement;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_HtmlTextAreaElement_3d7305919124ce06 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof HTMLTextAreaElement;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_value_a8d0480de0da39cf = function() { return logError(function (arg0, arg1) {
        const ret = arg1.value;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments) };
    imports.wbg.__wbg_protocol_39dcf7495862d01b = function() { return handleError(function (arg0, arg1) {
        const ret = arg1.protocol;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments) };
    imports.wbg.__wbg_host_0dbedd515e7d7dff = function() { return handleError(function (arg0, arg1) {
        const ret = arg1.host;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments) };
    imports.wbg.__wbg_pageX_163dc6047071b51f = function() { return logError(function (arg0) {
        const ret = arg0.pageX;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_pageY_302e6265933ebb59 = function() { return logError(function (arg0) {
        const ret = arg0.pageY;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_width_28175f04c07458aa = function() { return logError(function (arg0) {
        const ret = arg0.width;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_height_dbd0616ae39a99b1 = function() { return logError(function (arg0) {
        const ret = arg0.height;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_HtmlSelectElement_66dfc08c717b1515 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof HTMLSelectElement;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_value_0b0cebe9335a78ae = function() { return logError(function (arg0, arg1) {
        const ret = arg1.value;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments) };
    imports.wbg.__wbg_screenX_a30d4e116ae70c94 = function() { return logError(function (arg0) {
        const ret = arg0.screenX;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_screenY_8325b64f4724a798 = function() { return logError(function (arg0) {
        const ret = arg0.screenY;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_clientX_a8eebf094c107e43 = function() { return logError(function (arg0) {
        const ret = arg0.clientX;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_clientY_ffe0a79af8089cd4 = function() { return logError(function (arg0) {
        const ret = arg0.clientY;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_offsetX_79b2d23b78682ab7 = function() { return logError(function (arg0) {
        const ret = arg0.offsetX;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_offsetY_39cb724403a8302f = function() { return logError(function (arg0) {
        const ret = arg0.offsetY;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_ctrlKey_4015247a39aa9410 = function() { return logError(function (arg0) {
        const ret = arg0.ctrlKey;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_shiftKey_6d843f3032fd0366 = function() { return logError(function (arg0) {
        const ret = arg0.shiftKey;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_altKey_c9401b041949ea90 = function() { return logError(function (arg0) {
        const ret = arg0.altKey;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_metaKey_5d680933661ea1ea = function() { return logError(function (arg0) {
        const ret = arg0.metaKey;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_button_d8226b772c8cf494 = function() { return logError(function (arg0) {
        const ret = arg0.button;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_buttons_2cb9e49b40e20105 = function() { return logError(function (arg0) {
        const ret = arg0.buttons;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_setbehavior_e58c14ac43ed56a1 = function() { return logError(function (arg0, arg1) {
        arg0.behavior = __wbindgen_enum_ScrollBehavior[arg1];
    }, arguments) };
    imports.wbg.__wbg_identifier_b858c904e1c72507 = function() { return logError(function (arg0) {
        const ret = arg0.identifier;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_screenX_66fdb34b7f1552ac = function() { return logError(function (arg0) {
        const ret = arg0.screenX;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_screenY_0949c88f98db641e = function() { return logError(function (arg0) {
        const ret = arg0.screenY;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_clientX_0e075d664eb70517 = function() { return logError(function (arg0) {
        const ret = arg0.clientX;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_clientY_32b24b7be6b2e79d = function() { return logError(function (arg0) {
        const ret = arg0.clientY;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_pageX_f570d523d89c16ec = function() { return logError(function (arg0) {
        const ret = arg0.pageX;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_pageY_ff077f56016c03aa = function() { return logError(function (arg0) {
        const ret = arg0.pageY;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_radiusX_f00767113c0e51ea = function() { return logError(function (arg0) {
        const ret = arg0.radiusX;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_radiusY_c4043b226e03d720 = function() { return logError(function (arg0) {
        const ret = arg0.radiusY;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_rotationAngle_e35c1b560312ec61 = function() { return logError(function (arg0) {
        const ret = arg0.rotationAngle;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_force_5af67f6cd0b9c097 = function() { return logError(function (arg0) {
        const ret = arg0.force;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_length_1b6ac4894265d4e6 = function() { return logError(function (arg0) {
        const ret = arg0.length;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_get_4d863ed1d42a2b7d = function() { return logError(function (arg0, arg1) {
        const ret = arg0[arg1 >>> 0];
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_propertyName_44ca202b08d008f3 = function() { return logError(function (arg0, arg1) {
        const ret = arg1.propertyName;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments) };
    imports.wbg.__wbg_elapsedTime_476a4e01c4f63fda = function() { return logError(function (arg0) {
        const ret = arg0.elapsedTime;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_pseudoElement_f3ba1319b33578fa = function() { return logError(function (arg0, arg1) {
        const ret = arg1.pseudoElement;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments) };
    imports.wbg.__wbg_setonmessage_84cd941c1df08da7 = function() { return logError(function (arg0, arg1) {
        arg0.onmessage = arg1;
    }, arguments) };
    imports.wbg.__wbg_new_d550f7a7120dd942 = function() { return handleError(function (arg0, arg1) {
        const ret = new WebSocket(getStringFromWasm0(arg0, arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_animationName_841417bb5df8825f = function() { return logError(function (arg0, arg1) {
        const ret = arg1.animationName;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments) };
    imports.wbg.__wbg_elapsedTime_2a54081e9269631d = function() { return logError(function (arg0) {
        const ret = arg0.elapsedTime;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_pseudoElement_b2234158091018ae = function() { return logError(function (arg0, arg1) {
        const ret = arg1.pseudoElement;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments) };
    imports.wbg.__wbg_data_86e77dc14916d155 = function() { return logError(function (arg0, arg1) {
        const ret = arg1.data;
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments) };
    imports.wbg.__wbg_setProperty_b9a2384cbfb499fb = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.setProperty(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
    }, arguments) };
    imports.wbg.__wbg_files_194ca113571d995f = function() { return logError(function (arg0) {
        const ret = arg0.files;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_altKey_ebf03e2308f51c08 = function() { return logError(function (arg0) {
        const ret = arg0.altKey;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_ctrlKey_f592192d87040d94 = function() { return logError(function (arg0) {
        const ret = arg0.ctrlKey;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_shiftKey_cb120edc9c25950d = function() { return logError(function (arg0) {
        const ret = arg0.shiftKey;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_metaKey_0735ca81e2ec6c72 = function() { return logError(function (arg0) {
        const ret = arg0.metaKey;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_location_a7e2614c5720fcd7 = function() { return logError(function (arg0) {
        const ret = arg0.location;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_repeat_1f81f308f5d8d519 = function() { return logError(function (arg0) {
        const ret = arg0.repeat;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_isComposing_527cd20b8f4c31d2 = function() { return logError(function (arg0) {
        const ret = arg0.isComposing;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_key_001eb20ba3b3d2fd = function() { return logError(function (arg0, arg1) {
        const ret = arg1.key;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments) };
    imports.wbg.__wbg_code_bec0d5222298000e = function() { return logError(function (arg0, arg1) {
        const ret = arg1.code;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments) };
    imports.wbg.__wbg_deltaX_10154f810008c0a0 = function() { return logError(function (arg0) {
        const ret = arg0.deltaX;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_deltaY_afd77a1b9e0d9ccd = function() { return logError(function (arg0) {
        const ret = arg0.deltaY;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_deltaZ_ec44501c143f6d88 = function() { return logError(function (arg0) {
        const ret = arg0.deltaZ;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_deltaMode_f31810d86a9defec = function() { return logError(function (arg0) {
        const ret = arg0.deltaMode;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_DragEvent_d060c9d7e145246e = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof DragEvent;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_dataTransfer_b898af73237a967c = function() { return logError(function (arg0) {
        const ret = arg0.dataTransfer;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_type_739ef24b64f58229 = function() { return logError(function (arg0, arg1) {
        const ret = arg1.type;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments) };
    imports.wbg.__wbg_target_b0499015ea29563d = function() { return logError(function (arg0) {
        const ret = arg0.target;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_bubbles_c48a1056384e852c = function() { return logError(function (arg0) {
        const ret = arg0.bubbles;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_preventDefault_eecc4a63e64c4526 = function() { return logError(function (arg0) {
        arg0.preventDefault();
    }, arguments) };
    imports.wbg.__wbg_name_e30efb33291e0016 = function() { return logError(function (arg0, arg1) {
        const ret = arg1.name;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments) };
    imports.wbg.__wbg_length_21a3493916831b15 = function() { return logError(function (arg0) {
        const ret = arg0.length;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_item_e35a9206ab7dd263 = function() { return logError(function (arg0, arg1) {
        const ret = arg0.item(arg1 >>> 0);
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_result_5cc84600fc64bf35 = function() { return handleError(function (arg0) {
        const ret = arg0.result;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_setonload_0e9d43ec0cbb3987 = function() { return logError(function (arg0, arg1) {
        arg0.onload = arg1;
    }, arguments) };
    imports.wbg.__wbg_new_e282c42c5fc7a7b1 = function() { return handleError(function () {
        const ret = new FileReader();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_readAsArrayBuffer_467dfea5cb42f85c = function() { return handleError(function (arg0, arg1) {
        arg0.readAsArrayBuffer(arg1);
    }, arguments) };
    imports.wbg.__wbg_readAsText_abb4898a82a4815a = function() { return handleError(function (arg0, arg1) {
        arg0.readAsText(arg1);
    }, arguments) };
    imports.wbg.__wbg_instanceof_Node_db422d75160b3c20 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof Node;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_nodeType_e8a5ffbc763d0dc5 = function() { return logError(function (arg0) {
        const ret = arg0.nodeType;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_ownerDocument_1ff29e4c967e4d78 = function() { return logError(function (arg0) {
        const ret = arg0.ownerDocument;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_parentNode_7e7d8adc9b41ce58 = function() { return logError(function (arg0) {
        const ret = arg0.parentNode;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_parentElement_bf013e6093029477 = function() { return logError(function (arg0) {
        const ret = arg0.parentElement;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_childNodes_87c5e311593a6192 = function() { return logError(function (arg0) {
        const ret = arg0.childNodes;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_textContent_389dd460500a44bd = function() { return logError(function (arg0, arg1) {
        const ret = arg1.textContent;
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments) };
    imports.wbg.__wbg_settextContent_f9c4b60e6c009ea2 = function() { return logError(function (arg0, arg1, arg2) {
        arg0.textContent = arg1 === 0 ? undefined : getStringFromWasm0(arg1, arg2);
    }, arguments) };
    imports.wbg.__wbg_appendChild_bc4a0deae90a5164 = function() { return handleError(function (arg0, arg1) {
        const ret = arg0.appendChild(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_length_9a6b70327f5f86e1 = function() { return logError(function (arg0) {
        const ret = arg0.length;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_item_b680326884170fbb = function() { return logError(function (arg0, arg1) {
        const ret = arg0.item(arg1 >>> 0);
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_get_602f2a39a831c929 = function() { return logError(function (arg0, arg1) {
        const ret = arg0[arg1 >>> 0];
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_pointerId_93f7e5e10bb641ad = function() { return logError(function (arg0) {
        const ret = arg0.pointerId;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_width_e219d480687cf6e6 = function() { return logError(function (arg0) {
        const ret = arg0.width;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_height_43c0ad624a17f405 = function() { return logError(function (arg0) {
        const ret = arg0.height;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_pressure_ad8dacbd14c9076f = function() { return logError(function (arg0) {
        const ret = arg0.pressure;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_tangentialPressure_a096181c7325f997 = function() { return logError(function (arg0) {
        const ret = arg0.tangentialPressure;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_tiltX_d85abdd3d6e11865 = function() { return logError(function (arg0) {
        const ret = arg0.tiltX;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_tiltY_c890264354ac05d2 = function() { return logError(function (arg0) {
        const ret = arg0.tiltY;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_twist_7843b7e5e0e2d69d = function() { return logError(function (arg0) {
        const ret = arg0.twist;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_pointerType_6d91ef0da43639d3 = function() { return logError(function (arg0, arg1) {
        const ret = arg1.pointerType;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments) };
    imports.wbg.__wbg_isPrimary_2ee404d1f136ff46 = function() { return logError(function (arg0) {
        const ret = arg0.isPrimary;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_034f913e7636e987 = function() { return logError(function () {
        const ret = new Array();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_get_5419cf6b954aa11d = function() { return logError(function (arg0, arg1) {
        const ret = arg0[arg1 >>> 0];
        return ret;
    }, arguments) };
    imports.wbg.__wbg_set_425e70f7c64ac962 = function() { return logError(function (arg0, arg1, arg2) {
        arg0[arg1 >>> 0] = arg2;
    }, arguments) };
    imports.wbg.__wbg_isArray_6f3b47f09adb61b5 = function() { return logError(function (arg0) {
        const ret = Array.isArray(arg0);
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_length_f217bbbf7e8e4df4 = function() { return logError(function (arg0) {
        const ret = arg0.length;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_ArrayBuffer_74945570b4a62ec7 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof ArrayBuffer;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithargs_54f5f31ff1323eb2 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = new Function(getStringFromWasm0(arg0, arg1), getStringFromWasm0(arg2, arg3));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newnoargs_1ede4bf2ebbaaf43 = function() { return logError(function (arg0, arg1) {
        const ret = new Function(getStringFromWasm0(arg0, arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_call_a9ef466721e824f2 = function() { return handleError(function (arg0, arg1) {
        const ret = arg0.call(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_call_3bfa248576352471 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = arg0.call(arg1, arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_7a87a0376e40533b = function() { return logError(function () {
        const ret = new Map();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_set_277a63e77c89279f = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.set(arg1, arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_entries_08a0332a9c4be547 = function() { return logError(function (arg0) {
        const ret = arg0.entries();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_next_b06e115d1b01e10b = function() { return handleError(function (arg0) {
        const ret = arg0.next();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_next_13b477da1eaa3897 = function() { return logError(function (arg0) {
        const ret = arg0.next;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_done_983b5ffcaec8c583 = function() { return logError(function (arg0) {
        const ret = arg0.done;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_value_2ab8a198c834c26a = function() { return logError(function (arg0) {
        const ret = arg0.value;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_isSafeInteger_b9dff570f01a9100 = function() { return logError(function (arg0) {
        const ret = Number.isSafeInteger(arg0);
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_entries_c02034de337d3ee2 = function() { return logError(function (arg0) {
        const ret = Object.entries(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_e69b5f66fda8f13c = function() { return logError(function () {
        const ret = new Object();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_length_ace210b441c50e19 = function() { return logError(function (arg0) {
        const ret = arg0.length;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_charCodeAt_b8a738ac743eeff4 = function() { return logError(function (arg0, arg1) {
        const ret = arg0.charCodeAt(arg1 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_iterator_695d699a44d6234c = function() { return logError(function () {
        const ret = Symbol.iterator;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_resolve_0aad7c1484731c99 = function() { return logError(function (arg0) {
        const ret = Promise.resolve(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_then_748f75edfb032440 = function() { return logError(function (arg0, arg1) {
        const ret = arg0.then(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_then_4866a7d9f55d8f3e = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.then(arg1, arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_globalThis_05c129bf37fcf1be = function() { return handleError(function () {
        const ret = globalThis.globalThis;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_self_bf91bf94d9e04084 = function() { return handleError(function () {
        const ret = self.self;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_window_52dd9f07d03fd5f8 = function() { return handleError(function () {
        const ret = window.window;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_global_3eca19bb09e9c484 = function() { return handleError(function () {
        const ret = __webpack_require__.g.global;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_Uint8Array_df0761410414ef36 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof Uint8Array;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_fec2611eb9180f95 = function() { return logError(function (arg0) {
        const ret = new Uint8Array(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_length_9254c4bd3b9f23c4 = function() { return logError(function (arg0) {
        const ret = arg0.length;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_set_ec2fcf81bc573fd9 = function() { return logError(function (arg0, arg1, arg2) {
        arg0.set(arg1, arg2 >>> 0);
    }, arguments) };
    imports.wbg.__wbindgen_is_string = function(arg0) {
        const ret = typeof(arg0) === 'string';
        _assertBoolean(ret);
        return ret;
    };
    imports.wbg.__wbg_get_ef828680c64da212 = function() { return handleError(function (arg0, arg1) {
        const ret = Reflect.get(arg0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_stringify_eead5648c09faaf8 = function() { return handleError(function (arg0) {
        const ret = JSON.stringify(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_random_ff204240120aa46e = typeof Math.random == 'function' ? Math.random : notDefined('Math.random');
    imports.wbg.__wbg_buffer_ccaed51a635d8a2d = function() { return logError(function (arg0) {
        const ret = arg0.buffer;
        return ret;
    }, arguments) };
    imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
        const ret = debugString(arg1);
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbindgen_bigint_get_as_i64 = function(arg0, arg1) {
        const v = arg1;
        const ret = typeof(v) === 'bigint' ? v : undefined;
        if (!isLikeNone(ret)) {
            _assertBigInt(ret);
        }
        getDataViewMemory0().setBigInt64(arg0 + 8 * 1, isLikeNone(ret) ? BigInt(0) : ret, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_memory = function() {
        const ret = wasm.memory;
        return ret;
    };
    imports.wbg.__wbindgen_closure_wrapper369 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = makeClosure(arg0, arg1, 61, __wbg_adapter_54);
        return ret;
    }, arguments) };
    imports.wbg.__wbindgen_closure_wrapper371 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 63, __wbg_adapter_57);
        return ret;
    }, arguments) };
    imports.wbg.__wbindgen_closure_wrapper11200 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 1007, __wbg_adapter_60);
        return ret;
    }, arguments) };
    imports.wbg.__wbindgen_closure_wrapper11202 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 1011, __wbg_adapter_63);
        return ret;
    }, arguments) };
    imports.wbg.__wbindgen_closure_wrapper11204 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 1009, __wbg_adapter_66);
        return ret;
    }, arguments) };
    imports.wbg.__wbindgen_closure_wrapper13568 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 1068, __wbg_adapter_69);
        return ret;
    }, arguments) };
    imports.wbg.__wbindgen_init_externref_table = function() {
        const table = wasm.__wbindgen_export_2;
        const offset = table.grow(4);
        table.set(0, undefined);
        table.set(offset + 0, undefined);
        table.set(offset + 1, null);
        table.set(offset + 2, true);
        table.set(offset + 3, false);
        ;
    };
    imports['./snippets/dioxus-web-10186f9fcc0b4418/inline0.js'] = _snippets_dioxus_web_10186f9fcc0b4418_inline0_js__WEBPACK_IMPORTED_MODULE_4__;

    return imports;
}

function __wbg_init_memory(imports, memory) {

}

function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedDataViewMemory0 = null;
    cachedUint8ArrayMemory0 = null;


    wasm.__wbindgen_start();
    return wasm;
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (typeof module !== 'undefined') {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();

    __wbg_init_memory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (typeof module_or_path !== 'undefined') {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }


    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    __wbg_init_memory(imports);

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__wbg_init);


/***/ }),

/***/ "./src/assets/dioxus/snippets/dioxus-interpreter-js-7e2aed97ebee2c55/inline0.js":
/*!**************************************************************************************!*\
  !*** ./src/assets/dioxus/snippets/dioxus-interpreter-js-7e2aed97ebee2c55/inline0.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseInterpreter: () => (/* binding */ BaseInterpreter),
/* harmony export */   RawInterpreter: () => (/* binding */ RawInterpreter)
/* harmony export */ });

            function setAttributeInner(node,field,value,ns){if(ns==="style"){node.style.setProperty(field,value);return}if(ns){node.setAttributeNS(ns,field,value);return}switch(field){case"value":if(node.value!==value)node.value=value;break;case"initial_value":node.defaultValue=value;break;case"checked":node.checked=truthy(value);break;case"initial_checked":node.defaultChecked=truthy(value);break;case"selected":node.selected=truthy(value);break;case"initial_selected":node.defaultSelected=truthy(value);break;case"dangerous_inner_html":node.innerHTML=value;break;default:if(!truthy(value)&&isBoolAttr(field))node.removeAttribute(field);else node.setAttribute(field,value)}}var truthy=function(val){return val==="true"||val===!0},isBoolAttr=function(field){switch(field){case"allowfullscreen":case"allowpaymentrequest":case"async":case"autofocus":case"autoplay":case"checked":case"controls":case"default":case"defer":case"disabled":case"formnovalidate":case"hidden":case"ismap":case"itemscope":case"loop":case"multiple":case"muted":case"nomodule":case"novalidate":case"open":case"playsinline":case"readonly":case"required":case"reversed":case"selected":case"truespeed":case"webkitdirectory":return!0;default:return!1}};class BaseInterpreter{global;local;root;handler;nodes;stack;templates;m;constructor(){}initialize(root,handler=null){if(this.global={},this.local={},this.root=root,this.nodes=[root],this.stack=[root],this.templates={},handler)this.handler=handler}createListener(event_name,element,bubbles){if(bubbles)if(this.global[event_name]===void 0)this.global[event_name]={active:1,callback:this.handler},this.root.addEventListener(event_name,this.handler);else this.global[event_name].active++;else{const id=element.getAttribute("data-dioxus-id");if(!this.local[id])this.local[id]={};element.addEventListener(event_name,this.handler)}}removeListener(element,event_name,bubbles){if(bubbles)this.removeBubblingListener(event_name);else this.removeNonBubblingListener(element,event_name)}removeBubblingListener(event_name){if(this.global[event_name].active--,this.global[event_name].active===0)this.root.removeEventListener(event_name,this.global[event_name].callback),delete this.global[event_name]}removeNonBubblingListener(element,event_name){const id=element.getAttribute("data-dioxus-id");if(delete this.local[id][event_name],Object.keys(this.local[id]).length===0)delete this.local[id];element.removeEventListener(event_name,this.handler)}removeAllNonBubblingListeners(element){const id=element.getAttribute("data-dioxus-id");delete this.local[id]}getNode(id){return this.nodes[id]}appendChildren(id,many){const root=this.nodes[id],els=this.stack.splice(this.stack.length-many);for(let k=0;k<many;k++)root.appendChild(els[k])}loadChild(ptr,len){let node=this.stack[this.stack.length-1],ptr_end=ptr+len;for(;ptr<ptr_end;ptr++){let end=this.m.getUint8(ptr);for(node=node.firstChild;end>0;end--)node=node.nextSibling}return node}saveTemplate(nodes,tmpl_id){this.templates[tmpl_id]=nodes}hydrate(ids){const hydrateNodes=document.querySelectorAll("[data-node-hydration]");for(let i=0;i<hydrateNodes.length;i++){const hydrateNode=hydrateNodes[i],split=hydrateNode.getAttribute("data-node-hydration").split(","),id=ids[parseInt(split[0])];if(this.nodes[id]=hydrateNode,split.length>1){hydrateNode.listening=split.length-1,hydrateNode.setAttribute("data-dioxus-id",id.toString());for(let j=1;j<split.length;j++){const split2=split[j].split(":"),event_name=split2[0],bubbles=split2[1]==="1";this.createListener(event_name,hydrateNode,bubbles)}}}const treeWalker=document.createTreeWalker(document.body,NodeFilter.SHOW_COMMENT);let currentNode=treeWalker.nextNode();while(currentNode){const split=currentNode.textContent.split("node-id");if(split.length>1){let next=currentNode.nextSibling;if(next.nodeType===Node.COMMENT_NODE)next=next.parentElement.insertBefore(document.createTextNode(""),next);this.nodes[ids[parseInt(split[1])]]=next}currentNode=treeWalker.nextNode()}}setAttributeInner(node,field,value,ns){setAttributeInner(node,field,value,ns)}}

            let bubbles,field,value,many,ns,id;
            class RawInterpreter extends BaseInterpreter {
                constructor(r) {
                    super();
                    this.d=r;
                    this.m = null;
                    this.p = null;
                    this.ls = null;
                    this.t = null;
                    this.op = null;
                    this.e = null;
                    this.z = null;
                    this.metaflags = null;
                    this.u8buf=null;this.u8bufp=null;this.evt = [];
                    this.evt_cache_hit = null;
                    this.evt_cache_idx;
                    this.get_evt = function() {
                        this.evt_cache_idx = this.u8buf[this.u8bufp++];
                        if(this.evt_cache_idx & 128){
                            this.evt_cache_hit=this.s.substring(this.sp,this.sp+=this.u8buf[this.u8bufp++]);
                            this.evt[this.evt_cache_idx&4294967167]=this.evt_cache_hit;
                            return this.evt_cache_hit;
                        }
                        else{
                            return this.evt[this.evt_cache_idx&4294967167];
                        }
                    };this.u16buf=null;this.u16bufp=null;this.s = "";this.lsp = null;this.sp = null;this.sl = null;this.c = new TextDecoder();this.el = [];
                    this.el_cache_hit = null;
                    this.el_cache_idx;
                    this.get_el = function() {
                        this.el_cache_idx = this.u8buf[this.u8bufp++];
                        if(this.el_cache_idx & 128){
                            this.el_cache_hit=this.s.substring(this.sp,this.sp+=this.u8buf[this.u8bufp++]);
                            this.el[this.el_cache_idx&4294967167]=this.el_cache_hit;
                            return this.el_cache_hit;
                        }
                        else{
                            return this.el[this.el_cache_idx&4294967167];
                        }
                    };this.ns_cache = [];
                    this.ns_cache_cache_hit = null;
                    this.ns_cache_cache_idx;
                    this.get_ns_cache = function() {
                        this.ns_cache_cache_idx = this.u8buf[this.u8bufp++];
                        if(this.ns_cache_cache_idx & 128){
                            this.ns_cache_cache_hit=this.s.substring(this.sp,this.sp+=this.u8buf[this.u8bufp++]);
                            this.ns_cache[this.ns_cache_cache_idx&4294967167]=this.ns_cache_cache_hit;
                            return this.ns_cache_cache_hit;
                        }
                        else{
                            return this.ns_cache[this.ns_cache_cache_idx&4294967167];
                        }
                    };this.u32buf=null;this.u32bufp=null;this.attr = [];
                    this.attr_cache_hit = null;
                    this.attr_cache_idx;
                    this.get_attr = function() {
                        this.attr_cache_idx = this.u8buf[this.u8bufp++];
                        if(this.attr_cache_idx & 128){
                            this.attr_cache_hit=this.s.substring(this.sp,this.sp+=this.u8buf[this.u8bufp++]);
                            this.attr[this.attr_cache_idx&4294967167]=this.attr_cache_hit;
                            return this.attr_cache_hit;
                        }
                        else{
                            return this.attr[this.attr_cache_idx&4294967167];
                        }
                    };this.namespace = [];
                    this.namespace_cache_hit = null;
                    this.namespace_cache_idx;
                    this.get_namespace = function() {
                        this.namespace_cache_idx = this.u8buf[this.u8bufp++];
                        if(this.namespace_cache_idx & 128){
                            this.namespace_cache_hit=this.s.substring(this.sp,this.sp+=this.u8buf[this.u8bufp++]);
                            this.namespace[this.namespace_cache_idx&4294967167]=this.namespace_cache_hit;
                            return this.namespace_cache_hit;
                        }
                        else{
                            return this.namespace[this.namespace_cache_idx&4294967167];
                        }
                    };
                }

                update_memory(b){
                    this.m=new DataView(b.buffer)
                }

                run(){
                    this.metaflags=this.m.getUint32(this.d,true);
                    if((this.metaflags>>>6)&1){
                        this.ls=this.m.getUint32(this.d+6*4,true);
                    }
                    this.p=this.ls;
                    if ((this.metaflags>>>5)&1){
                this.t = this.m.getUint32(this.d+5*4,true);
                this.u8buf=new Uint8Array(this.m.buffer,this.t,((this.m.buffer.byteLength-this.t)-(this.m.buffer.byteLength-this.t)%1)/1);
            }
            this.u8bufp=0;if ((this.metaflags>>>4)&1){
                this.t = this.m.getUint32(this.d+4*4,true);
                this.u16buf=new Uint16Array(this.m.buffer,this.t,((this.m.buffer.byteLength-this.t)-(this.m.buffer.byteLength-this.t)%2)/2);
            }
            this.u16bufp=0;if (this.metaflags&1){
                this.lsp = this.m.getUint32(this.d+1*4,true);
            }
            if ((this.metaflags>>>2)&1) {
                this.sl = this.m.getUint32(this.d+2*4,true);
                if ((this.metaflags>>>1)&1) {
                    this.sp = this.lsp;
                    this.s = "";
                    this.e = this.sp + ((this.sl / 4) | 0) * 4;
                    while (this.sp < this.e) {
                        this.t = this.m.getUint32(this.sp, true);
                        this.s += String.fromCharCode(
                            this.t & 255,
                            (this.t & 65280) >> 8,
                            (this.t & 16711680) >> 16,
                            this.t >> 24
                        );
                        this.sp += 4;
                    }
                    while (this.sp < this.lsp + this.sl) {
                        this.s += String.fromCharCode(this.m.getUint8(this.sp++));
                    }
                } else {
                    let buffer = new Uint8Array(this.m.buffer, this.lsp, this.sl);
                    // If the wasm buffer is a shared array buffer, we need to copy the data out before decoding https://github.com/DioxusLabs/dioxus/issues/2589
                    // Note: We intentionally don't use instanceof here because SharedArrayBuffer can be created even when SharedArrayBuffer is not defined...
                    if (this.m.buffer.constructor.name === "SharedArrayBuffer") {
                        let arrayBuffer = new ArrayBuffer(this.sl);
                        new Uint8Array(arrayBuffer).set(buffer);
                        buffer = arrayBuffer;
                    }
                    this.s = this.c.decode(buffer);
                }
            }
            this.sp=0;if ((this.metaflags>>>3)&1){
                this.t = this.m.getUint32(this.d+3*4,true);
                this.u32buf=new Uint32Array(this.m.buffer,this.t,((this.m.buffer.byteLength-this.t)-(this.m.buffer.byteLength-this.t)%4)/4);
            }
            this.u32bufp=0;
                    for(;;){
                        this.op=this.m.getUint32(this.p,true);
                        this.p+=4;
                        this.z=0;
                        while(this.z++<4){
                            switch(this.op&255){
                                case 0:{this.appendChildren(this.root, this.stack.length-1);}break;case 1:{this.stack.push(this.nodes[this.u32buf[this.u32bufp++]]);}break;case 2:{this.appendChildren(this.u32buf[this.u32bufp++], this.u16buf[this.u16bufp++]);}break;case 3:{this.stack.pop();}break;case 4:{const root = this.nodes[this.u32buf[this.u32bufp++]]; let els = this.stack.splice(this.stack.length-this.u16buf[this.u16bufp++]); if (root.listening) { this.removeAllNonBubblingListeners(root); } root.replaceWith(...els);}break;case 5:{this.nodes[this.u32buf[this.u32bufp++]].after(...this.stack.splice(this.stack.length-this.u16buf[this.u16bufp++]));}break;case 6:{this.nodes[this.u32buf[this.u32bufp++]].before(...this.stack.splice(this.stack.length-this.u16buf[this.u16bufp++]));}break;case 7:{let node = this.nodes[this.u32buf[this.u32bufp++]]; if (node !== undefined) { if (node.listening) { this.removeAllNonBubblingListeners(node); } node.remove(); }}break;case 8:{this.stack.push(document.createTextNode(this.s.substring(this.sp,this.sp+=this.u32buf[this.u32bufp++])));}break;case 9:{let node = document.createTextNode(this.s.substring(this.sp,this.sp+=this.u32buf[this.u32bufp++])); this.nodes[this.u32buf[this.u32bufp++]] = node; this.stack.push(node);}break;case 10:{let node = document.createElement('pre'); node.hidden = true; this.stack.push(node); this.nodes[this.u32buf[this.u32bufp++]] = node;}break;case 11:id=this.u32buf[this.u32bufp++];
            let node = this.nodes[id];
            if(node.listening){node.listening += 1;}else{node.listening = 1;}
            node.setAttribute('data-dioxus-id', `${id}`);
            this.createListener(this.get_evt(), node, this.u8buf[this.u8bufp++]);
        break;case 12:{let node = this.nodes[this.u32buf[this.u32bufp++]]; node.listening -= 1; node.removeAttribute('data-dioxus-id'); this.removeListener(node, this.get_evt(), this.u8buf[this.u8bufp++]);}break;case 13:{this.nodes[this.u32buf[this.u32bufp++]].textContent = this.s.substring(this.sp,this.sp+=this.u32buf[this.u32bufp++]);}break;case 14:{let node = this.nodes[this.u32buf[this.u32bufp++]]; this.setAttributeInner(node, this.get_attr(), this.s.substring(this.sp,this.sp+=this.u32buf[this.u32bufp++]), this.get_ns_cache());}break;case 15:field=this.get_attr();ns=this.get_ns_cache();{
            let node = this.nodes[this.u32buf[this.u32bufp++]];
            if (!ns) {
                switch (field) {
                    case "value":
                        node.value = "";
                        node.removeAttribute("value");
                        break;
                    case "checked":
                        node.checked = false;
                        break;
                    case "selected":
                        node.selected = false;
                        break;
                    case "dangerous_inner_html":
                        node.innerHTML = "";
                        break;
                    default:
                        node.removeAttribute(field);
                        break;
                }
            } else if (ns == "style") {
                node.style.removeProperty(field);
            } else {
                node.removeAttributeNS(ns, field);
            }
        }break;case 16:{this.nodes[this.u32buf[this.u32bufp++]] = this.loadChild(this.u32buf[this.u32bufp++], this.u8buf[this.u8bufp++]);}break;case 17:value=this.s.substring(this.sp,this.sp+=this.u32buf[this.u32bufp++]);{
            let node = this.loadChild(this.u32buf[this.u32bufp++], this.u8buf[this.u8bufp++]);
            if (node.nodeType == node.TEXT_NODE) {
                node.textContent = value;
            } else {
                let text = document.createTextNode(value);
                node.replaceWith(text);
                node = text;
            }
            this.nodes[this.u32buf[this.u32bufp++]] = node;
        }break;case 18:{let els = this.stack.splice(this.stack.length - this.u16buf[this.u16bufp++]); let node = this.loadChild(this.u32buf[this.u32bufp++], this.u8buf[this.u8bufp++]); node.replaceWith(...els);}break;case 19:{let node = this.templates[this.u16buf[this.u16bufp++]][this.u16buf[this.u16bufp++]].cloneNode(true); this.nodes[this.u32buf[this.u32bufp++]] = node; this.stack.push(node);}break;case 20:many=this.u16buf[this.u16bufp++];{
        let root = this.stack[this.stack.length-many-1];
        let els = this.stack.splice(this.stack.length-many);
        for (let k = 0; k < many; k++) {
            root.appendChild(els[k]);
        }
        }break;case 21:{this.setAttributeInner(this.stack[this.stack.length-1], this.get_attr(), this.s.substring(this.sp,this.sp+=this.u32buf[this.u32bufp++]), this.get_ns_cache());}break;case 22:{let node = document.createElement('pre'); node.hidden = true; this.stack.push(node);}break;case 23:{this.stack.push(document.createElement(this.get_el()))}break;case 24:{this.stack.push(document.createElementNS(this.get_namespace(), this.get_el()))}break;case 25:{this.templates[this.u16buf[this.u16bufp++]] = this.stack.splice(this.stack.length-this.u16buf[this.u16bufp++]);}break;case 26:id=this.u32buf[this.u32bufp++];bubbles=this.u8buf[this.u8bufp++];
    bubbles = bubbles == 1;
    let this_node = this.nodes[id];
    if(this_node.listening){
        this_node.listening += 1;
    } else {
        this_node.listening = 1;
    }
    this_node.setAttribute('data-dioxus-id', `${id}`);
    const event_name = this.get_evt();

    // if this is a mounted listener, we send the event immediately
    if (event_name === "mounted") {
        window.ipc.postMessage(
            this.serializeIpcMessage("user_event", {
                name: event_name,
                element: id,
                data: null,
                bubbles,
            })
        );
    } else {
        this.createListener(event_name, this_node, bubbles, (event) => {
            this.handler(event, event_name, bubbles);
        });
    }break;case 27:{this.nodes[this.u32buf[this.u32bufp++]] = this.loadChild((()=>{this.e=this.u8bufp+this.u32buf[this.u32bufp++];const final_array = this.u8buf.slice(this.u8bufp,this.e);this.u8bufp=this.e;return final_array;})());}break;case 28:value=this.s.substring(this.sp,this.sp+=this.u32buf[this.u32bufp++]);{
        let node = this.loadChild((()=>{this.e=this.u8bufp+this.u32buf[this.u32bufp++];const final_array = this.u8buf.slice(this.u8bufp,this.e);this.u8bufp=this.e;return final_array;})());
        if (node.nodeType == node.TEXT_NODE) {
            node.textContent = value;
        } else {
            let text = document.createTextNode(value);
            node.replaceWith(text);
            node = text;
        }
        this.nodes[this.u32buf[this.u32bufp++]] = node;
    }break;case 29:{let els = this.stack.splice(this.stack.length - this.u16buf[this.u16bufp++]); let node = this.loadChild((()=>{this.e=this.u8bufp+this.u32buf[this.u32bufp++];const final_array = this.u8buf.slice(this.u8bufp,this.e);this.u8bufp=this.e;return final_array;})()); node.replaceWith(...els);}break;case 30:return true;
                            }
                            this.op>>>=8;
                        }
                    }
                }

                run_from_bytes(bytes){
                    this.d = 0;
                    this.update_memory(new Uint8Array(bytes))
                    this.run()
                }
            }

/***/ }),

/***/ "./src/assets/dioxus/snippets/dioxus-interpreter-js-7e2aed97ebee2c55/src/js/common.js":
/*!********************************************************************************************!*\
  !*** ./src/assets/dioxus/snippets/dioxus-interpreter-js-7e2aed97ebee2c55/src/js/common.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   retrieveFormValues: () => (/* binding */ retrieveFormValues),
/* harmony export */   setAttributeInner: () => (/* binding */ setAttributeInner)
/* harmony export */ });
function setAttributeInner(node,field,value,ns){if(ns==="style"){node.style.setProperty(field,value);return}if(ns){node.setAttributeNS(ns,field,value);return}switch(field){case"value":if(node.value!==value)node.value=value;break;case"initial_value":node.defaultValue=value;break;case"checked":node.checked=truthy(value);break;case"initial_checked":node.defaultChecked=truthy(value);break;case"selected":node.selected=truthy(value);break;case"initial_selected":node.defaultSelected=truthy(value);break;case"dangerous_inner_html":node.innerHTML=value;break;default:if(!truthy(value)&&isBoolAttr(field))node.removeAttribute(field);else node.setAttribute(field,value)}}var truthy=function(val){return val==="true"||val===!0},isBoolAttr=function(field){switch(field){case"allowfullscreen":case"allowpaymentrequest":case"async":case"autofocus":case"autoplay":case"checked":case"controls":case"default":case"defer":case"disabled":case"formnovalidate":case"hidden":case"ismap":case"itemscope":case"loop":case"multiple":case"muted":case"nomodule":case"novalidate":case"open":case"playsinline":case"readonly":case"required":case"reversed":case"selected":case"truespeed":case"webkitdirectory":return!0;default:return!1}};function retrieveFormValues(form){const formData=new FormData(form),contents={};return formData.forEach((value,key)=>{if(contents[key])contents[key].push(value);else contents[key]=[value]}),{valid:form.checkValidity(),values:contents}}


/***/ }),

/***/ "./src/assets/dioxus/snippets/dioxus-interpreter-js-7e2aed97ebee2c55/src/js/eval.js":
/*!******************************************************************************************!*\
  !*** ./src/assets/dioxus/snippets/dioxus-interpreter-js-7e2aed97ebee2c55/src/js/eval.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Channel: () => (/* binding */ Channel),
/* harmony export */   DioxusChannel: () => (/* binding */ DioxusChannel),
/* harmony export */   WeakDioxusChannel: () => (/* binding */ WeakDioxusChannel),
/* harmony export */   WebDioxusChannel: () => (/* binding */ WebDioxusChannel)
/* harmony export */ });
class Channel{pending;waiting;constructor(){this.pending=[],this.waiting=[]}send(data){if(this.waiting.length>0){this.waiting.shift()(data);return}this.pending.push(data)}async recv(){return new Promise((resolve,_reject)=>{if(this.pending.length>0){resolve(this.pending.shift());return}this.waiting.push(resolve)})}}class WeakDioxusChannel{inner;constructor(channel){this.inner=new WeakRef(channel)}rustSend(data){let channel=this.inner.deref();if(channel)channel.rustSend(data)}async rustRecv(){let channel=this.inner.deref();if(channel)return await channel.rustRecv()}}class DioxusChannel{weak(){return new WeakDioxusChannel(this)}}class WebDioxusChannel extends DioxusChannel{js_to_rust;rust_to_js;owner;constructor(owner){super();this.owner=owner,this.js_to_rust=new Channel,this.rust_to_js=new Channel}weak(){return new WeakDioxusChannel(this)}async recv(){return await this.rust_to_js.recv()}send(data){this.js_to_rust.send(data)}rustSend(data){this.rust_to_js.send(data)}async rustRecv(){return await this.js_to_rust.recv()}}


/***/ }),

/***/ "./src/assets/dioxus/snippets/dioxus-web-10186f9fcc0b4418/inline0.js":
/*!***************************************************************************!*\
  !*** ./src/assets/dioxus/snippets/dioxus-web-10186f9fcc0b4418/inline0.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   get_form_data: () => (/* binding */ get_form_data)
/* harmony export */ });

function get_form_data(form) {
    let values = new Map();
    const formData = new FormData(form);

    for (let name of formData.keys()) {
        values.set(name, formData.getAll(name));
    }

    return values;
}


/***/ }),

/***/ "./src/assets/dioxus/snippets/dioxus-web-10186f9fcc0b4418/inline1.js":
/*!***************************************************************************!*\
  !*** ./src/assets/dioxus/snippets/dioxus-web-10186f9fcc0b4418/inline1.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   get_select_data: () => (/* binding */ get_select_data)
/* harmony export */ });

function get_select_data(select) {
    let values = [];
    for (let i = 0; i < select.options.length; i++) {
      let option = select.options[i];
      if (option.selected) {
        values.push(option.value.toString());
      }
    }

    return values;
}


/***/ }),

/***/ "./src/lib.js":
/*!********************!*\
  !*** ./src/lib.js ***!
  \********************/
/***/ (() => {

window.send_message_to_bg = (action, data, callback) => {
  console.log("sending message to background...");
  // console.log("action:", action, "data:", data);
  // callback({ aaa: 111 });
  chrome.runtime.sendMessage(
    {
      action: action,
      data: data,
    },
    (response) => {
      // console.log("response from background:", response);
      callback(response);
      // updateTextNodes(allTextNodes, response);
    },
  );
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!************************!*\
  !*** ./src/content.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib.js */ "./src/lib.js");
/* harmony import */ var _lib_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _assets_dioxus_smooth_read_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/dioxus/smooth-read.js */ "./src/assets/dioxus/smooth-read.js");
console.info("/home/corbin/Development/smooth-read/dist/content.js");


const div = document.createElement("div");
div.id = "main";
document.body.appendChild(div);



const wasmUrl = chrome.runtime.getURL("smooth-read_bg.wasm");
console.log("wasmUrl=", wasmUrl);

(0,_assets_dioxus_smooth_read_js__WEBPACK_IMPORTED_MODULE_1__["default"])(wasmUrl).then((wasm) => {
  if (wasm.__wbindgen_start == undefined) {
    wasm.main();
  }
});

//--------the below is not in use-------------
function extractTextNodes(node) {
  const allNodes = [];

  function traverse(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      allNodes.push(node);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      for (let i = 0; i < node.childNodes.length; i++) {
        traverse(node.childNodes[i]);
      }
    }
  }
  traverse(node);
  return allNodes;
}

//nodes2update: {sub_dict:[{}],strange_words:[{node_index:3,sub_dict_index:2,word:"hello"}]}
//update the original text node
function updateTextNodes(allTextNodes, nodes2update) {
  const strange_words = nodes2update.strange_words;
  const sub_dict = nodes2update.sub_dict;

  //groupedStrangeWords: [{0:{sub_dict_index:2, word:"hello"}}]
  const groupedStrangeWords = strange_words.reduce((acc, cur) => {
    const groupKey = cur.node_index;
    acc[groupKey] = acc[groupKey] || []; //Create a new group if it doesn't exist
    acc[groupKey].push(cur); // Add the current word to the group
    return acc;
  }, {});
  // console.info("groupedWords:", groupedStrangeWords);

  // traverse all strange words and let them highlighted in original place.
  for (const [node_index, strangeWords] of Object.entries(
    groupedStrangeWords,
  )) {
    const wordsToTranslate = strange_words.map((w) => w.word);
    // console.info("wordsToTranslate=", wordsToTranslate);
    const originalTextNode = allTextNodes[node_index];
    let remained_originalText = originalTextNode.textContent;
    const originalWords =
      originalTextNode.textContent.match(/\b[a-zA-Z]+(?:-[A-Za-z]+)*\b/g) || [];
    originalTextNode.textContent = "";
    console.info("originalWords=", originalWords);
    for (const originalWord of originalWords) {
      if (wordsToTranslate.includes(originalWord)) {
        const splits = remained_originalText.split(originalWord);
        originalTextNode.parentNode.append(splits[0]);
        remained_originalText = splits[1];
        showTranslationWhenHovering(
          originalTextNode,
          originalWord,
          strangeWords,
          sub_dict,
        );
      }
    }
    originalTextNode.parentNode.append(remained_originalText);
  }
}

//create and attach a dropdown on hovering
function showTranslationWhenHovering(
  originalTextNode,
  originalWord,
  strangeWords,
  sub_dict,
) {
  const span = createSpanToHighlightWord(originalWord);
  originalTextNode.parentNode.append(span);
  originalTextNode.parentNode.append(" ");

  const sub_dict_index = strangeWords.find(
    (item) => item.word === originalWord,
  ).sub_dict_index;

  showTranslationWhenMouseover(span, sub_dict, sub_dict_index, originalWord);

  hideTranslationWhenMouseout(span);
}

function showTranslationWhenMouseover(
  span,
  sub_dict,
  sub_dict_index,
  originalWord,
) {
  span.addEventListener("mouseover", function highlightedWordOnMouseover() {
    span.style.backgroundColor = "#FFE0A9";
    // span.style.opacity = 0.3;
    window.translationTimerHandler = setTimeout(() => {
      // console.log("sub_dict_index=", sub_dict_index);

      //to remove the old one
      if (window.translationDropdown) {
        document.body.removeChild(window.translationDropdown);
      }
      window.translationDropdown = createDropdown(
        span,
        sub_dict[sub_dict_index],
      );
      document.body.appendChild(window.translationDropdown);

      // add on click listener to the checkbox
      var checked = document.getElementById(originalWord);
      // console.log("checked=", checked);
      checked.addEventListener("click", function () {
        // console.log("check and collect id=", this.id);

        span.onmouseover = null;
        chrome.runtime.sendMessage(
          {
            action: "mark_word_as_known",
            data: { user_id: 1, word: this.id },
          },
          (response) => {
            span.removeEventListener("mouseover", highlightedWordOnMouseover);
            span.style.color = "";
            span.style.backgroundColor = "";
            document.body.removeChild(window.translationDropdown);
            window.translationDropdown = null;
            console.log("response from background:", response);
          },
        );

        console.log("sent successfully");
      });

      // to keep the dropdown open even if mouse is moved out of the span(the highlighted word)
      window.translationDropdown.addEventListener("mouseover", () => {
        // console.log("clear timer:", window.translationTimerHandler);
        clearTimeout(window.translationTimerHandler);
      });
      window.translationDropdown.addEventListener("mouseout", () => {
        window.translationTimerHandler = setTimeout(() => {
          if (!window.translationDropdown) return;
          span.style.backgroundColor = "";
          document.body.removeChild(window.translationDropdown);
          window.translationDropdown = null;
        }, 500);

        // console.log("set timer:", window.translationTimerHandler);
      });
    }, 500);

    // console.info("set timer:", window.translationTimerHandler);
  });
}

function hideTranslationWhenMouseout(span) {
  span.addEventListener("mouseout", () => {
    span.style.backgroundColor = "";

    console.info("clear timer", window.translationTimerHandler);
    //to prevent the dropdown from closing immediately enven if mouse is over the dropdown translation
    clearTimeout(window.translationTimerHandler);
    window.translationTimerHandler = setTimeout(() => {
      if (window.translationDropdown) {
        span.style.backgroundColor = "";
        document.body.removeChild(window.translationDropdown);
        window.translationDropdown = null;
      }
    }, 500);

    // console.info("set timer:", window.translationTimerHandler);
  });
}

function createSpanToHighlightWord(originalWord) {
  const span = document.createElement("span");
  span.textContent = originalWord;
  span.classList.add("smooth-highlight"); // add a class for styling
  span.style.color = "#ff0008";
  // span.style.color = "#ff7008";

  return span;
}

function createDropdown(node2attach, content) {
  const dropdown = document.createElement("smooth-read-div");
  dropdown.classList.add("smooth-dropdown");
  dropdown.textContent = content;

  const rect = node2attach.getBoundingClientRect();
  // console.info("node2attach rec=", rect);
  let left = rect.left - rect.width * 2;
  if (left < 0) {
    left = 0;
  }

  let viewportWidth = window.innerWidth;

  console.log(`left=${left}, \t viewportWidth=${viewportWidth}`);
  if (left + rect.width * 4 > viewportWidth) {
    console.log(">>>>>>>>left=", left);
  }

  let viewportHeight = window.innerHeight;

  let top = rect.bottom + 5;

  console.log(`top=${top}, \t viewportHeight=${viewportHeight}`);
  if (top > viewportHeight - 200) {
    top = top - 5 - rect.height - 5;
  }

  dropdown.style.left = left + "px";
  dropdown.style.top = top + "px";
  dropdown.style.width = "35ch";
  dropdown.style.zIndex = "99999999999999999";
  dropdown.style.padding = "20px";
  dropdown.style.position = "fixed";
  dropdown.style.backgroundColor = "#ffffff";
  dropdown.style.borderRadius = "10px";
  dropdown.style.boxShadow = "0px 2px 5px rgba(0, 0, 0, 0.3)";

  console.log("translation:", content);
  dropdown.innerHTML = `
  <style>
    svg:hover {
        fill: #ff7008;
    }
    
  </style>
  <smooth-read-div >
    <smooth-read-div style="display: flex; flex-direction: row; flex-wrap: nowrap; align-content: center; justify-content: space-between;align-items: stretch; border-bottom: 1px solid #ccc; margin-bottom: 10px">
      <smooth-read-h3 style="margin-top: 0px;">
      <smooth-read-b style="font-weight: bold">${content["word"]}</smooth-read-b>
      </smooth-read-h3>
      <smooth-read-div id="check_collect">
        <svg id="${
          node2attach.textContent
        }" xmlns="http://www.w3.org/2000/svg" width="1.2em" fill="currentColor" viewBox="0 0 16 16">
          <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
          <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
        </svg>
        <svg id="${
          node2attach.textContent
        }" xmlns="http://www.w3.org/2000/svg" width="1.2em" fill="currentColor" class="bi bi-bookmark-heart" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"/>
          <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
        </svg>
      </smooth-read-div>
    </smooth-read-div>
    <smooth-read-p>
      <smooth-read-span style="white-space: break-spaces">UK:/${content["phonetic"]}/    US:/${content["phonetic"]}/</smooth-read-span>
    </smooth-read-p>
    <smooth-read-pre style=" white-space: pre-line; text-align: left;">
      ${content["translation"].trim()}
    </smooth-read-pre>
  </smooth-read-div>`;

  return dropdown;
}

function run() {
  const allTextNodes = extractTextNodes(document.body).filter(
    (node) => node.textContent.trim().length > 5,
  );
  const words = allTextNodes.map((node) => node.textContent);

  //request server to translate
  chrome.runtime.sendMessage(
    {
      action: "parse_text_node",
      data: { user_email: "helll@gmail.com", text_nodes: words },
    },
    (response) => {
      console.log("response from background:", response);
      updateTextNodes(allTextNodes, response);
    },
  );
}

// run();

})();

/******/ })()
;
//# sourceMappingURL=content.js.map
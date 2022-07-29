
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    const identity = x => x;
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function compute_rest_props(props, keys) {
        const rest = {};
        keys = new Set(keys);
        for (const k in props)
            if (!keys.has(k) && k[0] !== '$')
                rest[k] = props[k];
        return rest;
    }
    function compute_slots(slots) {
        const result = {};
        for (const key in slots) {
            result[key] = true;
        }
        return result;
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = { c: callback, f: fulfill });
            }),
            abort() {
                tasks.delete(task);
            }
        };
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function get_root_for_style(node) {
        if (!node)
            return document;
        const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
        if (root && root.host) {
            return root;
        }
        return node.ownerDocument;
    }
    function append_empty_stylesheet(node) {
        const style_element = element('style');
        append_stylesheet(get_root_for_style(node), style_element);
        return style_element.sheet;
    }
    function append_stylesheet(node, style) {
        append(node.head || node, style);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function set_attributes(node, attributes) {
        // @ts-ignore
        const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
        for (const key in attributes) {
            if (attributes[key] == null) {
                node.removeAttribute(key);
            }
            else if (key === 'style') {
                node.style.cssText = attributes[key];
            }
            else if (key === '__value') {
                node.value = node[key] = attributes[key];
            }
            else if (descriptors[key] && descriptors[key].set) {
                node[key] = attributes[key];
            }
            else {
                attr(node, key, attributes[key]);
            }
        }
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    // unfortunately this can't be a constant as that wouldn't be tree-shakeable
    // so we cache the result instead
    let crossorigin;
    function is_crossorigin() {
        if (crossorigin === undefined) {
            crossorigin = false;
            try {
                if (typeof window !== 'undefined' && window.parent) {
                    void window.parent.document;
                }
            }
            catch (error) {
                crossorigin = true;
            }
        }
        return crossorigin;
    }
    function add_resize_listener(node, fn) {
        const computed_style = getComputedStyle(node);
        if (computed_style.position === 'static') {
            node.style.position = 'relative';
        }
        const iframe = element('iframe');
        iframe.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; ' +
            'overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;');
        iframe.setAttribute('aria-hidden', 'true');
        iframe.tabIndex = -1;
        const crossorigin = is_crossorigin();
        let unsubscribe;
        if (crossorigin) {
            iframe.src = "data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}</script>";
            unsubscribe = listen(window, 'message', (event) => {
                if (event.source === iframe.contentWindow)
                    fn();
            });
        }
        else {
            iframe.src = 'about:blank';
            iframe.onload = () => {
                unsubscribe = listen(iframe.contentWindow, 'resize', fn);
            };
        }
        append(node, iframe);
        return () => {
            if (crossorigin) {
                unsubscribe();
            }
            else if (unsubscribe && iframe.contentWindow) {
                unsubscribe();
            }
            detach(iframe);
        };
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    // we need to store the information for multiple documents because a Svelte application could also contain iframes
    // https://github.com/sveltejs/svelte/issues/3624
    const managed_styles = new Map();
    let active = 0;
    // https://github.com/darkskyapp/string-hash/blob/master/index.js
    function hash(str) {
        let hash = 5381;
        let i = str.length;
        while (i--)
            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
        return hash >>> 0;
    }
    function create_style_information(doc, node) {
        const info = { stylesheet: append_empty_stylesheet(node), rules: {} };
        managed_styles.set(doc, info);
        return info;
    }
    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
        const step = 16.666 / duration;
        let keyframes = '{\n';
        for (let p = 0; p <= 1; p += step) {
            const t = a + (b - a) * ease(p);
            keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
        }
        const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
        const name = `__svelte_${hash(rule)}_${uid}`;
        const doc = get_root_for_style(node);
        const { stylesheet, rules } = managed_styles.get(doc) || create_style_information(doc, node);
        if (!rules[name]) {
            rules[name] = true;
            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
        }
        const animation = node.style.animation || '';
        node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        const previous = (node.style.animation || '').split(', ');
        const next = previous.filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        );
        const deleted = previous.length - next.length;
        if (deleted) {
            node.style.animation = next.join(', ');
            active -= deleted;
            if (!active)
                clear_rules();
        }
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            managed_styles.forEach(info => {
                const { stylesheet } = info;
                let i = stylesheet.cssRules.length;
                while (i--)
                    stylesheet.deleteRule(i);
                info.rules = {};
            });
            managed_styles.clear();
        });
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function beforeUpdate(fn) {
        get_current_component().$$.before_update.push(fn);
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function afterUpdate(fn) {
        get_current_component().$$.after_update.push(fn);
    }
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
    }
    function setContext(key, context) {
        get_current_component().$$.context.set(key, context);
    }
    function getContext(key) {
        return get_current_component().$$.context.get(key);
    }
    function getAllContexts() {
        return get_current_component().$$.context;
    }
    function hasContext(key) {
        return get_current_component().$$.context.has(key);
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            // @ts-ignore
            callbacks.slice().forEach(fn => fn.call(this, event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function tick() {
        schedule_update();
        return resolved_promise;
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }

    let promise;
    function wait() {
        if (!promise) {
            promise = Promise.resolve();
            promise.then(() => {
                promise = null;
            });
        }
        return promise;
    }
    function dispatch(node, direction, kind) {
        node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    const null_transition = { duration: 0 };
    function create_in_transition(node, fn, params) {
        let config = fn(node, params);
        let running = false;
        let animation_name;
        let task;
        let uid = 0;
        function cleanup() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
            tick(0, 1);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            if (task)
                task.abort();
            running = true;
            add_render_callback(() => dispatch(node, true, 'start'));
            task = loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(1, 0);
                        dispatch(node, true, 'end');
                        cleanup();
                        return running = false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(t, 1 - t);
                    }
                }
                return running;
            });
        }
        let started = false;
        return {
            start() {
                if (started)
                    return;
                started = true;
                delete_rule(node);
                if (is_function(config)) {
                    config = config();
                    wait().then(go);
                }
                else {
                    go();
                }
            },
            invalidate() {
                started = false;
            },
            end() {
                if (running) {
                    cleanup();
                    running = false;
                }
            }
        };
    }
    function create_out_transition(node, fn, params) {
        let config = fn(node, params);
        let running = true;
        let animation_name;
        const group = outros;
        group.r += 1;
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 1, 0, duration, delay, easing, css);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            add_render_callback(() => dispatch(node, false, 'start'));
            loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(0, 1);
                        dispatch(node, false, 'end');
                        if (!--group.r) {
                            // this will result in `end()` being called,
                            // so we don't need to clean up here
                            run_all(group.c);
                        }
                        return false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(1 - t, t);
                    }
                }
                return running;
            });
        }
        if (is_function(config)) {
            wait().then(() => {
                // @ts-ignore
                config = config();
                go();
            });
        }
        else {
            go();
        }
        return {
            end(reset) {
                if (reset && config.tick) {
                    config.tick(1, 0);
                }
                if (running) {
                    if (animation_name)
                        delete_rule(node, animation_name);
                    running = false;
                }
            }
        };
    }
    function create_bidirectional_transition(node, fn, params, intro) {
        let config = fn(node, params);
        let t = intro ? 0 : 1;
        let running_program = null;
        let pending_program = null;
        let animation_name = null;
        function clear_animation() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function init(program, duration) {
            const d = (program.b - t);
            duration *= Math.abs(d);
            return {
                a: t,
                b: program.b,
                d,
                duration,
                start: program.start,
                end: program.start + duration,
                group: program.group
            };
        }
        function go(b) {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            const program = {
                start: now() + delay,
                b
            };
            if (!b) {
                // @ts-ignore todo: improve typings
                program.group = outros;
                outros.r += 1;
            }
            if (running_program || pending_program) {
                pending_program = program;
            }
            else {
                // if this is an intro, and there's a delay, we need to do
                // an initial tick and/or apply CSS animation immediately
                if (css) {
                    clear_animation();
                    animation_name = create_rule(node, t, b, duration, delay, easing, css);
                }
                if (b)
                    tick(0, 1);
                running_program = init(program, duration);
                add_render_callback(() => dispatch(node, b, 'start'));
                loop(now => {
                    if (pending_program && now > pending_program.start) {
                        running_program = init(pending_program, duration);
                        pending_program = null;
                        dispatch(node, running_program.b, 'start');
                        if (css) {
                            clear_animation();
                            animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                        }
                    }
                    if (running_program) {
                        if (now >= running_program.end) {
                            tick(t = running_program.b, 1 - t);
                            dispatch(node, running_program.b, 'end');
                            if (!pending_program) {
                                // we're done
                                if (running_program.b) {
                                    // intro — we can tidy up immediately
                                    clear_animation();
                                }
                                else {
                                    // outro — needs to be coordinated
                                    if (!--running_program.group.r)
                                        run_all(running_program.group.c);
                                }
                            }
                            running_program = null;
                        }
                        else if (now >= running_program.start) {
                            const p = now - running_program.start;
                            t = running_program.a + running_program.d * easing(p / running_program.duration);
                            tick(t, 1 - t);
                        }
                    }
                    return !!(running_program || pending_program);
                });
            }
        }
        return {
            run(b) {
                if (is_function(config)) {
                    wait().then(() => {
                        // @ts-ignore
                        config = config();
                        go(b);
                    });
                }
                else {
                    go(b);
                }
            },
            end() {
                clear_animation();
                running_program = pending_program = null;
            }
        };
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }

    function bind$1(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.47.0' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }
    /**
     * Base class to create strongly typed Svelte components.
     * This only exists for typing purposes and should be used in `.d.ts` files.
     *
     * ### Example:
     *
     * You have component library on npm called `component-library`, from which
     * you export a component called `MyComponent`. For Svelte+TypeScript users,
     * you want to provide typings. Therefore you create a `index.d.ts`:
     * ```ts
     * import { SvelteComponentTyped } from "svelte";
     * export class MyComponent extends SvelteComponentTyped<{foo: string}> {}
     * ```
     * Typing this makes it possible for IDEs like VS Code with the Svelte extension
     * to provide intellisense and to use the component like this in a Svelte file
     * with TypeScript:
     * ```svelte
     * <script lang="ts">
     * 	import { MyComponent } from "component-library";
     * </script>
     * <MyComponent foo={'bar'} />
     * ```
     *
     * #### Why not make this part of `SvelteComponent(Dev)`?
     * Because
     * ```ts
     * class ASubclassOfSvelteComponent extends SvelteComponent<{foo: string}> {}
     * const component: typeof SvelteComponent = ASubclassOfSvelteComponent;
     * ```
     * will throw a type error, so we need to separate the more strictly typed class.
     */
    class SvelteComponentTyped extends SvelteComponentDev {
        constructor(options) {
            super(options);
        }
    }

    /* src\components\icons\Amazonaws.svelte generated by Svelte v3.47.0 */

    const file$17 = "src\\components\\icons\\Amazonaws.svelte";

    function create_fragment$19(ctx) {
    	let svg;
    	let title_1;
    	let t;
    	let path;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[2]);
    			path = svg_element("path");
    			add_location(title_1, file$17, 13, 2, 242);
    			attr_dev(path, "d", "M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167zM21.698 16.207c-2.626 1.94-6.442 2.969-9.722 2.969-4.598 0-8.74-1.7-11.87-4.526-.247-.223-.024-.527.272-.351 3.384 1.963 7.559 3.153 11.877 3.153 2.914 0 6.114-.607 9.06-1.852.439-.2.814.287.383.607zM22.792 14.961c-.336-.43-2.22-.207-3.074-.103-.255.032-.295-.192-.063-.36 1.5-1.053 3.967-.75 4.254-.399.287.36-.08 2.826-1.485 4.007-.215.184-.423.088-.327-.151.32-.79 1.03-2.57.695-2.994z");
    			add_location(path, file$17, 14, 2, 268);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "width", /*size*/ ctx[1]);
    			attr_dev(svg, "height", /*size*/ ctx[1]);
    			attr_dev(svg, "fill", /*color*/ ctx[0]);
    			attr_dev(svg, "viewBox", "0 0 24 24");
    			add_location(svg, file$17, 6, 0, 121);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, title_1);
    			append_dev(title_1, t);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*title*/ 4) set_data_dev(t, /*title*/ ctx[2]);

    			if (dirty & /*size*/ 2) {
    				attr_dev(svg, "width", /*size*/ ctx[1]);
    			}

    			if (dirty & /*size*/ 2) {
    				attr_dev(svg, "height", /*size*/ ctx[1]);
    			}

    			if (dirty & /*color*/ 1) {
    				attr_dev(svg, "fill", /*color*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$19.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$19($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Amazonaws', slots, []);
    	let { color = "currentColor" } = $$props;
    	let { size = 24 } = $$props;
    	let { title = "amazonaws" } = $$props;
    	const writable_props = ['color', 'size', 'title'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Amazonaws> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    	};

    	$$self.$capture_state = () => ({ color, size, title });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color, size, title];
    }

    class Amazonaws extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$19, create_fragment$19, safe_not_equal, { color: 0, size: 1, title: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Amazonaws",
    			options,
    			id: create_fragment$19.name
    		});
    	}

    	get color() {
    		throw new Error("<Amazonaws>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Amazonaws>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Amazonaws>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Amazonaws>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<Amazonaws>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Amazonaws>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\icons\ConstructThree.svelte generated by Svelte v3.47.0 */

    const file$16 = "src\\components\\icons\\ConstructThree.svelte";

    function create_fragment$18(ctx) {
    	let svg;
    	let title_1;
    	let t;
    	let path;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[2]);
    			path = svg_element("path");
    			add_location(title_1, file$16, 13, 2, 243);
    			attr_dev(path, "d", "M12.392 0c-6.752 0-12 5.498-12 12 0 6.574 5.313 12 12 12 4.283 0 8.087-2.254 10.217-5.704a.571.571 0 0 0-.2-.795l-5.55-3.204a.572.572 0 0 0-.76.177 4.453 4.453 0 0 1-3.707 1.983c-2.458 0-4.458-2-4.458-4.457 0-2.458 2-4.457 4.458-4.457 1.491 0 2.877.741 3.707 1.983a.571.571 0 0 0 .76.177l5.55-3.204a.571.571 0 0 0 .2-.795A11.998 11.998 0 0 0 12.392 0zm0 3.527c3.048 0 5.72 1.61 7.213 4.026l-2.99 1.726c-.037.021-.085.013-.108-.026a4.942 4.942 0 0 0-4.115-2.2A4.953 4.953 0 0 0 7.445 12c0 .9.241 1.745.663 2.473l-2.342 1.353a.327.327 0 0 0-.112.458 7.977 7.977 0 0 0 6.738 3.7 7.978 7.978 0 0 0 6.789-3.781l2.983 1.722a.08.08 0 0 1 .028.113 11.447 11.447 0 0 1-9.8 5.472C6.045 23.51.882 18.346.882 12c0-2.095.562-4.06 1.544-5.754l2.35 1.356c.15.088.345.04.439-.11a8.467 8.467 0 0 1 7.177-3.966zM22.965 8.95a.666.666 0 0 0-.336.088l-4.149 2.395a.654.654 0 0 0 0 1.131l4.149 2.396c.434.25.98-.064.98-.566v-4.79a.655.655 0 0 0-.644-.654zm-.663 1.785v2.528L20.112 12z");
    			add_location(path, file$16, 14, 2, 269);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "width", /*size*/ ctx[1]);
    			attr_dev(svg, "height", /*size*/ ctx[1]);
    			attr_dev(svg, "fill", /*color*/ ctx[0]);
    			attr_dev(svg, "viewBox", "0 0 24 24");
    			add_location(svg, file$16, 6, 0, 122);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, title_1);
    			append_dev(title_1, t);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*title*/ 4) set_data_dev(t, /*title*/ ctx[2]);

    			if (dirty & /*size*/ 2) {
    				attr_dev(svg, "width", /*size*/ ctx[1]);
    			}

    			if (dirty & /*size*/ 2) {
    				attr_dev(svg, "height", /*size*/ ctx[1]);
    			}

    			if (dirty & /*color*/ 1) {
    				attr_dev(svg, "fill", /*color*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$18.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$18($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ConstructThree', slots, []);
    	let { color = "currentColor" } = $$props;
    	let { size = 24 } = $$props;
    	let { title = "construct3" } = $$props;
    	const writable_props = ['color', 'size', 'title'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ConstructThree> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    	};

    	$$self.$capture_state = () => ({ color, size, title });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color, size, title];
    }

    class ConstructThree extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$18, create_fragment$18, safe_not_equal, { color: 0, size: 1, title: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ConstructThree",
    			options,
    			id: create_fragment$18.name
    		});
    	}

    	get color() {
    		throw new Error("<ConstructThree>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<ConstructThree>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<ConstructThree>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<ConstructThree>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<ConstructThree>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<ConstructThree>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\icons\CssThree.svelte generated by Svelte v3.47.0 */

    const file$15 = "src\\components\\icons\\CssThree.svelte";

    function create_fragment$17(ctx) {
    	let svg;
    	let title_1;
    	let t;
    	let path;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[2]);
    			path = svg_element("path");
    			add_location(title_1, file$15, 13, 2, 237);
    			attr_dev(path, "d", "M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z");
    			add_location(path, file$15, 14, 2, 263);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "width", /*size*/ ctx[1]);
    			attr_dev(svg, "height", /*size*/ ctx[1]);
    			attr_dev(svg, "fill", /*color*/ ctx[0]);
    			attr_dev(svg, "viewBox", "0 0 24 24");
    			add_location(svg, file$15, 6, 0, 116);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, title_1);
    			append_dev(title_1, t);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*title*/ 4) set_data_dev(t, /*title*/ ctx[2]);

    			if (dirty & /*size*/ 2) {
    				attr_dev(svg, "width", /*size*/ ctx[1]);
    			}

    			if (dirty & /*size*/ 2) {
    				attr_dev(svg, "height", /*size*/ ctx[1]);
    			}

    			if (dirty & /*color*/ 1) {
    				attr_dev(svg, "fill", /*color*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$17.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$17($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('CssThree', slots, []);
    	let { color = "currentColor" } = $$props;
    	let { size = 24 } = $$props;
    	let { title = "css3" } = $$props;
    	const writable_props = ['color', 'size', 'title'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CssThree> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    	};

    	$$self.$capture_state = () => ({ color, size, title });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color, size, title];
    }

    class CssThree extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$17, create_fragment$17, safe_not_equal, { color: 0, size: 1, title: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CssThree",
    			options,
    			id: create_fragment$17.name
    		});
    	}

    	get color() {
    		throw new Error("<CssThree>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<CssThree>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<CssThree>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<CssThree>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<CssThree>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<CssThree>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\icons\Express.svelte generated by Svelte v3.47.0 */

    const file$14 = "src\\components\\icons\\Express.svelte";

    function create_fragment$16(ctx) {
    	let svg;
    	let title_1;
    	let t;
    	let path;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[2]);
    			path = svg_element("path");
    			add_location(title_1, file$14, 13, 2, 240);
    			attr_dev(path, "d", "M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 01-2.589 3.957 6.272 6.272 0 01-7.306-.933 6.575 6.575 0 01-1.64-3.858c0-.235-.08-.455-.134-.666A88.33 88.33 0 010 11.577zm1.127-.286h9.654c-.06-3.076-2.001-5.258-4.59-5.278-2.882-.04-4.944 2.094-5.071 5.264z");
    			add_location(path, file$14, 14, 2, 266);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "width", /*size*/ ctx[1]);
    			attr_dev(svg, "height", /*size*/ ctx[1]);
    			attr_dev(svg, "fill", /*color*/ ctx[0]);
    			attr_dev(svg, "viewBox", "0 0 24 24");
    			add_location(svg, file$14, 6, 0, 119);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, title_1);
    			append_dev(title_1, t);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*title*/ 4) set_data_dev(t, /*title*/ ctx[2]);

    			if (dirty & /*size*/ 2) {
    				attr_dev(svg, "width", /*size*/ ctx[1]);
    			}

    			if (dirty & /*size*/ 2) {
    				attr_dev(svg, "height", /*size*/ ctx[1]);
    			}

    			if (dirty & /*color*/ 1) {
    				attr_dev(svg, "fill", /*color*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$16.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$16($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Express', slots, []);
    	let { color = "currentColor" } = $$props;
    	let { size = 24 } = $$props;
    	let { title = "express" } = $$props;
    	const writable_props = ['color', 'size', 'title'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Express> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    	};

    	$$self.$capture_state = () => ({ color, size, title });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color, size, title];
    }

    class Express extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$16, create_fragment$16, safe_not_equal, { color: 0, size: 1, title: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Express",
    			options,
    			id: create_fragment$16.name
    		});
    	}

    	get color() {
    		throw new Error("<Express>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Express>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Express>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Express>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<Express>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Express>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\icons\Git.svelte generated by Svelte v3.47.0 */

    const file$13 = "src\\components\\icons\\Git.svelte";

    function create_fragment$15(ctx) {
    	let svg;
    	let title_1;
    	let t;
    	let path;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[2]);
    			path = svg_element("path");
    			add_location(title_1, file$13, 13, 2, 236);
    			attr_dev(path, "d", "M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187");
    			add_location(path, file$13, 14, 2, 262);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "width", /*size*/ ctx[1]);
    			attr_dev(svg, "height", /*size*/ ctx[1]);
    			attr_dev(svg, "fill", /*color*/ ctx[0]);
    			attr_dev(svg, "viewBox", "0 0 24 24");
    			add_location(svg, file$13, 6, 0, 115);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, title_1);
    			append_dev(title_1, t);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*title*/ 4) set_data_dev(t, /*title*/ ctx[2]);

    			if (dirty & /*size*/ 2) {
    				attr_dev(svg, "width", /*size*/ ctx[1]);
    			}

    			if (dirty & /*size*/ 2) {
    				attr_dev(svg, "height", /*size*/ ctx[1]);
    			}

    			if (dirty & /*color*/ 1) {
    				attr_dev(svg, "fill", /*color*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$15.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$15($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Git', slots, []);
    	let { color = "currentColor" } = $$props;
    	let { size = 24 } = $$props;
    	let { title = "git" } = $$props;
    	const writable_props = ['color', 'size', 'title'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Git> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    	};

    	$$self.$capture_state = () => ({ color, size, title });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color, size, title];
    }

    class Git extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$15, create_fragment$15, safe_not_equal, { color: 0, size: 1, title: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Git",
    			options,
    			id: create_fragment$15.name
    		});
    	}

    	get color() {
    		throw new Error("<Git>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Git>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Git>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Git>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<Git>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Git>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\icons\Html5.svelte generated by Svelte v3.47.0 */

    const file$12 = "src\\components\\icons\\Html5.svelte";

    function create_fragment$14(ctx) {
    	let svg;
    	let title_1;
    	let t;
    	let path;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[2]);
    			path = svg_element("path");
    			add_location(title_1, file$12, 13, 2, 238);
    			attr_dev(path, "d", "M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z");
    			add_location(path, file$12, 14, 2, 264);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "width", /*size*/ ctx[1]);
    			attr_dev(svg, "height", /*size*/ ctx[1]);
    			attr_dev(svg, "fill", /*color*/ ctx[0]);
    			attr_dev(svg, "viewBox", "0 0 24 24");
    			add_location(svg, file$12, 6, 0, 117);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, title_1);
    			append_dev(title_1, t);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*title*/ 4) set_data_dev(t, /*title*/ ctx[2]);

    			if (dirty & /*size*/ 2) {
    				attr_dev(svg, "width", /*size*/ ctx[1]);
    			}

    			if (dirty & /*size*/ 2) {
    				attr_dev(svg, "height", /*size*/ ctx[1]);
    			}

    			if (dirty & /*color*/ 1) {
    				attr_dev(svg, "fill", /*color*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$14.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$14($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Html5', slots, []);
    	let { color = "currentColor" } = $$props;
    	let { size = 24 } = $$props;
    	let { title = "html5" } = $$props;
    	const writable_props = ['color', 'size', 'title'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Html5> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    	};

    	$$self.$capture_state = () => ({ color, size, title });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color, size, title];
    }

    class Html5 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$14, create_fragment$14, safe_not_equal, { color: 0, size: 1, title: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Html5",
    			options,
    			id: create_fragment$14.name
    		});
    	}

    	get color() {
    		throw new Error("<Html5>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Html5>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Html5>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Html5>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<Html5>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Html5>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\icons\Javascript.svelte generated by Svelte v3.47.0 */

    const file$11 = "src\\components\\icons\\Javascript.svelte";

    function create_fragment$13(ctx) {
    	let svg;
    	let title_1;
    	let t;
    	let path;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[2]);
    			path = svg_element("path");
    			add_location(title_1, file$11, 13, 2, 243);
    			attr_dev(path, "d", "M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z");
    			add_location(path, file$11, 14, 2, 269);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "width", /*size*/ ctx[1]);
    			attr_dev(svg, "height", /*size*/ ctx[1]);
    			attr_dev(svg, "fill", /*color*/ ctx[0]);
    			attr_dev(svg, "viewBox", "0 0 24 24");
    			add_location(svg, file$11, 6, 0, 122);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, title_1);
    			append_dev(title_1, t);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*title*/ 4) set_data_dev(t, /*title*/ ctx[2]);

    			if (dirty & /*size*/ 2) {
    				attr_dev(svg, "width", /*size*/ ctx[1]);
    			}

    			if (dirty & /*size*/ 2) {
    				attr_dev(svg, "height", /*size*/ ctx[1]);
    			}

    			if (dirty & /*color*/ 1) {
    				attr_dev(svg, "fill", /*color*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$13.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$13($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Javascript', slots, []);
    	let { color = "currentColor" } = $$props;
    	let { size = 24 } = $$props;
    	let { title = "javascript" } = $$props;
    	const writable_props = ['color', 'size', 'title'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Javascript> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    	};

    	$$self.$capture_state = () => ({ color, size, title });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color, size, title];
    }

    class Javascript extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$13, create_fragment$13, safe_not_equal, { color: 0, size: 1, title: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Javascript",
    			options,
    			id: create_fragment$13.name
    		});
    	}

    	get color() {
    		throw new Error("<Javascript>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Javascript>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Javascript>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Javascript>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<Javascript>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Javascript>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\icons\Mongodb.svelte generated by Svelte v3.47.0 */

    const file$10 = "src\\components\\icons\\Mongodb.svelte";

    function create_fragment$12(ctx) {
    	let svg;
    	let title_1;
    	let t;
    	let path;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[2]);
    			path = svg_element("path");
    			add_location(title_1, file$10, 13, 2, 240);
    			attr_dev(path, "d", "M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z");
    			add_location(path, file$10, 14, 2, 266);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "width", /*size*/ ctx[1]);
    			attr_dev(svg, "height", /*size*/ ctx[1]);
    			attr_dev(svg, "fill", /*color*/ ctx[0]);
    			attr_dev(svg, "viewBox", "0 0 24 24");
    			add_location(svg, file$10, 6, 0, 119);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, title_1);
    			append_dev(title_1, t);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*title*/ 4) set_data_dev(t, /*title*/ ctx[2]);

    			if (dirty & /*size*/ 2) {
    				attr_dev(svg, "width", /*size*/ ctx[1]);
    			}

    			if (dirty & /*size*/ 2) {
    				attr_dev(svg, "height", /*size*/ ctx[1]);
    			}

    			if (dirty & /*color*/ 1) {
    				attr_dev(svg, "fill", /*color*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$12.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$12($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Mongodb', slots, []);
    	let { color = "currentColor" } = $$props;
    	let { size = 24 } = $$props;
    	let { title = "mongodb" } = $$props;
    	const writable_props = ['color', 'size', 'title'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Mongodb> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    	};

    	$$self.$capture_state = () => ({ color, size, title });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color, size, title];
    }

    class Mongodb extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$12, create_fragment$12, safe_not_equal, { color: 0, size: 1, title: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Mongodb",
    			options,
    			id: create_fragment$12.name
    		});
    	}

    	get color() {
    		throw new Error("<Mongodb>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Mongodb>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Mongodb>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Mongodb>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<Mongodb>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Mongodb>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\icons\Nodedotjs.svelte generated by Svelte v3.47.0 */

    const file$$ = "src\\components\\icons\\Nodedotjs.svelte";

    function create_fragment$11(ctx) {
    	let svg;
    	let title_1;
    	let t;
    	let path;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[2]);
    			path = svg_element("path");
    			add_location(title_1, file$$, 13, 2, 242);
    			attr_dev(path, "d", "M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z");
    			add_location(path, file$$, 14, 2, 268);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "width", /*size*/ ctx[1]);
    			attr_dev(svg, "height", /*size*/ ctx[1]);
    			attr_dev(svg, "fill", /*color*/ ctx[0]);
    			attr_dev(svg, "viewBox", "0 0 24 24");
    			add_location(svg, file$$, 6, 0, 121);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, title_1);
    			append_dev(title_1, t);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*title*/ 4) set_data_dev(t, /*title*/ ctx[2]);

    			if (dirty & /*size*/ 2) {
    				attr_dev(svg, "width", /*size*/ ctx[1]);
    			}

    			if (dirty & /*size*/ 2) {
    				attr_dev(svg, "height", /*size*/ ctx[1]);
    			}

    			if (dirty & /*color*/ 1) {
    				attr_dev(svg, "fill", /*color*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$11.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$11($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Nodedotjs', slots, []);
    	let { color = "currentColor" } = $$props;
    	let { size = 24 } = $$props;
    	let { title = "nodedotjs" } = $$props;
    	const writable_props = ['color', 'size', 'title'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Nodedotjs> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    	};

    	$$self.$capture_state = () => ({ color, size, title });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color, size, title];
    }

    class Nodedotjs extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$11, create_fragment$11, safe_not_equal, { color: 0, size: 1, title: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Nodedotjs",
    			options,
    			id: create_fragment$11.name
    		});
    	}

    	get color() {
    		throw new Error("<Nodedotjs>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Nodedotjs>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Nodedotjs>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Nodedotjs>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<Nodedotjs>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Nodedotjs>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\icons\Notion.svelte generated by Svelte v3.47.0 */

    const file$_ = "src\\components\\icons\\Notion.svelte";

    function create_fragment$10(ctx) {
    	let svg;
    	let title_1;
    	let t;
    	let path;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[2]);
    			path = svg_element("path");
    			add_location(title_1, file$_, 13, 2, 239);
    			attr_dev(path, "d", "M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z");
    			add_location(path, file$_, 14, 2, 265);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "width", /*size*/ ctx[1]);
    			attr_dev(svg, "height", /*size*/ ctx[1]);
    			attr_dev(svg, "fill", /*color*/ ctx[0]);
    			attr_dev(svg, "viewBox", "0 0 24 24");
    			add_location(svg, file$_, 6, 0, 118);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, title_1);
    			append_dev(title_1, t);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*title*/ 4) set_data_dev(t, /*title*/ ctx[2]);

    			if (dirty & /*size*/ 2) {
    				attr_dev(svg, "width", /*size*/ ctx[1]);
    			}

    			if (dirty & /*size*/ 2) {
    				attr_dev(svg, "height", /*size*/ ctx[1]);
    			}

    			if (dirty & /*color*/ 1) {
    				attr_dev(svg, "fill", /*color*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$10.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$10($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Notion', slots, []);
    	let { color = "currentColor" } = $$props;
    	let { size = 24 } = $$props;
    	let { title = "notion" } = $$props;
    	const writable_props = ['color', 'size', 'title'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Notion> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    	};

    	$$self.$capture_state = () => ({ color, size, title });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color, size, title];
    }

    class Notion extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$10, create_fragment$10, safe_not_equal, { color: 0, size: 1, title: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Notion",
    			options,
    			id: create_fragment$10.name
    		});
    	}

    	get color() {
    		throw new Error("<Notion>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Notion>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Notion>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Notion>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<Notion>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Notion>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\icons\React.svelte generated by Svelte v3.47.0 */

    const file$Z = "src\\components\\icons\\React.svelte";

    function create_fragment$$(ctx) {
    	let svg;
    	let title_1;
    	let t;
    	let path;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[2]);
    			path = svg_element("path");
    			add_location(title_1, file$Z, 13, 2, 238);
    			attr_dev(path, "d", "M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z");
    			add_location(path, file$Z, 14, 2, 264);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "width", /*size*/ ctx[1]);
    			attr_dev(svg, "height", /*size*/ ctx[1]);
    			attr_dev(svg, "fill", /*color*/ ctx[0]);
    			attr_dev(svg, "viewBox", "0 0 24 24");
    			add_location(svg, file$Z, 6, 0, 117);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, title_1);
    			append_dev(title_1, t);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*title*/ 4) set_data_dev(t, /*title*/ ctx[2]);

    			if (dirty & /*size*/ 2) {
    				attr_dev(svg, "width", /*size*/ ctx[1]);
    			}

    			if (dirty & /*size*/ 2) {
    				attr_dev(svg, "height", /*size*/ ctx[1]);
    			}

    			if (dirty & /*color*/ 1) {
    				attr_dev(svg, "fill", /*color*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$$.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$$($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('React', slots, []);
    	let { color = "currentColor" } = $$props;
    	let { size = 24 } = $$props;
    	let { title = "react" } = $$props;
    	const writable_props = ['color', 'size', 'title'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<React> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    	};

    	$$self.$capture_state = () => ({ color, size, title });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color, size, title];
    }

    class React extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$$, create_fragment$$, safe_not_equal, { color: 0, size: 1, title: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "React",
    			options,
    			id: create_fragment$$.name
    		});
    	}

    	get color() {
    		throw new Error("<React>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<React>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<React>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<React>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<React>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<React>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\icons\Redux.svelte generated by Svelte v3.47.0 */

    const file$Y = "src\\components\\icons\\Redux.svelte";

    function create_fragment$_(ctx) {
    	let svg;
    	let title_1;
    	let t;
    	let path;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[2]);
    			path = svg_element("path");
    			add_location(title_1, file$Y, 13, 2, 238);
    			attr_dev(path, "d", "M16.634 16.504c.87-.075 1.543-.84 1.5-1.754-.047-.914-.796-1.648-1.709-1.648h-.061a1.71 1.71 0 00-1.648 1.769c.03.479.226.869.494 1.153-1.048 2.038-2.621 3.536-5.005 4.795-1.603.838-3.296 1.154-4.944.93-1.378-.195-2.456-.81-3.116-1.799-.988-1.499-1.078-3.116-.255-4.734.6-1.17 1.499-2.023 2.099-2.443a9.96 9.96 0 01-.42-1.543C-.868 14.408-.416 18.752.932 20.805c1.004 1.498 3.057 2.456 5.304 2.456.6 0 1.23-.044 1.843-.194 3.897-.749 6.848-3.086 8.541-6.532zm5.348-3.746c-2.32-2.728-5.738-4.226-9.634-4.226h-.51c-.253-.554-.837-.899-1.498-.899h-.045c-.943 0-1.678.81-1.647 1.753.03.898.794 1.648 1.708 1.648h.074a1.69 1.69 0 001.499-1.049h.555c2.309 0 4.495.674 6.488 1.992 1.527 1.005 2.622 2.323 3.237 3.897.538 1.288.509 2.547-.045 3.597-.855 1.647-2.294 2.517-4.196 2.517-1.199 0-2.367-.375-2.967-.644-.36.298-.96.793-1.394 1.093 1.318.598 2.652.943 3.94.943 2.922 0 5.094-1.647 5.919-3.236.898-1.798.824-4.824-1.47-7.416zM6.49 17.042c.03.899.793 1.648 1.708 1.648h.06a1.688 1.688 0 001.648-1.768c0-.9-.779-1.647-1.693-1.647h-.06c-.06 0-.15 0-.226.029-1.243-2.098-1.768-4.347-1.572-6.772.12-1.828.72-3.417 1.797-4.735.9-1.124 2.593-1.68 3.747-1.708 3.236-.061 4.585 3.971 4.689 5.574l1.498.45C17.741 3.197 14.686.62 11.764.62 9.02.62 6.49 2.613 5.47 5.535 4.077 9.43 4.991 13.177 6.7 16.174c-.15.195-.24.539-.21.868z");
    			add_location(path, file$Y, 14, 2, 264);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "width", /*size*/ ctx[1]);
    			attr_dev(svg, "height", /*size*/ ctx[1]);
    			attr_dev(svg, "fill", /*color*/ ctx[0]);
    			attr_dev(svg, "viewBox", "0 0 24 24");
    			add_location(svg, file$Y, 6, 0, 117);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, title_1);
    			append_dev(title_1, t);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*title*/ 4) set_data_dev(t, /*title*/ ctx[2]);

    			if (dirty & /*size*/ 2) {
    				attr_dev(svg, "width", /*size*/ ctx[1]);
    			}

    			if (dirty & /*size*/ 2) {
    				attr_dev(svg, "height", /*size*/ ctx[1]);
    			}

    			if (dirty & /*color*/ 1) {
    				attr_dev(svg, "fill", /*color*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$_.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$_($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Redux', slots, []);
    	let { color = "currentColor" } = $$props;
    	let { size = 24 } = $$props;
    	let { title = "redux" } = $$props;
    	const writable_props = ['color', 'size', 'title'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Redux> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    	};

    	$$self.$capture_state = () => ({ color, size, title });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color, size, title];
    }

    class Redux extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$_, create_fragment$_, safe_not_equal, { color: 0, size: 1, title: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Redux",
    			options,
    			id: create_fragment$_.name
    		});
    	}

    	get color() {
    		throw new Error("<Redux>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Redux>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Redux>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Redux>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<Redux>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Redux>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\icons\Svelte.svelte generated by Svelte v3.47.0 */

    const file$X = "src\\components\\icons\\Svelte.svelte";

    function create_fragment$Z(ctx) {
    	let svg;
    	let title_1;
    	let t;
    	let path;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[2]);
    			path = svg_element("path");
    			add_location(title_1, file$X, 13, 2, 239);
    			attr_dev(path, "d", "M10.354 21.125a4.44 4.44 0 0 1-4.765-1.767 4.109 4.109 0 0 1-.703-3.107 3.898 3.898 0 0 1 .134-.522l.105-.321.287.21a7.21 7.21 0 0 0 2.186 1.092l.208.063-.02.208a1.253 1.253 0 0 0 .226.83 1.337 1.337 0 0 0 1.435.533 1.231 1.231 0 0 0 .343-.15l5.59-3.562a1.164 1.164 0 0 0 .524-.778 1.242 1.242 0 0 0-.211-.937 1.338 1.338 0 0 0-1.435-.533 1.23 1.23 0 0 0-.343.15l-2.133 1.36a4.078 4.078 0 0 1-1.135.499 4.44 4.44 0 0 1-4.765-1.766 4.108 4.108 0 0 1-.702-3.108 3.855 3.855 0 0 1 1.742-2.582l5.589-3.563a4.072 4.072 0 0 1 1.135-.499 4.44 4.44 0 0 1 4.765 1.767 4.109 4.109 0 0 1 .703 3.107 3.943 3.943 0 0 1-.134.522l-.105.321-.286-.21a7.204 7.204 0 0 0-2.187-1.093l-.208-.063.02-.207a1.255 1.255 0 0 0-.226-.831 1.337 1.337 0 0 0-1.435-.532 1.231 1.231 0 0 0-.343.15L8.62 9.368a1.162 1.162 0 0 0-.524.778 1.24 1.24 0 0 0 .211.937 1.338 1.338 0 0 0 1.435.533 1.235 1.235 0 0 0 .344-.151l2.132-1.36a4.067 4.067 0 0 1 1.135-.498 4.44 4.44 0 0 1 4.765 1.766 4.108 4.108 0 0 1 .702 3.108 3.857 3.857 0 0 1-1.742 2.583l-5.589 3.562a4.072 4.072 0 0 1-1.135.499m10.358-17.95C18.484-.015 14.082-.96 10.9 1.068L5.31 4.63a6.412 6.412 0 0 0-2.896 4.295 6.753 6.753 0 0 0 .666 4.336 6.43 6.43 0 0 0-.96 2.396 6.833 6.833 0 0 0 1.168 5.167c2.229 3.19 6.63 4.135 9.812 2.108l5.59-3.562a6.41 6.41 0 0 0 2.896-4.295 6.756 6.756 0 0 0-.665-4.336 6.429 6.429 0 0 0 .958-2.396 6.831 6.831 0 0 0-1.167-5.168Z");
    			add_location(path, file$X, 14, 2, 265);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "width", /*size*/ ctx[1]);
    			attr_dev(svg, "height", /*size*/ ctx[1]);
    			attr_dev(svg, "fill", /*color*/ ctx[0]);
    			attr_dev(svg, "viewBox", "0 0 24 24");
    			add_location(svg, file$X, 6, 0, 118);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, title_1);
    			append_dev(title_1, t);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*title*/ 4) set_data_dev(t, /*title*/ ctx[2]);

    			if (dirty & /*size*/ 2) {
    				attr_dev(svg, "width", /*size*/ ctx[1]);
    			}

    			if (dirty & /*size*/ 2) {
    				attr_dev(svg, "height", /*size*/ ctx[1]);
    			}

    			if (dirty & /*color*/ 1) {
    				attr_dev(svg, "fill", /*color*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$Z.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$Z($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Svelte', slots, []);
    	let { color = "currentColor" } = $$props;
    	let { size = 24 } = $$props;
    	let { title = "svelte" } = $$props;
    	const writable_props = ['color', 'size', 'title'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Svelte> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    	};

    	$$self.$capture_state = () => ({ color, size, title });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color, size, title];
    }

    class Svelte extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$Z, create_fragment$Z, safe_not_equal, { color: 0, size: 1, title: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Svelte",
    			options,
    			id: create_fragment$Z.name
    		});
    	}

    	get color() {
    		throw new Error("<Svelte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Svelte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Svelte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Svelte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<Svelte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Svelte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\icons\Email.svelte generated by Svelte v3.47.0 */

    const file$W = "src\\components\\icons\\Email.svelte";

    function create_fragment$Y(ctx) {
    	let svg;
    	let title_1;
    	let t;
    	let path;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[2]);
    			path = svg_element("path");
    			add_location(title_1, file$W, 8, 4, 235);
    			attr_dev(path, "d", "M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z");
    			add_location(path, file$W, 9, 4, 263);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "width", /*size*/ ctx[1]);
    			attr_dev(svg, "height", /*size*/ ctx[1]);
    			attr_dev(svg, "fill", /*color*/ ctx[0]);
    			attr_dev(svg, "viewBox", "0 0 24 24");
    			add_location(svg, file$W, 7, 2, 129);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, title_1);
    			append_dev(title_1, t);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*title*/ 4) set_data_dev(t, /*title*/ ctx[2]);

    			if (dirty & /*size*/ 2) {
    				attr_dev(svg, "width", /*size*/ ctx[1]);
    			}

    			if (dirty & /*size*/ 2) {
    				attr_dev(svg, "height", /*size*/ ctx[1]);
    			}

    			if (dirty & /*color*/ 1) {
    				attr_dev(svg, "fill", /*color*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$Y.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$Y($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Email', slots, []);
    	let { color = 'currentColor' } = $$props;
    	let { size = 24 } = $$props;
    	let { title = "email" } = $$props;
    	const writable_props = ['color', 'size', 'title'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Email> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    	};

    	$$self.$capture_state = () => ({ color, size, title });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color, size, title];
    }

    class Email extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$Y, create_fragment$Y, safe_not_equal, { color: 0, size: 1, title: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Email",
    			options,
    			id: create_fragment$Y.name
    		});
    	}

    	get color() {
    		throw new Error("<Email>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Email>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Email>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Email>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<Email>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Email>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\icons\Linkedin.svelte generated by Svelte v3.47.0 */

    const file$V = "src\\components\\icons\\Linkedin.svelte";

    function create_fragment$X(ctx) {
    	let svg;
    	let title_1;
    	let t;
    	let path;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[2]);
    			path = svg_element("path");
    			add_location(title_1, file$V, 8, 6, 254);
    			attr_dev(path, "d", "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z");
    			add_location(path, file$V, 9, 6, 284);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "width", /*size*/ ctx[1]);
    			attr_dev(svg, "height", /*size*/ ctx[1]);
    			attr_dev(svg, "fill", /*color*/ ctx[0]);
    			attr_dev(svg, "viewBox", "0 0 24 24");
    			add_location(svg, file$V, 7, 4, 146);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, title_1);
    			append_dev(title_1, t);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*title*/ 4) set_data_dev(t, /*title*/ ctx[2]);

    			if (dirty & /*size*/ 2) {
    				attr_dev(svg, "width", /*size*/ ctx[1]);
    			}

    			if (dirty & /*size*/ 2) {
    				attr_dev(svg, "height", /*size*/ ctx[1]);
    			}

    			if (dirty & /*color*/ 1) {
    				attr_dev(svg, "fill", /*color*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$X.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$X($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Linkedin', slots, []);
    	let { color = 'currentColor' } = $$props;
    	let { size = 24 } = $$props;
    	let { title = "linkedin" } = $$props;
    	const writable_props = ['color', 'size', 'title'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Linkedin> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    	};

    	$$self.$capture_state = () => ({ color, size, title });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color, size, title];
    }

    class Linkedin extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$X, create_fragment$X, safe_not_equal, { color: 0, size: 1, title: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Linkedin",
    			options,
    			id: create_fragment$X.name
    		});
    	}

    	get color() {
    		throw new Error("<Linkedin>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Linkedin>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Linkedin>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Linkedin>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<Linkedin>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Linkedin>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\icons\Github.svelte generated by Svelte v3.47.0 */

    const file$U = "src\\components\\icons\\Github.svelte";

    function create_fragment$W(ctx) {
    	let svg;
    	let title_1;
    	let t;
    	let path;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[2]);
    			path = svg_element("path");
    			add_location(title_1, file$U, 8, 6, 252);
    			attr_dev(path, "d", "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12");
    			add_location(path, file$U, 9, 6, 282);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "width", /*size*/ ctx[1]);
    			attr_dev(svg, "height", /*size*/ ctx[1]);
    			attr_dev(svg, "fill", /*color*/ ctx[0]);
    			attr_dev(svg, "viewBox", "0 0 24 24");
    			add_location(svg, file$U, 7, 4, 144);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, title_1);
    			append_dev(title_1, t);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*title*/ 4) set_data_dev(t, /*title*/ ctx[2]);

    			if (dirty & /*size*/ 2) {
    				attr_dev(svg, "width", /*size*/ ctx[1]);
    			}

    			if (dirty & /*size*/ 2) {
    				attr_dev(svg, "height", /*size*/ ctx[1]);
    			}

    			if (dirty & /*color*/ 1) {
    				attr_dev(svg, "fill", /*color*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$W.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$W($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Github', slots, []);
    	let { color = 'currentColor' } = $$props;
    	let { size = 24 } = $$props;
    	let { title = "github" } = $$props;
    	const writable_props = ['color', 'size', 'title'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Github> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    	};

    	$$self.$capture_state = () => ({ color, size, title });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color, size, title];
    }

    class Github extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$W, create_fragment$W, safe_not_equal, { color: 0, size: 1, title: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Github",
    			options,
    			id: create_fragment$W.name
    		});
    	}

    	get color() {
    		throw new Error("<Github>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Github>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Github>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Github>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<Github>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Github>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\icons\Sqlite.svelte generated by Svelte v3.47.0 */

    const file$T = "src\\components\\icons\\Sqlite.svelte";

    function create_fragment$V(ctx) {
    	let svg;
    	let title_1;
    	let t;
    	let path;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[2]);
    			path = svg_element("path");
    			add_location(title_1, file$T, 8, 6, 252);
    			attr_dev(path, "d", "M21.678.521c-1.032-.92-2.28-.55-3.513.544a8.71 8.71 0 0 0-.547.535c-2.109 2.237-4.066 6.38-4.674 9.544.237.48.422 1.093.544 1.561a13.044 13.044 0 0 1 .164.703s-.019-.071-.096-.296l-.05-.146a1.689 1.689 0 0 0-.033-.08c-.138-.32-.518-.995-.686-1.289-.143.423-.27.818-.376 1.176.484.884.778 2.4.778 2.4s-.025-.099-.147-.442c-.107-.303-.644-1.244-.772-1.464-.217.804-.304 1.346-.226 1.478.152.256.296.698.422 1.186.286 1.1.485 2.44.485 2.44l.017.224a22.41 22.41 0 0 0 .056 2.748c.095 1.146.273 2.13.5 2.657l.155-.084c-.334-1.038-.47-2.399-.41-3.967.09-2.398.642-5.29 1.661-8.304 1.723-4.55 4.113-8.201 6.3-9.945-1.993 1.8-4.692 7.63-5.5 9.788-.904 2.416-1.545 4.684-1.931 6.857.666-2.037 2.821-2.912 2.821-2.912s1.057-1.304 2.292-3.166c-.74.169-1.955.458-2.362.629-.6.251-.762.337-.762.337s1.945-1.184 3.613-1.72C21.695 7.9 24.195 2.767 21.678.521m-18.573.543A1.842 1.842 0 0 0 1.27 2.9v16.608a1.84 1.84 0 0 0 1.835 1.834h9.418a22.953 22.953 0 0 1-.052-2.707c-.006-.062-.011-.141-.016-.2a27.01 27.01 0 0 0-.473-2.378c-.121-.47-.275-.898-.369-1.057-.116-.197-.098-.31-.097-.432 0-.12.015-.245.037-.386a9.98 9.98 0 0 1 .234-1.045l.217-.028c-.017-.035-.014-.065-.031-.097l-.041-.381a32.8 32.8 0 0 1 .382-1.194l.2-.019c-.008-.016-.01-.038-.018-.053l-.043-.316c.63-3.28 2.587-7.443 4.8-9.791.066-.069.133-.128.198-.194Z");
    			add_location(path, file$T, 9, 6, 282);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "width", /*size*/ ctx[1]);
    			attr_dev(svg, "height", /*size*/ ctx[1]);
    			attr_dev(svg, "fill", /*color*/ ctx[0]);
    			attr_dev(svg, "viewBox", "0 0 24 24");
    			add_location(svg, file$T, 7, 4, 144);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, title_1);
    			append_dev(title_1, t);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*title*/ 4) set_data_dev(t, /*title*/ ctx[2]);

    			if (dirty & /*size*/ 2) {
    				attr_dev(svg, "width", /*size*/ ctx[1]);
    			}

    			if (dirty & /*size*/ 2) {
    				attr_dev(svg, "height", /*size*/ ctx[1]);
    			}

    			if (dirty & /*color*/ 1) {
    				attr_dev(svg, "fill", /*color*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$V.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$V($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Sqlite', slots, []);
    	let { color = 'currentColor' } = $$props;
    	let { size = 24 } = $$props;
    	let { title = "sqlite" } = $$props;
    	const writable_props = ['color', 'size', 'title'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Sqlite> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    	};

    	$$self.$capture_state = () => ({ color, size, title });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color, size, title];
    }

    class Sqlite extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$V, create_fragment$V, safe_not_equal, { color: 0, size: 1, title: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Sqlite",
    			options,
    			id: create_fragment$V.name
    		});
    	}

    	get color() {
    		throw new Error("<Sqlite>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Sqlite>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Sqlite>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Sqlite>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<Sqlite>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Sqlite>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\icons\Jquery.svelte generated by Svelte v3.47.0 */

    const file$S = "src\\components\\icons\\Jquery.svelte";

    function create_fragment$U(ctx) {
    	let svg;
    	let title_1;
    	let t;
    	let path;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[2]);
    			path = svg_element("path");
    			add_location(title_1, file$S, 8, 6, 252);
    			attr_dev(path, "d", "M1.525 5.87c-2.126 3.054-1.862 7.026-.237 10.269.037.079.078.154.118.229.023.052.049.1.077.15.013.027.031.056.047.082.026.052.054.102.081.152l.157.266c.03.049.057.097.09.146.056.094.12.187.178.281.026.04.05.078.079.117a6.368 6.368 0 00.31.445c.078.107.156.211.24.315.027.038.058.076.086.115l.22.269c.028.03.055.067.084.099.098.118.202.233.306.35l.005.006a3.134 3.134 0 00.425.44c.08.083.16.165.245.245l.101.097c.111.105.223.209.34.309.002 0 .003.002.005.003l.057.05c.102.089.205.178.31.26l.125.105c.085.068.174.133.26.2l.137.105c.093.07.192.139.287.207.035.025.07.05.106.073l.03.023.28.185.12.08c.148.094.294.184.44.272.041.02.084.044.123.068.108.062.22.125.329.183.06.034.122.063.184.094.075.042.153.083.234.125a.324.324 0 01.056.023c.033.015.064.031.096.047.12.06.245.118.375.175.024.01.05.02.076.034.144.063.289.123.438.182.034.01.07.027.105.04.135.051.274.103.411.152l.05.018c.154.052.305.102.46.15.036.01.073.023.111.033.16.048.314.105.474.137 10.273 1.872 13.258-6.177 13.258-6.177-2.508 3.266-6.958 4.127-11.174 3.169-.156-.036-.312-.086-.47-.132a13.539 13.539 0 01-.567-.182l-.062-.024c-.136-.046-.267-.097-.4-.148a1.615 1.615 0 00-.11-.04c-.148-.06-.29-.121-.433-.184-.031-.01-.057-.024-.088-.036a23.44 23.44 0 01-.362-.17 1.485 1.485 0 01-.106-.052c-.094-.044-.188-.095-.28-.143a3.947 3.947 0 01-.187-.096c-.114-.06-.227-.125-.34-.187-.034-.024-.073-.044-.112-.066a15.922 15.922 0 01-.439-.27 2.107 2.107 0 01-.118-.078 6.01 6.01 0 01-.312-.207c-.035-.023-.067-.048-.103-.073a9.553 9.553 0 01-.295-.212c-.042-.034-.087-.066-.132-.1-.088-.07-.177-.135-.265-.208l-.118-.095a10.593 10.593 0 01-.335-.28.258.258 0 00-.037-.031l-.347-.316-.1-.094c-.082-.084-.166-.164-.25-.246l-.098-.1a9.081 9.081 0 01-.309-.323l-.015-.016c-.106-.116-.21-.235-.313-.355-.027-.03-.053-.064-.08-.097l-.227-.277a21.275 21.275 0 01-.34-.449C2.152 11.79 1.306 7.384 3.177 3.771m4.943-.473c-1.54 2.211-1.454 5.169-.254 7.508a9.111 9.111 0 00.678 1.133c.23.33.484.721.793.988.107.122.223.24.344.36l.09.09c.114.11.232.217.35.325l.016.013a9.867 9.867 0 00.414.342c.034.023.063.05.096.073.14.108.282.212.428.316l.015.009c.062.045.128.086.198.13.028.018.06.042.09.06.106.068.21.132.318.197.017.007.032.016.048.023.09.055.188.108.282.157.033.02.065.035.1.054.066.033.132.068.197.102l.032.014c.135.067.273.129.408.19.034.014.063.025.092.039.111.048.224.094.336.137.05.017.097.037.144.052.102.038.21.073.31.108l.14.045c.147.045.295.104.449.13C22.164 17.206 24 11.098 24 11.098c-1.653 2.38-4.852 3.513-8.261 2.628a8.04 8.04 0 01-.449-.13c-.048-.014-.09-.029-.136-.043-.104-.036-.211-.07-.312-.109l-.144-.054c-.113-.045-.227-.087-.336-.135-.034-.015-.065-.025-.091-.04-.14-.063-.281-.125-.418-.192l-.206-.107-.119-.06a5.673 5.673 0 01-.265-.15.62.62 0 01-.062-.035c-.106-.066-.217-.13-.318-.198-.034-.019-.065-.042-.097-.062l-.208-.136c-.144-.1-.285-.208-.428-.313-.032-.029-.063-.053-.094-.079-1.499-1.178-2.681-2.79-3.242-4.613-.59-1.897-.46-4.023.56-5.75m4.292-.147c-.909 1.334-.996 2.99-.37 4.46.665 1.563 2.024 2.79 3.608 3.37.065.025.128.046.196.07l.088.027c.092.03.185.063.28.084 4.381.845 5.567-2.25 5.886-2.704-1.043 1.498-2.792 1.857-4.938 1.335a4.85 4.85 0 01-.516-.16 6.352 6.352 0 01-.618-.254 6.53 6.53 0 01-1.082-.66c-1.922-1.457-3.113-4.236-1.859-6.5");
    			add_location(path, file$S, 9, 6, 282);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "width", /*size*/ ctx[1]);
    			attr_dev(svg, "height", /*size*/ ctx[1]);
    			attr_dev(svg, "fill", /*color*/ ctx[0]);
    			attr_dev(svg, "viewBox", "0 0 24 24");
    			add_location(svg, file$S, 7, 4, 144);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, title_1);
    			append_dev(title_1, t);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*title*/ 4) set_data_dev(t, /*title*/ ctx[2]);

    			if (dirty & /*size*/ 2) {
    				attr_dev(svg, "width", /*size*/ ctx[1]);
    			}

    			if (dirty & /*size*/ 2) {
    				attr_dev(svg, "height", /*size*/ ctx[1]);
    			}

    			if (dirty & /*color*/ 1) {
    				attr_dev(svg, "fill", /*color*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$U.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$U($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Jquery', slots, []);
    	let { color = 'currentColor' } = $$props;
    	let { size = 24 } = $$props;
    	let { title = "jquery" } = $$props;
    	const writable_props = ['color', 'size', 'title'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Jquery> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    	};

    	$$self.$capture_state = () => ({ color, size, title });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color, size, title];
    }

    class Jquery extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$U, create_fragment$U, safe_not_equal, { color: 0, size: 1, title: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Jquery",
    			options,
    			id: create_fragment$U.name
    		});
    	}

    	get color() {
    		throw new Error("<Jquery>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Jquery>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Jquery>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Jquery>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<Jquery>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Jquery>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\icons\Figma.svelte generated by Svelte v3.47.0 */

    const file$R = "src\\components\\icons\\Figma.svelte";

    function create_fragment$T(ctx) {
    	let svg;
    	let title_1;
    	let t;
    	let path;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[2]);
    			path = svg_element("path");
    			add_location(title_1, file$R, 13, 2, 238);
    			attr_dev(path, "d", "M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z");
    			add_location(path, file$R, 14, 2, 264);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "width", /*size*/ ctx[1]);
    			attr_dev(svg, "height", /*size*/ ctx[1]);
    			attr_dev(svg, "fill", /*color*/ ctx[0]);
    			attr_dev(svg, "viewBox", "0 0 24 24");
    			add_location(svg, file$R, 6, 0, 117);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, title_1);
    			append_dev(title_1, t);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*title*/ 4) set_data_dev(t, /*title*/ ctx[2]);

    			if (dirty & /*size*/ 2) {
    				attr_dev(svg, "width", /*size*/ ctx[1]);
    			}

    			if (dirty & /*size*/ 2) {
    				attr_dev(svg, "height", /*size*/ ctx[1]);
    			}

    			if (dirty & /*color*/ 1) {
    				attr_dev(svg, "fill", /*color*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$T.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$T($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Figma', slots, []);
    	let { color = "currentColor" } = $$props;
    	let { size = 24 } = $$props;
    	let { title = "figma" } = $$props;
    	const writable_props = ['color', 'size', 'title'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Figma> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    	};

    	$$self.$capture_state = () => ({ color, size, title });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color, size, title];
    }

    class Figma extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$T, create_fragment$T, safe_not_equal, { color: 0, size: 1, title: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Figma",
    			options,
    			id: create_fragment$T.name
    		});
    	}

    	get color() {
    		throw new Error("<Figma>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Figma>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Figma>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Figma>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<Figma>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Figma>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    /* src\components\game\descriptions\ProtoshiftDesc.svelte generated by Svelte v3.47.0 */

    const file$Q = "src\\components\\game\\descriptions\\ProtoshiftDesc.svelte";

    function create_fragment$S(ctx) {
    	let p0;
    	let t1;
    	let p1;
    	let t3;
    	let p2;
    	let t5;
    	let ul;
    	let li0;
    	let a0;
    	let t7;
    	let li1;
    	let a1;
    	let t9;
    	let li2;
    	let a2;
    	let t11;
    	let li3;
    	let a3;

    	const block = {
    		c: function create() {
    			p0 = element("p");
    			p0.textContent = "Protoshift is an addicting, fast paced, twitch based, arcade game filled\r\n    with challenge, inspired by Super Hexagon. Put your mouse hand to the test\r\n    while attempting to complete impossible levels and compete on global\r\n    leader-boards.";
    			t1 = space();
    			p1 = element("p");
    			p1.textContent = "Protoshift was originally released on Steam on Jan 15, 2016. A few years\r\n    after release I sold the Steam version to a publisher, who's account was\r\n    taken down some time later.";
    			t3 = space();
    			p2 = element("p");
    			p2.textContent = "More info can be found at these links:";
    			t5 = space();
    			ul = element("ul");
    			li0 = element("li");
    			a0 = element("a");
    			a0.textContent = "Soundtrack";
    			t7 = space();
    			li1 = element("li");
    			a1 = element("a");
    			a1.textContent = "Steam Community";
    			t9 = space();
    			li2 = element("li");
    			a2 = element("a");
    			a2.textContent = "Steam Archive";
    			t11 = space();
    			li3 = element("li");
    			a3 = element("a");
    			a3.textContent = "Steamdb";
    			add_location(p0, file$Q, 0, 0, 0);
    			add_location(p1, file$Q, 7, 0, 265);
    			add_location(p2, file$Q, 13, 0, 467);
    			attr_dev(a0, "target", "details");
    			attr_dev(a0, "href", "https://www.youtube.com/playlist?list=PLR_qFtySjuJVgakQnDBLytVb8XhpEprRY\r\n        ");
    			add_location(a0, file$Q, 17, 8, 540);
    			add_location(li0, file$Q, 16, 4, 526);
    			attr_dev(a1, "target", "details");
    			attr_dev(a1, "href", "https://steamcommunity.com/groups/Protoshift");
    			add_location(a1, file$Q, 23, 8, 721);
    			add_location(li1, file$Q, 22, 4, 707);
    			attr_dev(a2, "target", "details");
    			attr_dev(a2, "href", "https://web.archive.org/web/*/https://store.steampowered.com/app/398070");
    			add_location(a2, file$Q, 28, 8, 867);
    			add_location(li2, file$Q, 27, 4, 853);
    			attr_dev(a3, "target", "details");
    			attr_dev(a3, "href", "https://steamdb.info/app/398070/");
    			add_location(a3, file$Q, 35, 8, 1064);
    			add_location(li3, file$Q, 34, 4, 1050);
    			add_location(ul, file$Q, 15, 0, 516);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, p1, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, p2, anchor);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, ul, anchor);
    			append_dev(ul, li0);
    			append_dev(li0, a0);
    			append_dev(ul, t7);
    			append_dev(ul, li1);
    			append_dev(li1, a1);
    			append_dev(ul, t9);
    			append_dev(ul, li2);
    			append_dev(li2, a2);
    			append_dev(ul, t11);
    			append_dev(ul, li3);
    			append_dev(li3, a3);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(p1);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(p2);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(ul);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$S.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$S($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ProtoshiftDesc', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ProtoshiftDesc> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class ProtoshiftDesc extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$S, create_fragment$S, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ProtoshiftDesc",
    			options,
    			id: create_fragment$S.name
    		});
    	}
    }

    /* src\components\game\descriptions\SoulGrinderDesc.svelte generated by Svelte v3.47.0 */

    const file$P = "src\\components\\game\\descriptions\\SoulGrinderDesc.svelte";

    function create_fragment$R(ctx) {
    	let p0;
    	let t1;
    	let p1;

    	const block = {
    		c: function create() {
    			p0 = element("p");
    			p0.textContent = "Soul Grinder is a horde survival action rogue-like. Survive an onslaught of\r\n    enemies with necromancy and dark magic at your disposal! Try to survive as\r\n    long as you can and collect gems to upgrade your power.";
    			t1 = space();
    			p1 = element("p");
    			p1.textContent = "I built Soul Grinder over the course of two weeks as personal challenge and\r\n    break from my main project. I wanted to try building a game like vampire\r\n    survivors with a twist of necromancy. Ultimately the game felt less original\r\n    than I wanted. There's a lot more features I would like to have added but I\r\n    decided to move forward with different projects. Still, I'm happy with how\r\n    the game turned out and how much I was able to accomplish in such a short\r\n    time span.";
    			add_location(p0, file$P, 0, 0, 0);
    			add_location(p1, file$P, 6, 0, 235);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, p1, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(p1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$R.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$R($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SoulGrinderDesc', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SoulGrinderDesc> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class SoulGrinderDesc extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$R, create_fragment$R, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SoulGrinderDesc",
    			options,
    			id: create_fragment$R.name
    		});
    	}
    }

    /* src\components\game\descriptions\RTRDesc.svelte generated by Svelte v3.47.0 */

    const file$O = "src\\components\\game\\descriptions\\RTRDesc.svelte";

    function create_fragment$Q(ctx) {
    	let p0;
    	let t1;
    	let p1;

    	const block = {
    		c: function create() {
    			p0 = element("p");
    			p0.textContent = "Red Tie Runner is a simplistic, yet challenging, reflex-based, 2D\r\n    platforming game. Play as a stickman with a red tie to dash and jump your\r\n    way through obstacles. Features 30 intense levels, including 6 challenge\r\n    levels, accompanied by spikes, trampolines, ziplines, wingsuits, lava, and\r\n    more.";
    			t1 = space();
    			p1 = element("p");
    			p1.textContent = "This is the first game I ever finished; back in 2013. Originally it was\r\n    released on the App Store, then passed Steam greenlight. I polished it a bit\r\n    and released it for free. To date, it's received nearly 2 million plays on\r\n    the Scirra Arcade. I also built a version with integrated achievements and leaderboards for Y8.com.";
    			add_location(p0, file$O, 0, 0, 0);
    			add_location(p1, file$O, 8, 0, 332);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, p1, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(p1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$Q.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$Q($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('RTRDesc', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<RTRDesc> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class RTRDesc extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$Q, create_fragment$Q, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "RTRDesc",
    			options,
    			id: create_fragment$Q.name
    		});
    	}
    }

    /* src\components\game\descriptions\DontFallDesc.svelte generated by Svelte v3.47.0 */

    const file$N = "src\\components\\game\\descriptions\\DontFallDesc.svelte";

    function create_fragment$P(ctx) {
    	let p0;
    	let t1;
    	let p1;

    	const block = {
    		c: function create() {
    			p0 = element("p");
    			p0.textContent = "Don't Fall! is a competitive two player rag-doll game. Push and throw the\r\n    enemy off the platform. Don't fall! There's also a single player survival\r\n    challenge.";
    			t1 = space();
    			p1 = element("p");
    			p1.textContent = "Don't Fall! was originally made over the course of a weekend. It reached\r\n    over a million plays on the Chrome Web Store, Scirra Arcade, and a defunct site called Clay.io.";
    			add_location(p0, file$N, 0, 0, 0);
    			add_location(p1, file$N, 6, 0, 187);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, p1, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(p1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$P.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$P($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('DontFallDesc', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<DontFallDesc> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class DontFallDesc extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$P, create_fragment$P, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "DontFallDesc",
    			options,
    			id: create_fragment$P.name
    		});
    	}
    }

    /* src\components\game\descriptions\GridlockDashDesc.svelte generated by Svelte v3.47.0 */

    const file$M = "src\\components\\game\\descriptions\\GridlockDashDesc.svelte";

    function create_fragment$O(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Gridlock Dash is a frantic puzzle game where the player must keep cars from\r\n    colliding. Make your way through 7 levels, and test your skills in 3 endless\r\n    modes in the struggle to keep the streets safe. I made Gridlock Dash in 2014\r\n    to test out iPad development, but I never ended up publishing it to the App\r\n    Store.";
    			add_location(p, file$M, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$O.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$O($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('GridlockDashDesc', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<GridlockDashDesc> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class GridlockDashDesc extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$O, create_fragment$O, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "GridlockDashDesc",
    			options,
    			id: create_fragment$O.name
    		});
    	}
    }

    /* src\components\game\descriptions\JetAttackDesc.svelte generated by Svelte v3.47.0 */

    const file$L = "src\\components\\game\\descriptions\\JetAttackDesc.svelte";

    function create_fragment$N(ctx) {
    	let p0;
    	let t1;
    	let p1;

    	const block = {
    		c: function create() {
    			p0 = element("p");
    			p0.textContent = "Use yer jets to knock the enemy down! First to 9 wins! Jet Attack is a\r\n    competitive rag-doll physics game with exploding limbs!";
    			t1 = space();
    			p1 = element("p");
    			p1.textContent = "This was built as a spin off of \"Don't Fall!\". I also built a version with\r\n    integrated leaderboards, achievements, and a single player mode for Y8.com.";
    			add_location(p0, file$L, 0, 0, 0);
    			add_location(p1, file$L, 5, 0, 150);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, p1, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(p1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$N.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$N($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('JetAttackDesc', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<JetAttackDesc> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class JetAttackDesc extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$N, create_fragment$N, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "JetAttackDesc",
    			options,
    			id: create_fragment$N.name
    		});
    	}
    }

    /* src\components\game\descriptions\MinosPondDesc.svelte generated by Svelte v3.47.0 */

    const file$K = "src\\components\\game\\descriptions\\MinosPondDesc.svelte";

    function create_fragment$M(ctx) {
    	let p0;
    	let t1;
    	let p1;

    	const block = {
    		c: function create() {
    			p0 = element("p");
    			p0.textContent = "Minos' Pond was a joint entry with a friend who did the art and sfx. It was\r\n    my insane attempt to create a city builder resource management type game\r\n    mixed with an Earthbound style overworld in 72 hours.";
    			t1 = space();
    			p1 = element("p");
    			p1.textContent = "This one didn't score too hot, probably because a high barrier to entry and\r\n    generally unpleasant user experience. Still, the mechanics are pretty deep\r\n    for the time span of development, and there is a charm to the Minos.";
    			add_location(p0, file$K, 0, 0, 0);
    			add_location(p1, file$K, 5, 0, 229);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, p1, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(p1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$M.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$M($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('MinosPondDesc', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<MinosPondDesc> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class MinosPondDesc extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$M, create_fragment$M, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "MinosPondDesc",
    			options,
    			id: create_fragment$M.name
    		});
    	}
    }

    /* src\components\game\descriptions\SamDesc.svelte generated by Svelte v3.47.0 */

    const file$J = "src\\components\\game\\descriptions\\SamDesc.svelte";

    function create_fragment$L(ctx) {
    	let p0;
    	let t1;
    	let p1;
    	let t3;
    	let p2;
    	let t4;
    	let a;

    	const block = {
    		c: function create() {
    			p0 = element("p");
    			p0.textContent = "Developed during Ludum Dare 37, Sam tells the story of pixel guy named Sam.\r\n    It is story based 2D platformer where your decisions matter.";
    			t1 = space();
    			p1 = element("p");
    			p1.textContent = "Sam was an absolutely massive undertaking for the allotted 72 hours of the\r\n    Jam. I didn't sleep much. It was the first game I made where I did all the\r\n    art. Despite some mechanical shortcomings, I'm still proud of the game's\r\n    atmosphere.";
    			t3 = space();
    			p2 = element("p");
    			t4 = text("Sam scored second in the 'mood' category and was #32 overall. Unfortunately,\r\n    the original Ludum Dare site was taken down, but the original entry is still\r\n    available on\r\n    ");
    			a = element("a");
    			a.textContent = "Web Archive.";
    			add_location(p0, file$J, 0, 0, 0);
    			add_location(p1, file$J, 5, 0, 160);
    			attr_dev(a, "href", "https://web.archive.org/web/20201126172954/http://ludumdare.com/compo/ludum-dare-37/?action=preview&uid=125769");
    			add_location(a, file$J, 16, 4, 619);
    			add_location(p2, file$J, 12, 0, 428);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, p1, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, p2, anchor);
    			append_dev(p2, t4);
    			append_dev(p2, a);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(p1);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(p2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$L.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$L($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SamDesc', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SamDesc> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class SamDesc extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$L, create_fragment$L, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SamDesc",
    			options,
    			id: create_fragment$L.name
    		});
    	}
    }

    /* src\components\game\descriptions\RocketStrikeDesc.svelte generated by Svelte v3.47.0 */

    const file$I = "src\\components\\game\\descriptions\\RocketStrikeDesc.svelte";

    function create_fragment$K(ctx) {
    	let p0;
    	let t1;
    	let p1;

    	const block = {
    		c: function create() {
    			p0 = element("p");
    			p0.textContent = "Rocket Strike is a survival action platformer. Outlast your opponent in a\r\n    rocket survival! For 1-4 players, but multiplayer is strongly recommended!";
    			t1 = space();
    			p1 = element("p");
    			p1.textContent = "Rocket Strike was released as a single player game on Google Play and as local multiplayer game for web browsers. I built a more streamlined version with updated assets, integrated achievments and leaderboards for Y8.com.";
    			add_location(p0, file$I, 0, 0, 0);
    			add_location(p1, file$I, 5, 0, 172);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, p1, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(p1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$K.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$K($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('RocketStrikeDesc', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<RocketStrikeDesc> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class RocketStrikeDesc extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$K, create_fragment$K, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "RocketStrikeDesc",
    			options,
    			id: create_fragment$K.name
    		});
    	}
    }

    /* src\components\game\descriptions\RoadwayDesc.svelte generated by Svelte v3.47.0 */

    const file$H = "src\\components\\game\\descriptions\\RoadwayDesc.svelte";

    function create_fragment$J(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Roadway Repair is a pipes-style puzzle game where the player is tasked with fixing the road so cars can get across. It is part of a mobile web game suite I did in 2016. I think this was the first\r\n    game I spent money hiring an artist. It features 20 levels.";
    			add_location(p, file$H, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$J.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$J($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('RoadwayDesc', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<RoadwayDesc> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class RoadwayDesc extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$J, create_fragment$J, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "RoadwayDesc",
    			options,
    			id: create_fragment$J.name
    		});
    	}
    }

    /* src\components\game\descriptions\BalloonsDesc.svelte generated by Svelte v3.47.0 */

    const file$G = "src\\components\\game\\descriptions\\BalloonsDesc.svelte";

    function create_fragment$I(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Bouncy Balloons is a carnival themed physics puzzle game. Launch water\r\n    balloons with your slingshot to knockdown the ducks! It is part of a mobile\r\n    web game suite I did in 2016. It features 20 levels with increasing\r\n    mechanics and difficulty.";
    			add_location(p, file$G, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$I.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$I($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('BalloonsDesc', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<BalloonsDesc> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class BalloonsDesc extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$I, create_fragment$I, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "BalloonsDesc",
    			options,
    			id: create_fragment$I.name
    		});
    	}
    }

    /* src\components\game\descriptions\BrixDesc.svelte generated by Svelte v3.47.0 */

    const file$F = "src\\components\\game\\descriptions\\BrixDesc.svelte";

    function create_fragment$H(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Brix Builder is an arcade inspired stacking game. It is part of a mobile web\r\n    game suite I did in 2016. It features 3 difficulties with 7 levels of\r\n    increasing difficulty.";
    			add_location(p, file$F, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$H.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$H($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('BrixDesc', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<BrixDesc> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class BrixDesc extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$H, create_fragment$H, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "BrixDesc",
    			options,
    			id: create_fragment$H.name
    		});
    	}
    }

    /* src\components\game\descriptions\RocketRunnerDesc.svelte generated by Svelte v3.47.0 */

    const file$E = "src\\components\\game\\descriptions\\RocketRunnerDesc.svelte";

    function create_fragment$G(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Rocket Runner is an simple dodging game with unlockable skins and currency.\r\n    It is part of a mobile web game suite I did in 2016.";
    			add_location(p, file$E, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$G.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$G($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('RocketRunnerDesc', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<RocketRunnerDesc> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class RocketRunnerDesc extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$G, create_fragment$G, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "RocketRunnerDesc",
    			options,
    			id: create_fragment$G.name
    		});
    	}
    }

    /* src\components\game\descriptions\VoterDesc.svelte generated by Svelte v3.47.0 */

    const file$D = "src\\components\\game\\descriptions\\VoterDesc.svelte";

    function create_fragment$F(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "I was hired by Everyday Arcade to do the programming for \"The Voter\r\n    Suppression Trail\", which was published in The New York Times as \"the\r\n    first-ever video game for Op-Docs\" in a series about the 2016 election.";
    			add_location(p, file$D, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$F.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$F($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('VoterDesc', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<VoterDesc> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class VoterDesc extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$F, create_fragment$F, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "VoterDesc",
    			options,
    			id: create_fragment$F.name
    		});
    	}
    }

    /* src\components\game\descriptions\MTACountryDesc.svelte generated by Svelte v3.47.0 */

    const file$C = "src\\components\\game\\descriptions\\MTACountryDesc.svelte";

    function create_fragment$E(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "MTA Country is a game about traversing the NYC subway, themed around the\r\n    cart levels in Donkey Kong Country. I was hired by Everyday Arcade to take a\r\n    prototype and finish developing the rest of the game.";
    			add_location(p, file$C, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$E.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$E($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('MTACountryDesc', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<MTACountryDesc> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class MTACountryDesc extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$E, create_fragment$E, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "MTACountryDesc",
    			options,
    			id: create_fragment$E.name
    		});
    	}
    }

    /* src\components\game\descriptions\FantakneeDesc.svelte generated by Svelte v3.47.0 */

    const file$B = "src\\components\\game\\descriptions\\FantakneeDesc.svelte";

    function create_fragment$D(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Fantaknee Football is a satirical game about the news cycle. I was hired to\r\n    develop it for a team commissioned by Super Deluxe.";
    			add_location(p, file$B, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$D.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$D($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('FantakneeDesc', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<FantakneeDesc> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class FantakneeDesc extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$D, create_fragment$D, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "FantakneeDesc",
    			options,
    			id: create_fragment$D.name
    		});
    	}
    }

    /* src\components\game\descriptions\MayhemDesc.svelte generated by Svelte v3.47.0 */

    const file$A = "src\\components\\game\\descriptions\\MayhemDesc.svelte";

    function create_fragment$C(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Monster's Mayhem was commissioned by a client who wanted to rebuild their\r\n    entire flash game in HTML5.";
    			add_location(p, file$A, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$C.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$C($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('MayhemDesc', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<MayhemDesc> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class MayhemDesc extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$C, create_fragment$C, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "MayhemDesc",
    			options,
    			id: create_fragment$C.name
    		});
    	}
    }

    /* src\components\game\descriptions\TowerDefenseDesc.svelte generated by Svelte v3.47.0 */

    const file$z = "src\\components\\game\\descriptions\\TowerDefenseDesc.svelte";

    function create_fragment$B(ctx) {
    	let p0;
    	let t1;
    	let p1;

    	const block = {
    		c: function create() {
    			p0 = element("p");
    			p0.textContent = "This is a touch based 2D tower defense prototype I built for a client. In\r\n    it, the player can switch between heroes, who each have 3 unique abilities\r\n    which affect the battlefield.";
    			t1 = space();
    			p1 = element("p");
    			p1.textContent = "The player defends their base, which has limited health, on the right side.\r\n    Various enemy types spawn in and attack from the left. The player can also\r\n    find, store, and equip potions in their backpack.";
    			add_location(p0, file$z, 0, 0, 0);
    			add_location(p1, file$z, 6, 0, 207);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, p1, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(p1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$B.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$B($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('TowerDefenseDesc', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<TowerDefenseDesc> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class TowerDefenseDesc extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$B, create_fragment$B, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TowerDefenseDesc",
    			options,
    			id: create_fragment$B.name
    		});
    	}
    }

    /* src\components\game\descriptions\kcpsDesc.svelte generated by Svelte v3.47.0 */

    const file$y = "src\\components\\game\\descriptions\\kcpsDesc.svelte";

    function create_fragment$A(ctx) {
    	let p0;
    	let t1;
    	let p1;
    	let t3;
    	let ul;
    	let li0;
    	let t5;
    	let li1;
    	let t7;
    	let li2;
    	let t9;
    	let li3;

    	const block = {
    		c: function create() {
    			p0 = element("p");
    			p0.textContent = "Kitty Kat Poker Slots Casino is a full scale android app I was commissioned\r\n    to develop. It's a slot machine game based on matching poker hands with a\r\n    cute cat theme.";
    			t1 = space();
    			p1 = element("p");
    			p1.textContent = "We started with a bare bones prototype with hand drawing and a comprehensive\r\n    debug mode. We then moved to final art and audio assets. From there we added\r\n    platform specific items and Google Play API which included:";
    			t3 = space();
    			ul = element("ul");
    			li0 = element("li");
    			li0.textContent = "An account system via Firebase, which supports Google Play, Facebook,\r\n        or email login.";
    			t5 = space();
    			li1 = element("li");
    			li1.textContent = "A daily login reward, also using the account system.";
    			t7 = space();
    			li2 = element("li");
    			li2.textContent = "Google Play achievements";
    			t9 = space();
    			li3 = element("li");
    			li3.textContent = "In App Purchases";
    			add_location(p0, file$y, 0, 0, 0);
    			add_location(p1, file$y, 6, 0, 194);
    			add_location(li0, file$y, 12, 4, 444);
    			add_location(li1, file$y, 16, 4, 569);
    			add_location(li2, file$y, 17, 4, 636);
    			add_location(li3, file$y, 18, 4, 675);
    			add_location(ul, file$y, 11, 0, 434);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, p1, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, ul, anchor);
    			append_dev(ul, li0);
    			append_dev(ul, t5);
    			append_dev(ul, li1);
    			append_dev(ul, t7);
    			append_dev(ul, li2);
    			append_dev(ul, t9);
    			append_dev(ul, li3);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(p1);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(ul);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$A.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$A($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('KcpsDesc', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<KcpsDesc> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class KcpsDesc extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$A, create_fragment$A, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "KcpsDesc",
    			options,
    			id: create_fragment$A.name
    		});
    	}
    }

    /* src\components\game\descriptions\ChemDesc.svelte generated by Svelte v3.47.0 */

    const file$x = "src\\components\\game\\descriptions\\ChemDesc.svelte";

    function create_fragment$z(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Chemistry Hotspots was commissioned by a postgraduate student who was\r\n    exploring video games as an education tool. It quizzes the player on various\r\n    molecular compounds.";
    			add_location(p, file$x, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$z.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$z($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ChemDesc', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ChemDesc> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class ChemDesc extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$z, create_fragment$z, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ChemDesc",
    			options,
    			id: create_fragment$z.name
    		});
    	}
    }

    // Vars
    const url = "http://localhost:8080";
    const iconSize = writable(64);
    const theme = {
        bgColors: {
            primary: "#1a1a1a",
            secondary: "#361f83",
            gradientSilver: "linear-gradient(120deg, rgba(113,120,125,1) 0%, rgba(112,145,170,1) 100%)",
        },
        skewAngle: -3,
        bgImages: {
            space: "url(\"/assets/backgrounds/nasa.jpg\")"
        },
        bgMasks: {
            green: 'rgba(0, 128, 0, 0.329)',
            blue: '#1c2f858a'
        }
    };

    // Games
    const gameTags = ["all", "featured", "freelance", "web", "mobile", "jam", "sale"];

    // Sizes - small, tall, big, huge (unused), wide (unused)
    const games = [
        // Soul Grinder
        {
            date: "Feb 23, 2022",
            title: "Soul Grinder",
            platform: "laptop",
            size: "big",
            desc: SoulGrinderDesc,
            hasDesktopPreview: true,
            hasMobilePreview: true,
            src: "https://itch.io/embed-upload/6242510?color=1C0C42",
            cover: "/assets/games/soulgrinder/cover.png",
            gif: "/assets/games/soulgrinder/soulgrinder.gif",
            tags: ["featured", "mobile", "web", "jam", "sale"],
            links: [
                {
                    label: "Itch.io",
                    link: "https://reflextions.itch.io/soul-grinder",
                },
                {
                    label: "Crazy Games",
                    link: "https://www.crazygames.com/game/soul-grinder",
                },
                {
                    label: "Scirra Arcade",
                    link: "https://www.construct.net/en/free-online-games/soul-grinder-36000/play",
                },
            ],
            images: [
                {
                    src: "/assets/games/soulgrinder/1.png",
                    alt: "soulgrinder screenshot",
                },
                {
                    src: "/assets/games/soulgrinder/3.png",
                    alt: "soulgrinder screenshot",
                },
                {
                    src: "/assets/games/soulgrinder/5.png",
                    alt: "soulgrinder screenshot",
                },
                {
                    src: "/assets/games/soulgrinder/4.png",
                    alt: "soulgrinder screenshot",
                },
                {
                    src: "/assets/games/soulgrinder/6.png",
                    alt: "soulgrinder screenshot",
                },
                {
                    src: "/assets/games/soulgrinder/7.png",
                    alt: "soulgrinder screenshot",
                },
            ],

        },
        // KCPS
        {
            date: "2019",
            title: "Kitty Cat Poker Slots",
            size: "big",
            platform: "laptop",
            desc: KcpsDesc,
            hasDesktopPreview: false,
            hasMobilePreview: false,
            src: "https://play.google.com/store/apps/details?id=com.Go2No1.KittyCat",
            cover: "/assets/games/kcps/kcpsCover.png",
            gif: "/assets/games/kcps/kcps.gif",
            tags: ["featured", "mobile", "freelance"],
            videos: [
                {
                    label: "Trailer",
                    src: "https://www.youtube.com/embed/_na6hF010b0",
                }
            ],
            links: [
                {
                    label: "Google Play",
                    link: "https://play.google.com/store/apps/details?id=com.Go2No1.KittyCat"
                }
            ],
            images: [
                {
                    src: "/assets/games/kcps/kcps1.png",
                    alt: "Kitty Cat Poker Slots menu screen",
                },
                {
                    src: "/assets/games/kcps/kcps2.png",
                    alt: "Kitty Cat Poker Slots screenshot (1)",
                },
                {
                    src: "/assets/games/kcps/kcps3.png",
                    alt: "Kitty Cat Poker Slots screenshot (2)",
                },
                {
                    src: "/assets/games/kcps/kcps4.png",
                    alt: "Kitty Cat Poker Slots screenshot (3)",
                },
                {
                    src: "/assets/games/kcps/kcps5.png",
                    alt: "Kitty Cat Poker Slots screenshot (4)",
                },
                {
                    src: "/assets/games/kcps/kcps6.png",
                    alt: "Kitty Cat Poker Slots screenshot (5)",
                },
            ],
        },
        // Roadway Repair
        {
            date: "2016",
            title: "Roadway Repair",
            platform: "phone",
            size: "tall",
            desc: RoadwayDesc,
            hasDesktopPreview: true,
            hasMobilePreview: true,
            src: "https://itch.io/embed-upload/6246806?color=333333",
            cover: "/assets/games/roadwayrepair/roadwayCover.png",
            gif: "/assets/games/roadwayrepair/roadway.gif",
            icon: "/assets/games/roadwayrepair/RoadwayRepairIcon.png",
            tags: ["featured", "mobile", "web", "sale"],
            links: [
                {
                    label: "Itch.io",
                    link: "https://reflextions.itch.io/roadway-repair",
                },
            ],
            images: [
                {
                    src: "/assets/games/roadwayrepair/rrmenu.png",
                    alt: "roadway repair menu screen",
                },
                {
                    src: "/assets/games/roadwayrepair/roadway1.png",
                    alt: "roadway repair menu, levels, and tutorial screen",
                },
                {
                    src: "/assets/games/roadwayrepair/roadway2.png",
                    alt: "roadway level screens",
                },
            ],
        },
        // Protoshift
        {
            date: "Jan 15, 2016",
            title: "Protoshift",
            platform: "laptop",
            size: "big",
            desc: ProtoshiftDesc,
            hasDesktopPreview: true,
            hasMobilePreview: false,
            src: "https://itch.io/embed-upload/6238921?color=000000",
            cover: "/assets/games/protoshift/protoshiftcover.png",
            gif: "/assets/games/protoshift/protoshift.gif",
            tags: ["featured", "web", "sale"],
            links: [
                {
                    label: "Itch.io",
                    link: "https://reflextions.itch.io/protoshift",
                },
                {
                    label: "Scirra Arcade",
                    link: "https://www.construct.net/en/free-online-games/protoshift-41700/play",
                },
            ],
            images: [
                {
                    src: "/assets/games/protoshift/card1BG.png",
                    alt: "protoshift screenshot",
                },
                {
                    src: "/assets/games/protoshift/card2BG.png",
                    alt: "protoshift screenshot",
                },
                {
                    src: "/assets/games/protoshift/card3BG.jpg",
                    alt: "protoshift screenshot",
                },
                {
                    src: "/assets/games/protoshift/card4BG.jpg",
                    alt: "protoshift screenshot",
                },
                {
                    src: "/assets/games/protoshift/card6BG.jpg",
                    alt: "protoshift screenshot",
                },
            ],
            videos: [
                {
                    label: "Trailer",
                    src: "https://www.youtube.com/embed/noXmLOkoHoo",

                },
                {
                    label: "Soundtrack",
                    src: "https://www.youtube.com/embed/sgIUKdjbfOs",
                },
            ],
        },
        // Don't Fall
        {
            date: "2013",
            title: "Don't Fall!",
            platform: "laptop",
            size: "small",
            desc: DontFallDesc,
            hasDesktopPreview: true,
            hasMobilePreview: false,
            src: "https://itch.io/embed-upload/6243387?color=333333",
            cover: "/assets/games/dontfall/dfCover.png",
            gif: "/assets/games/dontfall/df.gif",
            tags: ["featured", "web", "sale"],
            links: [
                {
                    label: "Scirra Arcade",
                    link: "https://www.construct.net/en/free-online-games/dont-fall-94/play",
                },
                {
                    label: "Itch.io",
                    link: "https://reflextions.itch.io/dont-fall",
                },
            ],
            images: [
                {
                    src: "/assets/games/dontfall/df1.png",
                    alt: "Don't Fall! screenshot",
                },
                {
                    src: "/assets/games/dontfall/df2.png",
                    alt: "Don't Fall! screenshot",
                },
                {
                    src: "/assets/games/dontfall/df3.png",
                    alt: "Don't Fall! screenshot",
                },
            ],
        },
        // Bouncy Balloons
        {
            date: "2016",
            title: "Bouncy Balloons",
            platform: "phone",
            size: "tall",
            desc: BalloonsDesc,
            hasDesktopPreview: true,
            hasMobilePreview: true,
            src: "https://itch.io/embed-upload/6248445?color=333333",
            cover: "assets/games/bouncyballoons/bouncyballoonsportrait.png",
            gif: "assets/games/bouncyballoons/balloons.gif",
            icon: "assets/games/bouncyballoons/BalloonIcon.png",
            tags: ["featured", "mobile", "web", "sale"],
            links: [
                {
                    label: "Itch.io",
                    link: "https://reflextions.itch.io/bouncy-balloons",
                },
            ],
            images: [
                {
                    src: "/assets/games/bouncyballoons/bouncyballoons1.png",
                    alt: "bouncy balloons menu screen",
                },
                {
                    src: "/assets/games/bouncyballoons/bouncyballoons2.png",
                    alt: "bouncy ballons screenshot (1)",
                },
                {
                    src: "/assets/games/bouncyballoons/bouncyballoons3.png",
                    alt: "bouncy ballons screenshot (2)",
                },
            ],
        },
        // RTR
        {
            date: "2013",
            title: "Red Tie Runner",
            platform: "laptop",
            size: "big",
            desc: RTRDesc,
            hasDesktopPreview: true,
            hasMobilePreview: false,
            src: "https://itch.io/embed-upload/6243042?color=5c7272",
            cover: "/assets/games/rtr/rtrCover.png",
            gif: "/assets/games/rtr/rtr.gif",
            tags: ["featured", "mobile", "web", "sale"],
            links: [
                {
                    label: "Scirra Arcade",
                    link: "https://www.construct.net/en/free-online-games/red-tie-runner-1463/play",
                },
                {
                    label: "Itch.io",
                    link: "https://reflextions.itch.io/red-tie-runner",
                },
                {
                    label: "Y8",
                    link: "https://www.y8.com/games/red_tie_runner"
                }
            ],
            images: [
                {
                    src: "/assets/games/rtr/ss1.png",
                    alt: "Red Tie Runner menu screen",
                },
                {
                    src: "/assets/games/rtr/ss2.png",
                    alt: "Red Tie Runner screenshot (1)",
                },
                {
                    src: "/assets/games/rtr/ss3.png",
                    alt: "Red Tie Runner screenshot (2)",
                },
                {
                    src: "/assets/games/rtr/ss4.png",
                    alt: "Red Tie Runner screenshot (4)",
                },
                {
                    src: "/assets/games/rtr/ss5.png",
                    alt: "Red Tie Runner screenshot (5)",
                },
                {
                    src: "/assets/games/rtr/ss6.png",
                    alt: "Red Tie Runner screenshot (6)",
                },
                {
                    src: "/assets/games/rtr/ss7.png",
                    alt: "Red Tie Runner screenshot (7)",
                },
            ],
            videos: [
                {
                    label: "Trailer",
                    src: "https://www.youtube.com/embed/AlBAiyg96eY",
                },
            ],
        },
        //  Jet Attack
        {
            date: "2013",
            title: "Jet Attack!",
            platform: "laptop",
            size: "small",
            desc: JetAttackDesc,
            hasDesktopPreview: true,
            hasMobilePreview: false,
            src: "https://itch.io/embed-upload/6243474?color=333333",
            cover: "/assets/games/jetattack/jaCover3.png",
            gif: "/assets/games/jetattack/ja.gif",
            tags: ["web", "sale"],
            links: [
                {
                    label: "Scirra Arcade",
                    link: "https://www.construct.net/en/free-online-games/jet-attack-1477/play",
                },
                {
                    label: "Itch.io",
                    link: "https://reflextions.itch.io/jet-attack",
                },
                {
                    label: "Y8",
                    link: "https://www.y8.com/games/jet_attack"
                },
                {
                    label: "Chrome Web Store",
                    link: "https://chrome.google.com/webstore/detail/jet-attack/ajkmfllnckceklaikmcmppnlhekmafob?",
                },
            ],
            images: [
                {
                    src: "/assets/games/jetattack/ss1.png",
                    alt: "Jet Attack! screenshot",
                },
                {
                    src: "/assets/games/jetattack/ss2.png",
                    alt: "Jet Attack! screenshot",
                },
                {
                    src: "/assets/games/jetattack/ss3.png",
                    alt: "Jet Attack! screenshot",
                },
                {
                    src: "/assets/games/jetattack/ss4.png",
                    alt: "Jet Attack! screenshot",
                },
            ],
        },
        // Gridlock Dash
        {
            date: "2014",
            title: "Gridlock Dash",
            platform: "laptop",
            size: "small",
            desc: GridlockDashDesc,
            hasDesktopPreview: true,
            hasMobilePreview: false,
            src: "https://itch.io/embed-upload/1796902?color=333333",
            cover: "/assets/games/gridlock/gdCover.png",
            gif: "/assets/games/gridlock/gridlock.gif",
            tags: ["web", "mobile", "sale"],
            links: [
                {
                    label: "Itch.io",
                    link: "https://reflextions.itch.io/gridlock-dash",
                },
                {
                    label: "Chrome Web Store",
                    link: "https://chrome.google.com/webstore/detail/gridlock-dash/npanhggcndhhgnpefpeiihmihnecijbd?"
                }
            ],
            images: [
                {
                    src: "/assets/games/gridlock/ss5.png",
                    alt: "gridlock screenshot",
                },
                {
                    src: "/assets/games/gridlock/ss1.png",
                    alt: "gridlock screenshot",
                },
                {
                    src: "/assets/games/gridlock/ss2.png",
                    alt: "gridlock screenshot",
                },
                {
                    src: "/assets/games/gridlock/ss4.png",
                    alt: "gridlock screenshot",
                },
                {
                    src: "/assets/games/gridlock/ss3.png",
                    alt: "gridlock screenshot",
                },
            ],
        },
        // Sam
        {
            date: "Dec 15, 2016",
            title: "Sam",
            platform: "laptop",
            size: "small",
            desc: SamDesc,
            hasDesktopPreview: true,
            hasMobilePreview: false,
            src: "https://itch.io/embed-upload/347253?color=000000",
            cover: "/assets/games/sam/samCover.png",
            gif: "/assets/games/sam/sam.gif",
            tags: ["featured", "web", "jam"],
            links: [
                {
                    label: "Itch.io",
                    link: "https://reflextions.itch.io/sam",
                },
                {
                    label: "Scirra Arcade",
                    link: "https://www.construct.net/en/free-online-games/sam-1499/play"
                }
            ],
            images: [
                {
                    src: "/assets/games/sam/1.png",
                    alt: "Sam screenshot",
                },
                {
                    src: "/assets/games/sam/2.png",
                    alt: "Sam screenshot",
                },
                {
                    src: "/assets/games/sam/3.png",
                    alt: "Sam screenshot",
                },
                {
                    src: "/assets/games/sam/4.png",
                    alt: "Sam screenshot",
                },
            ],
        },
        // Minos' Pond
        {
            date: "April 24th, 2017",
            title: "Mino's Pond",
            platform: "laptop",
            size: "small",
            desc: MinosPondDesc,
            hasDesktopPreview: true,
            hasMobilePreview: false,
            src: "https://itch.io/embed-upload/464651?color=0f5c9a",
            cover: "/assets/games/minos/minosCover.png",
            gif: "/assets/games/minos/minos.gif",
            tags: ["web", "jam"],
            links: [
                {
                    label: "Itch.io",
                    link: "https://reflextions.itch.io/minospond",
                },
                {
                    label: "Scirra Arcade",
                    link: "https://www.construct.net/en/free-online-games/minos-pond-1795/play?via=pp"
                },
                {
                    label: "Ludum Dare",
                    link: "https://ldjam.com/events/ludum-dare/38/minos-pond/"
                }
            ],
            images: [
                {
                    src: "/assets/games/minos/ss1.png",
                    alt: "minos screenshot",
                },
                {
                    src: "/assets/games/minos/ss3.png",
                    alt: "minos screenshot",
                },
                {
                    src: "/assets/games/minos/ss4.png",
                    alt: "minos screenshot",
                },
                {
                    src: "/assets/games/minos/ss2.png",
                    alt: "minos screenshot",
                },
                {
                    src: "/assets/games/minos/ss5.gif",
                    alt: "minos screenshot",
                },
            ],

        },
        // Brix Builder
        {
            date: "2016",
            title: "Brix Builder",
            platform: "phone",
            size: "tall",
            desc: BrixDesc,
            hasDesktopPreview: true,
            hasMobilePreview: true,
            src: "https://itch.io/embed-upload/6248551?color=333333",
            cover: "/assets/games/brixbuilder/brixCover.png",
            gif: "/assets/games/brixbuilder/brix.gif",
            icon: "/assets/games/brixbuilder/icon.png",
            tags: ["mobile", "web", "sale"],
            links: [
                {
                    label: "Itch.io",
                    link: "https://reflextions.itch.io/brix-builder",
                },
            ],
            images: [
                {
                    src: "/assets/games/brixbuilder/brixbuilder1.png",
                    alt: "Brix Builder menu screen",
                },
                {
                    src: "/assets/games/brixbuilder/brixbuilder2.png",
                    alt: "Brix Builder screenshot (1)",
                },
                {
                    src: "/assets/games/brixbuilder/brixbuilder3.png",
                    alt: "Brix Builder screenshot (2)",
                },
            ],

        },
        // Rocket Runner
        {
            date: "2016",
            title: "Rocket Runner",
            platform: "phone",
            size: "tall",
            desc: RocketRunnerDesc,
            hasDesktopPreview: true,
            hasMobilePreview: true,
            src: "https://itch.io/embed-upload/6248631?color=333333",
            cover: "/assets/games/rocketrunner/rocketCover.png",
            gif: "/assets/games/rocketrunner/rocket.gif",
            icon: "/assets/games/rocketrunner/icon.png",
            tags: ["mobile", "web", "sale"],
            links: [
                {
                    label: "Itch.io",
                    link: "https://reflextions.itch.io/rocket-runner",
                },
            ],
            images: [
                {
                    src: "/assets/games/rocketrunner/rocketrunner1.png",
                    alt: "Rocket Runner menu screen",
                },
                {
                    src: "/assets/games/rocketrunner/rocketrunner2.png",
                    alt: "Rocket Runner screenshot (1)",
                },
                {
                    src: "/assets/games/rocketrunner/rocketrunner3.png",
                    alt: "Rocket Runner screenshot (2)",
                },
            ],

        },
        // Voter Suppression
        {
            date: "Nov 3, 2016",
            title: "The Voter Suppression Trail",
            platform: "laptop",
            size: "big",
            desc: VoterDesc,
            hasDesktopPreview: false,
            hasMobilePreview: true,
            src: "https://www.nytimes.com/interactive/2016/11/01/opinion/voting-suppression-videogame.html",
            cover: "/assets/games/voter/voterCover.png",
            gif: "/assets/games/voter/voter.gif",
            tags: ["featured", "mobile", "web", "freelance"],
            links: [
                {
                    label: "NY Times",
                    link: "https://www.nytimes.com/interactive/2016/11/01/opinion/voting-suppression-videogame.html",
                },
                {
                    label: "Everyday Arcade",
                    link: "https://everydayarcade.com/games/the-voter-suppression-trail"
                }
            ],
            images: [
                {
                    src: "/assets/games/voter/voter1.png",
                    alt: "Voter Suppression Trail menu screen",
                },
                {
                    src: "/assets/games/voter/voter2.png",
                    alt: "Voter Suppression Trail screenshot (1)",
                },
                {
                    src: "/assets/games/voter/voter3.png",
                    alt: "Voter Suppression Trail screenshot (2)",
                },
                {
                    src: "/assets/games/voter/voter4.png",
                    alt: "Voter Suppression Trail screenshot (4)",
                },
                {
                    src: "/assets/games/voter/voter5.png",
                    alt: "Voter Suppression Trail screenshot (5)",
                },
            ],
        },
        // MTA Country
        {
            date: "May 22, 2018",
            title: "MTA Country",
            platform: "laptop",
            size: "small",
            desc: MTACountryDesc,
            hasDesktopPreview: false,
            hasMobilePreview: true,
            src: "https://everydayarcade.com/games/mta-country",
            cover: "/assets/games/mta/mtaCover.png",
            gif: "/assets/games/mta/mta.gif",
            tags: ["featured", "mobile", "web", "freelance"],
            links: [
                {
                    label: "Everyday Arcade",
                    link: "https://everydayarcade.com/games/mta-country"
                }
            ],
            images: [
                {
                    src: "/assets/games/mta/mta.png",
                    alt: "MTA Country menu screen",
                },
                {
                    src: "/assets/games/mta/mta2.png",
                    alt: "MTA Country screenshot (1)",
                },
                {
                    src: "/assets/games/mta/mta3.png",
                    alt: "MTA Country screenshot (2)",
                },
                {
                    src: "/assets/games/mta/mta4.png",
                    alt: "MTA Country screenshot (3)",
                },
            ],
        },
        // Rocket Strike
        {
            date: "2014",
            title: "Rocket Strike!",
            platform: "laptop",
            size: "small",
            desc: RocketStrikeDesc,
            hasDesktopPreview: true,
            hasMobilePreview: false,
            src: "https://itch.io/embed-upload/1796897?color=333333",
            cover: "/assets/games/rocketstrike/rocketstrikeCover.png",
            gif: "/assets/games/rocketstrike/rocketstrike.gif",
            tags: ["web", "mobile", "featured", "sale"],
            links: [
                {
                    label: "Scirra Arcade",
                    link: "https://www.construct.net/en/free-online-games/rocket-strike-3791/play",
                },
                {
                    label: "Itch.io",
                    link: "https://reflextions.itch.io/rocketstrike",
                },
                {
                    label: "Y8",
                    link: "https://www.y8.com/games/rocket_strike",
                },
                {
                    label: "Chrome Web Store",
                    link: "https://chrome.google.com/webstore/detail/rocket-strike/ldfmjnlghddcjpboloecgkflfednighd?"
                }
            ],
            images: [
                {
                    src: "/assets/games/rocketstrike/ss1.png",
                    alt: "Rocket Strike! screenshot",
                },
                {
                    src: "/assets/games/rocketstrike/ss3.png",
                    alt: "Rocket Strike! screenshot",
                },
                {
                    src: "/assets/games/rocketstrike/ss4.png",
                    alt: "Rocket Strike! screenshot",
                },
                {
                    src: "/assets/games/rocketstrike/ss5.png",
                    alt: "Rocket Strike! screenshot",
                },
            ],
        },
        // Fantaknee Football
        {
            date: "2017",
            title: "Fantaknee Football",
            size: "small",
            platform: "laptop",
            desc: FantakneeDesc,
            hasDesktopPreview: false,
            hasMobilePreview: true,
            src: "https://ilovechrisbaker.com/stuff/Fantaknee-Football/index.html",
            cover: "/assets/games/fantaknee/fantakneeCover.png",
            gif: "/assets/games/fantaknee/fantaknee.gif",
            tags: ["mobile", "web", "freelance"],
            links: [
                {
                    label: "Game",
                    link: "https://ilovechrisbaker.com/fantaknee-football-by-super-deluxe/"
                }
            ],
            images: [
                {
                    src: "/assets/games/fantaknee/fantaknee1.png",
                    alt: "Fantaknee Football menu screen",
                },
                {
                    src: "/assets/games/fantaknee/fantaknee2.png",
                    alt: "Fantaknee Football screenshot (1)",
                },
                {
                    src: "/assets/games/fantaknee/fantaknee3.png",
                    alt: "Fantaknee Football screenshot (2)",
                },
                {
                    src: "/assets/games/fantaknee/fantaknee4.png",
                    alt: "Fantaknee Football screenshot (3)",
                },
            ],
        },

        // Tower Defense
        {
            date: "Aug 2019",
            title: "Tower Defense Prototype",
            size: "small",
            platform: "laptop",
            desc: TowerDefenseDesc,
            hasDesktopPreview: false,
            hasMobilePreview: false,
            cover: "/assets/games/tower/towerCover.png",
            gif: "/assets/games/tower/tower.gif",
            tags: ["freelance"],
            images: [
                {
                    src: "/assets/games/tower/tower1.png",
                    alt: "Tower Defense prototype menu screen",
                },
                {
                    src: "/assets/games/tower/tower2.png",
                    alt: "Tower Defense prototype screenshot (1)",
                },
                {
                    src: "/assets/games/tower/tower3.png",
                    alt: "Tower Defense prototype screenshot (2)",
                },
            ],
        },
        // Chem Game
        {
            date: "June 2017",
            title: "Chemistry Hotspot Quiz",
            size: "small",
            platform: "laptop",
            desc: ChemDesc,
            hasDesktopPreview: false,
            hasMobilePreview: false,
            cover: "/assets/games/chem/chemCover.png",
            gif: "/assets/games/chem/chem.gif",
            tags: ["freelance"],
            images: [
                {
                    src: "/assets/games/chem/chem1.png",
                    alt: "Chemistry Hotspot Quiz menu screen",
                },
                {
                    src: "/assets/games/chem/chem2.png",
                    alt: "Chemistry Hotspot Quiz screenshot (1)",
                },
                {
                    src: "/assets/games/chem/chem3.png",
                    alt: "Chemistry Hotspot Quiz screenshot (2)",
                },
                {
                    src: "/assets/games/chem/chem4.png",
                    alt: "Chemistry Hotspot Quiz screenshot (3)",
                },
            ],
        },
        // Nomzilla
        {
            date: "Dec 2016",
            title: "Monster's Mayhem",
            size: "small",
            platform: "laptop",
            desc: MayhemDesc,
            hasDesktopPreview: false,
            hasMobilePreview: false,
            cover: "/assets/games/nom/nomCover.png",
            gif: "/assets/games/nom/nom.gif",
            tags: ["freelance"],
            images: [
                {
                    src: "/assets/games/nom/nom1.png",
                    alt: "Monster's Mayhem menu screen",
                },
                {
                    src: "/assets/games/nom/nom2.png",
                    alt: "Monster's Mayhem screenshot (1)",
                },
                {
                    src: "/assets/games/nom/nom3.png",
                    alt: "Monster's Mayhem screenshot (2)",
                },
                {
                    src: "/assets/games/nom/nom4.png",
                    alt: "Monster's Mayhem screenshot (3)",
                },
            ],
        },
    ];

    // Adder
    // {
    //     date: "TBD",
    //     title: "Adder",
    //     platform: "laptop",
    //     size: "big",
    //     desc: AdderDesc,
    //     hasDesktopPreview: false,
    //     hasMobilePreview: false,
    //     src: "",
    //     cover: "/assets/games/adder/cover.png",
    //     gif: "/assets/games/adder/adder.gif",
    //     tags: ["featured"],
    //     images: [
    //         {
    //             src: "/assets/games/adder/1.png",
    //             alt: "adder screenshot",
    //         },
    //         {
    //             src: "/assets/games/adder/2.png",
    //             alt: "adder screenshot",
    //         },
    //         {
    //             src: "/assets/games/adder/3.png",
    //             alt: "adder screenshot",
    //         },
    //         {
    //             src: "/assets/games/adder/4.png",
    //             alt: "adder screenshot",
    //         }
    //     ],
    // },

    /* src\components\header\Info.svelte generated by Svelte v3.47.0 */
    const file$w = "src\\components\\header\\Info.svelte";

    function create_fragment$y(ctx) {
    	let div3;
    	let div0;
    	let h1;
    	let t1;
    	let h2;
    	let t3;
    	let div1;
    	let p0;
    	let t5;
    	let p1;
    	let t7;
    	let div2;
    	let a0;
    	let github;
    	let t8;
    	let h40;
    	let t10;
    	let a1;
    	let email;
    	let t11;
    	let h41;
    	let t13;
    	let a2;
    	let linkedin;
    	let t14;
    	let h42;
    	let current;

    	github = new Github({
    			props: {
    				size: /*$iconSize*/ ctx[0],
    				color: "#FFFFFF"
    			},
    			$$inline: true
    		});

    	email = new Email({
    			props: {
    				size: /*$iconSize*/ ctx[0],
    				color: "#EA4335"
    			},
    			$$inline: true
    		});

    	linkedin = new Linkedin({
    			props: {
    				size: /*$iconSize*/ ctx[0],
    				color: "#0A66C2"
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div0 = element("div");
    			h1 = element("h1");
    			h1.textContent = "Nathan Bennett";
    			t1 = space();
    			h2 = element("h2");
    			h2.textContent = "Web & Game Development";
    			t3 = space();
    			div1 = element("div");
    			p0 = element("p");
    			p0.textContent = "I'm a developer interested in building things and solving problems.\r\n            \r\n\r\n            I like working across teams of various disciplines and building\r\n            better user experiences with creativity.";
    			t5 = space();
    			p1 = element("p");
    			p1.textContent = "I have a background in creating and selling web games since I was a teenager\r\n            and I've worked as a professional QA Tester. I'm primarily trained in\r\n            MERN stack but am adaptable and excited to work in collaborative environments.";
    			t7 = space();
    			div2 = element("div");
    			a0 = element("a");
    			create_component(github.$$.fragment);
    			t8 = space();
    			h40 = element("h4");
    			h40.textContent = "Github";
    			t10 = space();
    			a1 = element("a");
    			create_component(email.$$.fragment);
    			t11 = space();
    			h41 = element("h4");
    			h41.textContent = "Email";
    			t13 = space();
    			a2 = element("a");
    			create_component(linkedin.$$.fragment);
    			t14 = space();
    			h42 = element("h4");
    			h42.textContent = "Linkedin";
    			add_location(h1, file$w, 8, 8, 224);
    			add_location(h2, file$w, 9, 8, 257);
    			attr_dev(div0, "class", "info__title content__section");
    			add_location(div0, file$w, 7, 4, 172);
    			add_location(p0, file$w, 13, 8, 373);
    			add_location(p1, file$w, 21, 8, 762);
    			attr_dev(div1, "class", "info__body content__text content__section");
    			add_location(div1, file$w, 12, 4, 308);
    			add_location(h40, file$w, 36, 12, 1402);
    			attr_dev(a0, "href", "https://github.com/ReflextionsDev");
    			attr_dev(a0, "target", "new");
    			attr_dev(a0, "class", "info__link hvr-grow svelte-vow03g");
    			add_location(a0, file$w, 30, 8, 1195);
    			add_location(h41, file$w, 45, 12, 1643);
    			attr_dev(a1, "href", "mailto:nlb.nathan@gmail.com");
    			attr_dev(a1, "target", "new");
    			attr_dev(a1, "class", "info__link hvr-grow svelte-vow03g");
    			add_location(a1, file$w, 39, 8, 1443);
    			add_location(h42, file$w, 53, 12, 1900);
    			attr_dev(a2, "href", "https://www.linkedin.com/in/nathanlbennett/");
    			attr_dev(a2, "target", "new");
    			attr_dev(a2, "class", "info__link hvr-grow svelte-vow03g");
    			add_location(a2, file$w, 47, 8, 1681);
    			attr_dev(div2, "class", "info__links content__section svelte-vow03g");
    			add_location(div2, file$w, 29, 4, 1143);
    			attr_dev(div3, "class", "info content");
    			add_location(div3, file$w, 6, 0, 140);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div0);
    			append_dev(div0, h1);
    			append_dev(div0, t1);
    			append_dev(div0, h2);
    			append_dev(div3, t3);
    			append_dev(div3, div1);
    			append_dev(div1, p0);
    			append_dev(div1, t5);
    			append_dev(div1, p1);
    			append_dev(div3, t7);
    			append_dev(div3, div2);
    			append_dev(div2, a0);
    			mount_component(github, a0, null);
    			append_dev(a0, t8);
    			append_dev(a0, h40);
    			append_dev(div2, t10);
    			append_dev(div2, a1);
    			mount_component(email, a1, null);
    			append_dev(a1, t11);
    			append_dev(a1, h41);
    			append_dev(div2, t13);
    			append_dev(div2, a2);
    			mount_component(linkedin, a2, null);
    			append_dev(a2, t14);
    			append_dev(a2, h42);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const github_changes = {};
    			if (dirty & /*$iconSize*/ 1) github_changes.size = /*$iconSize*/ ctx[0];
    			github.$set(github_changes);
    			const email_changes = {};
    			if (dirty & /*$iconSize*/ 1) email_changes.size = /*$iconSize*/ ctx[0];
    			email.$set(email_changes);
    			const linkedin_changes = {};
    			if (dirty & /*$iconSize*/ 1) linkedin_changes.size = /*$iconSize*/ ctx[0];
    			linkedin.$set(linkedin_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(github.$$.fragment, local);
    			transition_in(email.$$.fragment, local);
    			transition_in(linkedin.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(github.$$.fragment, local);
    			transition_out(email.$$.fragment, local);
    			transition_out(linkedin.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			destroy_component(github);
    			destroy_component(email);
    			destroy_component(linkedin);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$y.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$y($$self, $$props, $$invalidate) {
    	let $iconSize;
    	validate_store(iconSize, 'iconSize');
    	component_subscribe($$self, iconSize, $$value => $$invalidate(0, $iconSize = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Info', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Info> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Email,
    		Github,
    		Linkedin,
    		iconSize,
    		$iconSize
    	});

    	return [$iconSize];
    }

    class Info extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$y, create_fragment$y, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Info",
    			options,
    			id: create_fragment$y.name
    		});
    	}
    }

    /* src\components\header\NavBar.svelte generated by Svelte v3.47.0 */
    const file$v = "src\\components\\header\\NavBar.svelte";

    function create_fragment$x(ctx) {
    	let div6;
    	let div3;
    	let div1;
    	let div0;
    	let h40;
    	let t1;
    	let div2;
    	let a0;
    	let h41;
    	let t3;
    	let a1;
    	let h42;
    	let t5;
    	let div5;
    	let div4;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div6 = element("div");
    			div3 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			h40 = element("h4");
    			h40.textContent = "NLB.DEV";
    			t1 = space();
    			div2 = element("div");
    			a0 = element("a");
    			h41 = element("h4");
    			h41.textContent = "WEB";
    			t3 = space();
    			a1 = element("a");
    			h42 = element("h4");
    			h42.textContent = "GAMES";
    			t5 = space();
    			div5 = element("div");
    			div4 = element("div");
    			add_location(h40, file$v, 47, 31, 1534);
    			attr_dev(div0, "class", "title");
    			add_location(div0, file$v, 47, 12, 1515);
    			attr_dev(div1, "class", "info svelte-10gd6xm");
    			toggle_class(div1, "header", /*header*/ ctx[0]);
    			add_location(div1, file$v, 45, 8, 1393);
    			add_location(h41, file$v, 52, 16, 1680);
    			attr_dev(a0, "href", "/");
    			attr_dev(a0, "class", "tab tab__web svelte-10gd6xm");
    			add_location(a0, file$v, 51, 12, 1629);
    			add_location(h42, file$v, 55, 16, 1782);
    			attr_dev(a1, "href", "/games");
    			attr_dev(a1, "class", "tab tab__games svelte-10gd6xm");
    			add_location(a1, file$v, 54, 12, 1724);
    			attr_dev(div2, "class", "tabs svelte-10gd6xm");
    			toggle_class(div2, "header", /*header*/ ctx[0]);
    			add_location(div2, file$v, 50, 8, 1584);
    			attr_dev(div3, "class", "navitems svelte-10gd6xm");
    			set_style(div3, "--skewAngle", /*skewAngle*/ ctx[1]);
    			toggle_class(div3, "header", /*header*/ ctx[0]);
    			add_location(div3, file$v, 44, 4, 1314);
    			attr_dev(div4, "class", "navbar__fill svelte-10gd6xm");
    			set_style(div4, "--skewAngle", /*skewAngle*/ ctx[1]);
    			set_style(div4, "--fillColor", /*fillColor*/ ctx[2]);
    			add_location(div4, file$v, 63, 8, 1999);
    			attr_dev(div5, "class", "navbar__fill-clip svelte-10gd6xm");
    			add_location(div5, file$v, 62, 4, 1958);
    			attr_dev(div6, "class", "navbar svelte-10gd6xm");
    			add_location(div6, file$v, 43, 0, 1288);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div6, anchor);
    			append_dev(div6, div3);
    			append_dev(div3, div1);
    			append_dev(div1, div0);
    			append_dev(div0, h40);
    			append_dev(div3, t1);
    			append_dev(div3, div2);
    			append_dev(div2, a0);
    			append_dev(a0, h41);
    			append_dev(div2, t3);
    			append_dev(div2, a1);
    			append_dev(a1, h42);
    			append_dev(div6, t5);
    			append_dev(div6, div5);
    			append_dev(div5, div4);

    			if (!mounted) {
    				dispose = listen_dev(window, "scroll", /*scroll_handler*/ ctx[4], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*header*/ 1) {
    				toggle_class(div1, "header", /*header*/ ctx[0]);
    			}

    			if (dirty & /*header*/ 1) {
    				toggle_class(div2, "header", /*header*/ ctx[0]);
    			}

    			if (dirty & /*skewAngle*/ 2) {
    				set_style(div3, "--skewAngle", /*skewAngle*/ ctx[1]);
    			}

    			if (dirty & /*header*/ 1) {
    				toggle_class(div3, "header", /*header*/ ctx[0]);
    			}

    			if (dirty & /*skewAngle*/ 2) {
    				set_style(div4, "--skewAngle", /*skewAngle*/ ctx[1]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div6);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$x.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function easeInQuart(x) {
    	return x * x * x * x;
    }

    function instance$x($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('NavBar', slots, []);
    	let fillColor = theme.bgColors.primary;
    	let { header } = $$props;

    	// Dynamic variable used to change navbar skew as the user scrolls down
    	let skewBase = theme.skewAngle;

    	let skewAngle = skewBase + "deg";

    	// Recalculate skew angle on scroll
    	function NavScroll() {
    		// Scroll angle is determined by scroll progress of the splash content
    		const elem = document.querySelector(".splash__content");

    		let distScrolled = Math.abs(elem.getBoundingClientRect().top);
    		let elemHeight = elem.offsetHeight;

    		// Percentage of the element that has been scrolled, capped at 100
    		let progress = Math.min(Math.round(distScrolled / elemHeight * 100), 100);

    		// Easing function
    		progress = easeInQuart(progress / 100);

    		// Invert top distance,
    		let skewMultiplier = 1 - progress;

    		$$invalidate(1, skewAngle = skewBase * skewMultiplier + "deg");
    	}

    	const writable_props = ['header'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<NavBar> was created with unknown prop '${key}'`);
    	});

    	const scroll_handler = () => NavScroll();

    	$$self.$$set = $$props => {
    		if ('header' in $$props) $$invalidate(0, header = $$props.header);
    	};

    	$$self.$capture_state = () => ({
    		theme,
    		fillColor,
    		header,
    		skewBase,
    		skewAngle,
    		easeInQuart,
    		NavScroll
    	});

    	$$self.$inject_state = $$props => {
    		if ('fillColor' in $$props) $$invalidate(2, fillColor = $$props.fillColor);
    		if ('header' in $$props) $$invalidate(0, header = $$props.header);
    		if ('skewBase' in $$props) skewBase = $$props.skewBase;
    		if ('skewAngle' in $$props) $$invalidate(1, skewAngle = $$props.skewAngle);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [header, skewAngle, fillColor, NavScroll, scroll_handler];
    }

    class NavBar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$x, create_fragment$x, safe_not_equal, { header: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "NavBar",
    			options,
    			id: create_fragment$x.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*header*/ ctx[0] === undefined && !('header' in props)) {
    			console.warn("<NavBar> was created without expected prop 'header'");
    		}
    	}

    	get header() {
    		throw new Error("<NavBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set header(value) {
    		throw new Error("<NavBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\header\Splash.svelte generated by Svelte v3.47.0 */

    const file$u = "src\\components\\header\\Splash.svelte";

    function create_fragment$w(ctx) {
    	let div4;
    	let div0;
    	let t0;
    	let div3;
    	let div1;
    	let info;
    	let div1_resize_listener;
    	let t1;
    	let div2;
    	let nav;
    	let current;
    	let mounted;
    	let dispose;
    	info = new Info({ $$inline: true });

    	nav = new NavBar({
    			props: { header: /*header*/ ctx[2] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			div0 = element("div");
    			t0 = space();
    			div3 = element("div");
    			div1 = element("div");
    			create_component(info.$$.fragment);
    			t1 = space();
    			div2 = element("div");
    			create_component(nav.$$.fragment);
    			attr_dev(div0, "class", "splash__bg background svelte-ufbk2h");
    			toggle_class(div0, "header", /*header*/ ctx[2]);
    			add_location(div0, file$u, 36, 4, 1285);
    			attr_dev(div1, "class", "splash__content svelte-ufbk2h");
    			add_render_callback(() => /*div1_elementresize_handler*/ ctx[7].call(div1));
    			add_location(div1, file$u, 38, 8, 1424);
    			attr_dev(div2, "class", "splash__nav");
    			add_location(div2, file$u, 42, 8, 1537);
    			attr_dev(div3, "class", "splash__blur svelte-ufbk2h");
    			set_style(div3, "--maskColor", /*maskColor*/ ctx[4]);
    			toggle_class(div3, "header", /*header*/ ctx[2]);
    			add_location(div3, file$u, 37, 4, 1341);
    			attr_dev(div4, "class", "splash svelte-ufbk2h");
    			set_style(div4, "--splashTop", /*splashTop*/ ctx[1]);
    			toggle_class(div4, "header", /*header*/ ctx[2]);
    			add_location(div4, file$u, 35, 0, 1212);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div0);
    			append_dev(div4, t0);
    			append_dev(div4, div3);
    			append_dev(div3, div1);
    			mount_component(info, div1, null);
    			div1_resize_listener = add_resize_listener(div1, /*div1_elementresize_handler*/ ctx[7].bind(div1));
    			append_dev(div3, t1);
    			append_dev(div3, div2);
    			mount_component(nav, div2, null);
    			/*div2_binding*/ ctx[8](div2);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(window, "scroll", /*scroll_handler*/ ctx[6], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*header*/ 4) {
    				toggle_class(div0, "header", /*header*/ ctx[2]);
    			}

    			const nav_changes = {};
    			if (dirty & /*header*/ 4) nav_changes.header = /*header*/ ctx[2];
    			nav.$set(nav_changes);

    			if (dirty & /*header*/ 4) {
    				toggle_class(div3, "header", /*header*/ ctx[2]);
    			}

    			if (!current || dirty & /*splashTop*/ 2) {
    				set_style(div4, "--splashTop", /*splashTop*/ ctx[1]);
    			}

    			if (dirty & /*header*/ 4) {
    				toggle_class(div4, "header", /*header*/ ctx[2]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(info.$$.fragment, local);
    			transition_in(nav.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(info.$$.fragment, local);
    			transition_out(nav.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
    			destroy_component(info);
    			div1_resize_listener();
    			destroy_component(nav);
    			/*div2_binding*/ ctx[8](null);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$w.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$w($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Splash', slots, []);
    	let maskColor = theme.bgMasks.blue;

    	// Responsive variables to set splash top to the bottom of content: so sticky position can be used
    	// contentHeight is binded to splash__content, and splashTop is subscribed to content height
    	let contentHeight;

    	let splashTop = "0px";

    	// Header toggles header css class rules, elemNav is binded
    	let header = false;

    	let elemNav;

    	// Check header mode on scroll, checks if the navbar has reached the top of the page
    	function updateHeaderMode() {
    		const navTop = Math.floor(elemNav.getBoundingClientRect().top);

    		navTop <= 0
    		? $$invalidate(2, header = true)
    		: $$invalidate(2, header = false);
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Splash> was created with unknown prop '${key}'`);
    	});

    	const scroll_handler = e => {
    		updateHeaderMode();
    	};

    	function div1_elementresize_handler() {
    		contentHeight = this.offsetHeight;
    		$$invalidate(0, contentHeight);
    	}

    	function div2_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			elemNav = $$value;
    			$$invalidate(3, elemNav);
    		});
    	}

    	$$self.$capture_state = () => ({
    		Info,
    		Nav: NavBar,
    		theme,
    		maskColor,
    		contentHeight,
    		splashTop,
    		header,
    		elemNav,
    		updateHeaderMode
    	});

    	$$self.$inject_state = $$props => {
    		if ('maskColor' in $$props) $$invalidate(4, maskColor = $$props.maskColor);
    		if ('contentHeight' in $$props) $$invalidate(0, contentHeight = $$props.contentHeight);
    		if ('splashTop' in $$props) $$invalidate(1, splashTop = $$props.splashTop);
    		if ('header' in $$props) $$invalidate(2, header = $$props.header);
    		if ('elemNav' in $$props) $$invalidate(3, elemNav = $$props.elemNav);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*contentHeight*/ 1) {
    			$$invalidate(1, splashTop = -contentHeight + "px");
    		}
    	};

    	return [
    		contentHeight,
    		splashTop,
    		header,
    		elemNav,
    		maskColor,
    		updateHeaderMode,
    		scroll_handler,
    		div1_elementresize_handler,
    		div2_binding
    	];
    }

    class Splash extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$w, create_fragment$w, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Splash",
    			options,
    			id: create_fragment$w.name
    		});
    	}
    }

    /* src\pages\ContactForm.svelte generated by Svelte v3.47.0 */

    const file$t = "src\\pages\\ContactForm.svelte";

    function create_fragment$v(ctx) {
    	let h2;
    	let t1;
    	let div1;
    	let div0;
    	let form;
    	let label0;
    	let h40;
    	let t3;
    	let input;
    	let t4;
    	let label1;
    	let h41;
    	let t6;
    	let textarea;
    	let t7;
    	let button;

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			h2.textContent = "Let's work together!";
    			t1 = space();
    			div1 = element("div");
    			div0 = element("div");
    			form = element("form");
    			label0 = element("label");
    			h40 = element("h4");
    			h40.textContent = "Your Email:";
    			t3 = space();
    			input = element("input");
    			t4 = space();
    			label1 = element("label");
    			h41 = element("h4");
    			h41.textContent = "Message:";
    			t6 = space();
    			textarea = element("textarea");
    			t7 = space();
    			button = element("button");
    			button.textContent = "Send";
    			attr_dev(h2, "class", "cta");
    			add_location(h2, file$t, 0, 0, 0);
    			attr_dev(h40, "class", "svelte-3e9vbw");
    			add_location(h40, file$t, 5, 16, 197);
    			attr_dev(input, "type", "email");
    			attr_dev(input, "name", "email");
    			attr_dev(input, "placeholder", "my@email.com");
    			input.required = "true";
    			attr_dev(input, "class", "svelte-3e9vbw");
    			add_location(input, file$t, 6, 16, 235);
    			attr_dev(label0, "class", "svelte-3e9vbw");
    			add_location(label0, file$t, 4, 12, 172);
    			attr_dev(h41, "class", "svelte-3e9vbw");
    			add_location(h41, file$t, 14, 16, 488);
    			attr_dev(textarea, "name", "message");
    			attr_dev(textarea, "placeholder", "Hello world!");
    			textarea.required = "true";
    			attr_dev(textarea, "class", "svelte-3e9vbw");
    			add_location(textarea, file$t, 15, 16, 523);
    			attr_dev(label1, "class", "body svelte-3e9vbw");
    			add_location(label1, file$t, 13, 12, 450);
    			attr_dev(button, "class", "button");
    			attr_dev(button, "type", "submit");
    			add_location(button, file$t, 22, 12, 762);
    			attr_dev(form, "action", "https://formspree.io/f/mzbondka");
    			attr_dev(form, "method", "POST");
    			attr_dev(form, "class", "svelte-3e9vbw");
    			add_location(form, file$t, 3, 8, 97);
    			attr_dev(div0, "class", "contact svelte-3e9vbw");
    			add_location(div0, file$t, 2, 4, 66);
    			attr_dev(div1, "class", "box svelte-3e9vbw");
    			add_location(div1, file$t, 1, 0, 43);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, form);
    			append_dev(form, label0);
    			append_dev(label0, h40);
    			append_dev(label0, t3);
    			append_dev(label0, input);
    			append_dev(form, t4);
    			append_dev(form, label1);
    			append_dev(label1, h41);
    			append_dev(label1, t6);
    			append_dev(label1, textarea);
    			append_dev(form, t7);
    			append_dev(form, button);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$v.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$v($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ContactForm', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ContactForm> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class ContactForm extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$v, create_fragment$v, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ContactForm",
    			options,
    			id: create_fragment$v.name
    		});
    	}
    }

    /* src\components\web\OtherProjects.svelte generated by Svelte v3.47.0 */

    const file$s = "src\\components\\web\\OtherProjects.svelte";

    function get_each_context$6(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (6:4) {#each projects as project}
    function create_each_block$6(ctx) {
    	let div;
    	let h4;
    	let t0_value = /*project*/ ctx[1].title + "";
    	let t0;
    	let t1;
    	let img;
    	let img_src_value;
    	let t2;
    	let p;
    	let t3_value = /*project*/ ctx[1].desc + "";
    	let t3;
    	let t4;

    	const block = {
    		c: function create() {
    			div = element("div");
    			h4 = element("h4");
    			t0 = text(t0_value);
    			t1 = space();
    			img = element("img");
    			t2 = space();
    			p = element("p");
    			t3 = text(t3_value);
    			t4 = space();
    			add_location(h4, file$s, 7, 12, 165);
    			if (!src_url_equal(img.src, img_src_value = /*project*/ ctx[1].img)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "project screenshot");
    			attr_dev(img, "class", "svelte-127rnwj");
    			add_location(img, file$s, 8, 12, 203);
    			attr_dev(p, "class", "svelte-127rnwj");
    			add_location(p, file$s, 9, 12, 267);
    			attr_dev(div, "class", "project svelte-127rnwj");
    			add_location(div, file$s, 6, 8, 130);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h4);
    			append_dev(h4, t0);
    			append_dev(div, t1);
    			append_dev(div, img);
    			append_dev(div, t2);
    			append_dev(div, p);
    			append_dev(p, t3);
    			append_dev(div, t4);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*projects*/ 1 && t0_value !== (t0_value = /*project*/ ctx[1].title + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*projects*/ 1 && !src_url_equal(img.src, img_src_value = /*project*/ ctx[1].img)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*projects*/ 1 && t3_value !== (t3_value = /*project*/ ctx[1].desc + "")) set_data_dev(t3, t3_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$6.name,
    		type: "each",
    		source: "(6:4) {#each projects as project}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$u(ctx) {
    	let div1;
    	let t;
    	let div0;
    	let each_value = /*projects*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$6(get_each_context$6(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div1 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t = space();
    			div0 = element("div");
    			attr_dev(div0, "class", "project svelte-127rnwj");
    			add_location(div0, file$s, 13, 4, 396);
    			attr_dev(div1, "class", "projectGrid content svelte-127rnwj");
    			add_location(div1, file$s, 4, 0, 54);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}

    			append_dev(div1, t);
    			append_dev(div1, div0);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*projects*/ 1) {
    				each_value = /*projects*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$6(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$6(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div1, t);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$u.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$u($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('OtherProjects', slots, []);
    	let { projects = [] } = $$props;
    	const writable_props = ['projects'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<OtherProjects> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('projects' in $$props) $$invalidate(0, projects = $$props.projects);
    	};

    	$$self.$capture_state = () => ({ projects });

    	$$self.$inject_state = $$props => {
    		if ('projects' in $$props) $$invalidate(0, projects = $$props.projects);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [projects];
    }

    class OtherProjects extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$u, create_fragment$u, safe_not_equal, { projects: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "OtherProjects",
    			options,
    			id: create_fragment$u.name
    		});
    	}

    	get projects() {
    		throw new Error("<OtherProjects>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set projects(value) {
    		throw new Error("<OtherProjects>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\SectionBreak.svelte generated by Svelte v3.47.0 */

    const file$r = "src\\components\\SectionBreak.svelte";

    function create_fragment$t(ctx) {
    	let div1;
    	let div0;
    	let h1;
    	let t0;
    	let t1;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			h1 = element("h1");
    			t0 = text(/*title*/ ctx[2]);
    			t1 = space();
    			if (default_slot) default_slot.c();
    			add_location(h1, file$r, 9, 8, 373);
    			attr_dev(div0, "class", "mask svelte-tzxjo2");
    			set_style(div0, "--maskColor", /*maskColor*/ ctx[1]);
    			add_location(div0, file$r, 8, 4, 312);
    			attr_dev(div1, "class", "sectionBreak background svelte-tzxjo2");
    			set_style(div1, "--bgURL", /*bgURL*/ ctx[0]);
    			add_location(div1, file$r, 7, 0, 244);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, h1);
    			append_dev(h1, t0);
    			append_dev(div0, t1);

    			if (default_slot) {
    				default_slot.m(div0, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*title*/ 4) set_data_dev(t0, /*title*/ ctx[2]);

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 8)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[3],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[3])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[3], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*maskColor*/ 2) {
    				set_style(div0, "--maskColor", /*maskColor*/ ctx[1]);
    			}

    			if (!current || dirty & /*bgURL*/ 1) {
    				set_style(div1, "--bgURL", /*bgURL*/ ctx[0]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$t.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$t($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SectionBreak', slots, ['default']);
    	let { bgURL, maskColor } = $$props;
    	let { title = "" } = $$props;
    	const writable_props = ['bgURL', 'maskColor', 'title'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SectionBreak> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('bgURL' in $$props) $$invalidate(0, bgURL = $$props.bgURL);
    		if ('maskColor' in $$props) $$invalidate(1, maskColor = $$props.maskColor);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    		if ('$$scope' in $$props) $$invalidate(3, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ bgURL, maskColor, title });

    	$$self.$inject_state = $$props => {
    		if ('bgURL' in $$props) $$invalidate(0, bgURL = $$props.bgURL);
    		if ('maskColor' in $$props) $$invalidate(1, maskColor = $$props.maskColor);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [bgURL, maskColor, title, $$scope, slots];
    }

    class SectionBreak extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$t, create_fragment$t, safe_not_equal, { bgURL: 0, maskColor: 1, title: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SectionBreak",
    			options,
    			id: create_fragment$t.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*bgURL*/ ctx[0] === undefined && !('bgURL' in props)) {
    			console.warn("<SectionBreak> was created without expected prop 'bgURL'");
    		}

    		if (/*maskColor*/ ctx[1] === undefined && !('maskColor' in props)) {
    			console.warn("<SectionBreak> was created without expected prop 'maskColor'");
    		}
    	}

    	get bgURL() {
    		throw new Error("<SectionBreak>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set bgURL(value) {
    		throw new Error("<SectionBreak>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get maskColor() {
    		throw new Error("<SectionBreak>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set maskColor(value) {
    		throw new Error("<SectionBreak>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<SectionBreak>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<SectionBreak>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\Section.svelte generated by Svelte v3.47.0 */
    const file$q = "src\\components\\Section.svelte";

    function create_fragment$s(ctx) {
    	let div2;
    	let div1;
    	let div0;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[6].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div0, "class", "content");
    			toggle_class(div0, "contentNoClip", /*contentNoClip*/ ctx[3]);
    			add_location(div0, file$q, 23, 8, 654);
    			attr_dev(div1, "class", "slot svelte-1ylse0i");
    			add_location(div1, file$q, 22, 4, 626);
    			attr_dev(div2, "class", "section svelte-1ylse0i");
    			set_style(div2, "--backgroundColor", /*bg*/ ctx[2]);
    			set_style(div2, "--skewAngle", /*skewAngle*/ ctx[4] + 'deg');
    			toggle_class(div2, "top", /*top*/ ctx[0]);
    			toggle_class(div2, "bottom", /*bottom*/ ctx[1]);
    			add_location(div2, file$q, 14, 0, 468);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);
    			append_dev(div1, div0);

    			if (default_slot) {
    				default_slot.m(div0, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 32)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[5],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[5])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[5], dirty, null),
    						null
    					);
    				}
    			}

    			if (dirty & /*contentNoClip*/ 8) {
    				toggle_class(div0, "contentNoClip", /*contentNoClip*/ ctx[3]);
    			}

    			if (!current || dirty & /*bg*/ 4) {
    				set_style(div2, "--backgroundColor", /*bg*/ ctx[2]);
    			}

    			if (dirty & /*top*/ 1) {
    				toggle_class(div2, "top", /*top*/ ctx[0]);
    			}

    			if (dirty & /*bottom*/ 2) {
    				toggle_class(div2, "bottom", /*bottom*/ ctx[1]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$s.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$s($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Section', slots, ['default']);
    	let { top, bottom, bg } = $$props;
    	let { contentNoClip = false } = $$props;
    	let { skewAngle } = theme;
    	const writable_props = ['top', 'bottom', 'bg', 'contentNoClip'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Section> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('top' in $$props) $$invalidate(0, top = $$props.top);
    		if ('bottom' in $$props) $$invalidate(1, bottom = $$props.bottom);
    		if ('bg' in $$props) $$invalidate(2, bg = $$props.bg);
    		if ('contentNoClip' in $$props) $$invalidate(3, contentNoClip = $$props.contentNoClip);
    		if ('$$scope' in $$props) $$invalidate(5, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		theme,
    		top,
    		bottom,
    		bg,
    		contentNoClip,
    		skewAngle
    	});

    	$$self.$inject_state = $$props => {
    		if ('top' in $$props) $$invalidate(0, top = $$props.top);
    		if ('bottom' in $$props) $$invalidate(1, bottom = $$props.bottom);
    		if ('bg' in $$props) $$invalidate(2, bg = $$props.bg);
    		if ('contentNoClip' in $$props) $$invalidate(3, contentNoClip = $$props.contentNoClip);
    		if ('skewAngle' in $$props) $$invalidate(4, skewAngle = $$props.skewAngle);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [top, bottom, bg, contentNoClip, skewAngle, $$scope, slots];
    }

    class Section extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$s, create_fragment$s, safe_not_equal, {
    			top: 0,
    			bottom: 1,
    			bg: 2,
    			contentNoClip: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Section",
    			options,
    			id: create_fragment$s.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*top*/ ctx[0] === undefined && !('top' in props)) {
    			console.warn("<Section> was created without expected prop 'top'");
    		}

    		if (/*bottom*/ ctx[1] === undefined && !('bottom' in props)) {
    			console.warn("<Section> was created without expected prop 'bottom'");
    		}

    		if (/*bg*/ ctx[2] === undefined && !('bg' in props)) {
    			console.warn("<Section> was created without expected prop 'bg'");
    		}
    	}

    	get top() {
    		throw new Error("<Section>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set top(value) {
    		throw new Error("<Section>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get bottom() {
    		throw new Error("<Section>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set bottom(value) {
    		throw new Error("<Section>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get bg() {
    		throw new Error("<Section>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set bg(value) {
    		throw new Error("<Section>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get contentNoClip() {
    		throw new Error("<Section>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set contentNoClip(value) {
    		throw new Error("<Section>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\web\Skills.svelte generated by Svelte v3.47.0 */

    const file$p = "src\\components\\web\\Skills.svelte";

    function get_each_context$5(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[16] = list[i];
    	return child_ctx;
    }

    function get_each_context_1$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[16] = list[i];
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[16] = list[i];
    	return child_ctx;
    }

    // (148:16) {#if icon.type === "frontend"}
    function create_if_block_2$7(ctx) {
    	let div;
    	let span;
    	let t0_value = /*icon*/ ctx[16].label + "";
    	let t0;
    	let t1;
    	let switch_instance;
    	let t2;
    	let current;
    	let mounted;
    	let dispose;
    	var switch_value = /*icon*/ ctx[16].component;

    	function switch_props(ctx) {
    		return {
    			props: {
    				color: /*icon*/ ctx[16].color,
    				size: /*$iconSize*/ ctx[1]
    			},
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props(ctx));
    	}

    	function mouseover_handler(...args) {
    		return /*mouseover_handler*/ ctx[4](/*icon*/ ctx[16], ...args);
    	}

    	function focus_handler(...args) {
    		return /*focus_handler*/ ctx[5](/*icon*/ ctx[16], ...args);
    	}

    	function mouseout_handler(...args) {
    		return /*mouseout_handler*/ ctx[6](/*icon*/ ctx[16], ...args);
    	}

    	function blur_handler(...args) {
    		return /*blur_handler*/ ctx[7](/*icon*/ ctx[16], ...args);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			span = element("span");
    			t0 = text(t0_value);
    			t1 = space();
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			t2 = space();
    			attr_dev(span, "class", "tooltiptext svelte-8nou59");
    			add_location(span, file$p, 155, 24, 4176);
    			attr_dev(div, "class", "hvr-grow tooltip svelte-8nou59");
    			add_location(div, file$p, 148, 20, 3793);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, span);
    			append_dev(span, t0);
    			append_dev(div, t1);

    			if (switch_instance) {
    				mount_component(switch_instance, div, null);
    			}

    			append_dev(div, t2);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(div, "mouseover", mouseover_handler, false, false, false),
    					listen_dev(div, "focus", focus_handler, false, false, false),
    					listen_dev(div, "mouseout", mouseout_handler, false, false, false),
    					listen_dev(div, "blur", blur_handler, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if ((!current || dirty & /*icons*/ 1) && t0_value !== (t0_value = /*icon*/ ctx[16].label + "")) set_data_dev(t0, t0_value);
    			const switch_instance_changes = {};
    			if (dirty & /*icons*/ 1) switch_instance_changes.color = /*icon*/ ctx[16].color;
    			if (dirty & /*$iconSize*/ 2) switch_instance_changes.size = /*$iconSize*/ ctx[1];

    			if (switch_value !== (switch_value = /*icon*/ ctx[16].component)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, div, t2);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (switch_instance) destroy_component(switch_instance);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$7.name,
    		type: "if",
    		source: "(148:16) {#if icon.type === \\\"frontend\\\"}",
    		ctx
    	});

    	return block;
    }

    // (147:12) {#each icons as icon}
    function create_each_block_2(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*icon*/ ctx[16].type === "frontend" && create_if_block_2$7(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*icon*/ ctx[16].type === "frontend") {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*icons*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block_2$7(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2.name,
    		type: "each",
    		source: "(147:12) {#each icons as icon}",
    		ctx
    	});

    	return block;
    }

    // (172:16) {#if icon.type === "backend"}
    function create_if_block_1$8(ctx) {
    	let div;
    	let span;
    	let t0_value = /*icon*/ ctx[16].label + "";
    	let t0;
    	let t1;
    	let switch_instance;
    	let t2;
    	let current;
    	let mounted;
    	let dispose;
    	var switch_value = /*icon*/ ctx[16].component;

    	function switch_props(ctx) {
    		return {
    			props: {
    				color: /*icon*/ ctx[16].color,
    				size: /*$iconSize*/ ctx[1]
    			},
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props(ctx));
    	}

    	function mouseover_handler_1(...args) {
    		return /*mouseover_handler_1*/ ctx[8](/*icon*/ ctx[16], ...args);
    	}

    	function focus_handler_1(...args) {
    		return /*focus_handler_1*/ ctx[9](/*icon*/ ctx[16], ...args);
    	}

    	function mouseout_handler_1(...args) {
    		return /*mouseout_handler_1*/ ctx[10](/*icon*/ ctx[16], ...args);
    	}

    	function blur_handler_1(...args) {
    		return /*blur_handler_1*/ ctx[11](/*icon*/ ctx[16], ...args);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			span = element("span");
    			t0 = text(t0_value);
    			t1 = space();
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			t2 = space();
    			attr_dev(span, "class", "tooltiptext svelte-8nou59");
    			add_location(span, file$p, 179, 24, 5118);
    			attr_dev(div, "class", "hvr-grow tooltip svelte-8nou59");
    			add_location(div, file$p, 172, 20, 4735);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, span);
    			append_dev(span, t0);
    			append_dev(div, t1);

    			if (switch_instance) {
    				mount_component(switch_instance, div, null);
    			}

    			append_dev(div, t2);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(div, "mouseover", mouseover_handler_1, false, false, false),
    					listen_dev(div, "focus", focus_handler_1, false, false, false),
    					listen_dev(div, "mouseout", mouseout_handler_1, false, false, false),
    					listen_dev(div, "blur", blur_handler_1, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if ((!current || dirty & /*icons*/ 1) && t0_value !== (t0_value = /*icon*/ ctx[16].label + "")) set_data_dev(t0, t0_value);
    			const switch_instance_changes = {};
    			if (dirty & /*icons*/ 1) switch_instance_changes.color = /*icon*/ ctx[16].color;
    			if (dirty & /*$iconSize*/ 2) switch_instance_changes.size = /*$iconSize*/ ctx[1];

    			if (switch_value !== (switch_value = /*icon*/ ctx[16].component)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, div, t2);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (switch_instance) destroy_component(switch_instance);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$8.name,
    		type: "if",
    		source: "(172:16) {#if icon.type === \\\"backend\\\"}",
    		ctx
    	});

    	return block;
    }

    // (171:12) {#each icons as icon}
    function create_each_block_1$2(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*icon*/ ctx[16].type === "backend" && create_if_block_1$8(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*icon*/ ctx[16].type === "backend") {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*icons*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block_1$8(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$2.name,
    		type: "each",
    		source: "(171:12) {#each icons as icon}",
    		ctx
    	});

    	return block;
    }

    // (196:16) {#if icon.type === "other"}
    function create_if_block$c(ctx) {
    	let div;
    	let span;
    	let t0_value = /*icon*/ ctx[16].label + "";
    	let t0;
    	let t1;
    	let switch_instance;
    	let t2;
    	let current;
    	let mounted;
    	let dispose;
    	var switch_value = /*icon*/ ctx[16].component;

    	function switch_props(ctx) {
    		return {
    			props: {
    				color: /*icon*/ ctx[16].color,
    				size: /*$iconSize*/ ctx[1]
    			},
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props(ctx));
    	}

    	function mouseover_handler_2(...args) {
    		return /*mouseover_handler_2*/ ctx[12](/*icon*/ ctx[16], ...args);
    	}

    	function focus_handler_2(...args) {
    		return /*focus_handler_2*/ ctx[13](/*icon*/ ctx[16], ...args);
    	}

    	function mouseout_handler_2(...args) {
    		return /*mouseout_handler_2*/ ctx[14](/*icon*/ ctx[16], ...args);
    	}

    	function blur_handler_2(...args) {
    		return /*blur_handler_2*/ ctx[15](/*icon*/ ctx[16], ...args);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			span = element("span");
    			t0 = text(t0_value);
    			t1 = space();
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			t2 = space();
    			attr_dev(span, "class", "tooltiptext svelte-8nou59");
    			add_location(span, file$p, 203, 24, 6055);
    			attr_dev(div, "class", "hvr-grow tooltip svelte-8nou59");
    			add_location(div, file$p, 196, 20, 5672);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, span);
    			append_dev(span, t0);
    			append_dev(div, t1);

    			if (switch_instance) {
    				mount_component(switch_instance, div, null);
    			}

    			append_dev(div, t2);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(div, "mouseover", mouseover_handler_2, false, false, false),
    					listen_dev(div, "focus", focus_handler_2, false, false, false),
    					listen_dev(div, "mouseout", mouseout_handler_2, false, false, false),
    					listen_dev(div, "blur", blur_handler_2, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if ((!current || dirty & /*icons*/ 1) && t0_value !== (t0_value = /*icon*/ ctx[16].label + "")) set_data_dev(t0, t0_value);
    			const switch_instance_changes = {};
    			if (dirty & /*icons*/ 1) switch_instance_changes.color = /*icon*/ ctx[16].color;
    			if (dirty & /*$iconSize*/ 2) switch_instance_changes.size = /*$iconSize*/ ctx[1];

    			if (switch_value !== (switch_value = /*icon*/ ctx[16].component)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, div, t2);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (switch_instance) destroy_component(switch_instance);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$c.name,
    		type: "if",
    		source: "(196:16) {#if icon.type === \\\"other\\\"}",
    		ctx
    	});

    	return block;
    }

    // (195:12) {#each icons as icon}
    function create_each_block$5(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*icon*/ ctx[16].type === "other" && create_if_block$c(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*icon*/ ctx[16].type === "other") {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*icons*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$c(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$5.name,
    		type: "each",
    		source: "(195:12) {#each icons as icon}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$r(ctx) {
    	let div6;
    	let div1;
    	let h30;
    	let t1;
    	let div0;
    	let t2;
    	let div3;
    	let h31;
    	let t4;
    	let div2;
    	let t5;
    	let div5;
    	let h32;
    	let t7;
    	let div4;
    	let t8;
    	let br;
    	let current;
    	let each_value_2 = /*icons*/ ctx[0];
    	validate_each_argument(each_value_2);
    	let each_blocks_2 = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks_2[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    	}

    	const out = i => transition_out(each_blocks_2[i], 1, 1, () => {
    		each_blocks_2[i] = null;
    	});

    	let each_value_1 = /*icons*/ ctx[0];
    	validate_each_argument(each_value_1);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks_1[i] = create_each_block_1$2(get_each_context_1$2(ctx, each_value_1, i));
    	}

    	const out_1 = i => transition_out(each_blocks_1[i], 1, 1, () => {
    		each_blocks_1[i] = null;
    	});

    	let each_value = /*icons*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$5(get_each_context$5(ctx, each_value, i));
    	}

    	const out_2 = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div6 = element("div");
    			div1 = element("div");
    			h30 = element("h3");
    			h30.textContent = "Front-End";
    			t1 = space();
    			div0 = element("div");

    			for (let i = 0; i < each_blocks_2.length; i += 1) {
    				each_blocks_2[i].c();
    			}

    			t2 = space();
    			div3 = element("div");
    			h31 = element("h3");
    			h31.textContent = "Back-End";
    			t4 = space();
    			div2 = element("div");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t5 = space();
    			div5 = element("div");
    			h32 = element("h3");
    			h32.textContent = "Other";
    			t7 = space();
    			div4 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t8 = space();
    			br = element("br");
    			add_location(h30, file$p, 144, 8, 3641);
    			attr_dev(div0, "class", "icons svelte-8nou59");
    			add_location(div0, file$p, 145, 8, 3669);
    			attr_dev(div1, "class", "content__section");
    			add_location(div1, file$p, 143, 4, 3601);
    			add_location(h31, file$p, 168, 8, 4585);
    			attr_dev(div2, "class", "icons svelte-8nou59");
    			add_location(div2, file$p, 169, 8, 4612);
    			attr_dev(div3, "class", "content__section");
    			add_location(div3, file$p, 167, 4, 4545);
    			add_location(h32, file$p, 192, 8, 5527);
    			attr_dev(div4, "class", "icons svelte-8nou59");
    			add_location(div4, file$p, 193, 8, 5551);
    			attr_dev(div5, "class", "content__section");
    			add_location(div5, file$p, 191, 4, 5487);
    			add_location(br, file$p, 214, 4, 6422);
    			attr_dev(div6, "class", "skills content");
    			add_location(div6, file$p, 142, 0, 3567);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div6, anchor);
    			append_dev(div6, div1);
    			append_dev(div1, h30);
    			append_dev(div1, t1);
    			append_dev(div1, div0);

    			for (let i = 0; i < each_blocks_2.length; i += 1) {
    				each_blocks_2[i].m(div0, null);
    			}

    			append_dev(div6, t2);
    			append_dev(div6, div3);
    			append_dev(div3, h31);
    			append_dev(div3, t4);
    			append_dev(div3, div2);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(div2, null);
    			}

    			append_dev(div6, t5);
    			append_dev(div6, div5);
    			append_dev(div5, h32);
    			append_dev(div5, t7);
    			append_dev(div5, div4);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div4, null);
    			}

    			append_dev(div6, t8);
    			append_dev(div6, br);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*iconMouseOver, icons, iconMouseOut, $iconSize*/ 15) {
    				each_value_2 = /*icons*/ ctx[0];
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2(ctx, each_value_2, i);

    					if (each_blocks_2[i]) {
    						each_blocks_2[i].p(child_ctx, dirty);
    						transition_in(each_blocks_2[i], 1);
    					} else {
    						each_blocks_2[i] = create_each_block_2(child_ctx);
    						each_blocks_2[i].c();
    						transition_in(each_blocks_2[i], 1);
    						each_blocks_2[i].m(div0, null);
    					}
    				}

    				group_outros();

    				for (i = each_value_2.length; i < each_blocks_2.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			if (dirty & /*iconMouseOver, icons, iconMouseOut, $iconSize*/ 15) {
    				each_value_1 = /*icons*/ ctx[0];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$2(ctx, each_value_1, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    						transition_in(each_blocks_1[i], 1);
    					} else {
    						each_blocks_1[i] = create_each_block_1$2(child_ctx);
    						each_blocks_1[i].c();
    						transition_in(each_blocks_1[i], 1);
    						each_blocks_1[i].m(div2, null);
    					}
    				}

    				group_outros();

    				for (i = each_value_1.length; i < each_blocks_1.length; i += 1) {
    					out_1(i);
    				}

    				check_outros();
    			}

    			if (dirty & /*iconMouseOver, icons, iconMouseOut, $iconSize*/ 15) {
    				each_value = /*icons*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$5(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$5(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div4, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out_2(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_2.length; i += 1) {
    				transition_in(each_blocks_2[i]);
    			}

    			for (let i = 0; i < each_value_1.length; i += 1) {
    				transition_in(each_blocks_1[i]);
    			}

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks_2 = each_blocks_2.filter(Boolean);

    			for (let i = 0; i < each_blocks_2.length; i += 1) {
    				transition_out(each_blocks_2[i]);
    			}

    			each_blocks_1 = each_blocks_1.filter(Boolean);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				transition_out(each_blocks_1[i]);
    			}

    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div6);
    			destroy_each(each_blocks_2, detaching);
    			destroy_each(each_blocks_1, detaching);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$r.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const colorHover = "#FFFFFF";

    function instance$r($$self, $$props, $$invalidate) {
    	let $iconSize;
    	validate_store(iconSize, 'iconSize');
    	component_subscribe($$self, iconSize, $$value => $$invalidate(1, $iconSize = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Skills', slots, []);

    	let icons = [
    		{
    			label: "Javascript",
    			type: "frontend",
    			component: Javascript,
    			colorDefault: "#F7DF1E",
    			link: ""
    		},
    		{
    			label: "HTML5",
    			type: "frontend",
    			component: Html5,
    			colorDefault: "#E34F26"
    		},
    		{
    			label: "CSS3",
    			type: "frontend",
    			component: CssThree,
    			colorDefault: "#1572B6"
    		},
    		{
    			label: "React",
    			type: "frontend",
    			component: React,
    			colorDefault: "#61DAFB"
    		},
    		{
    			label: "Redux",
    			type: "frontend",
    			component: Redux,
    			colorDefault: "#764ABC"
    		},
    		{
    			label: "Svelte",
    			type: "frontend",
    			component: Svelte,
    			colorDefault: "#FF3E00"
    		},
    		{
    			label: "Node.JS",
    			type: "backend",
    			component: Nodedotjs,
    			colorDefault: "#339933"
    		},
    		{
    			label: "Express",
    			type: "backend",
    			component: Express,
    			colorDefault: "#000000"
    		},
    		{
    			label: "MongoDB",
    			type: "backend",
    			component: Mongodb,
    			colorDefault: "#47A248"
    		},
    		{
    			label: "Amazon AWS",
    			type: "backend",
    			component: Amazonaws,
    			colorDefault: "#232F3E"
    		},
    		{
    			label: "SQLite",
    			type: "backend",
    			component: Sqlite,
    			colorDefault: "#003B57"
    		},
    		{
    			label: "Git",
    			type: "other",
    			component: Git,
    			colorDefault: "#F05032"
    		},
    		{
    			label: "JQuery",
    			type: "other",
    			component: Jquery,
    			colorDefault: "#0769AD"
    		},
    		{
    			label: "Figma",
    			type: "other",
    			component: Figma,
    			colorDefault: "#F24E1E"
    		},
    		{
    			label: "Notion",
    			type: "other",
    			component: Notion,
    			colorDefault: "#000000"
    		},
    		{
    			label: "Construct 3",
    			type: "other",
    			component: ConstructThree,
    			colorDefault: "#96aab9"
    		}
    	];

    	icons.forEach(icon => {
    		// icon.hoverColor = icon.colorDefault
    		// icon.colorDefault = '#FFFFFF'
    		icon.color = icon.colorDefault;

    		icon.hoverColor = colorHover;
    	});

    	// Icon recolor on hover
    	function iconMouseOver(label) {
    		let index = icons.findIndex(icon => icon.label === label);
    		$$invalidate(0, icons[index].color = icons[index].hoverColor, icons);
    	}

    	function iconMouseOut(label) {
    		let index = icons.findIndex(icon => icon.label === label);
    		$$invalidate(0, icons[index].color = icons[index].colorDefault, icons);
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Skills> was created with unknown prop '${key}'`);
    	});

    	const mouseover_handler = (icon, e) => iconMouseOver(icon.label);
    	const focus_handler = (icon, e) => iconMouseOver(icon.label);
    	const mouseout_handler = (icon, e) => iconMouseOut(icon.label);
    	const blur_handler = (icon, e) => iconMouseOut(icon.label);
    	const mouseover_handler_1 = (icon, e) => iconMouseOver(icon.label);
    	const focus_handler_1 = (icon, e) => iconMouseOver(icon.label);
    	const mouseout_handler_1 = (icon, e) => iconMouseOut(icon.label);
    	const blur_handler_1 = (icon, e) => iconMouseOut(icon.label);
    	const mouseover_handler_2 = (icon, e) => iconMouseOver(icon.label);
    	const focus_handler_2 = (icon, e) => iconMouseOver(icon.label);
    	const mouseout_handler_2 = (icon, e) => iconMouseOut(icon.label);
    	const blur_handler_2 = (icon, e) => iconMouseOut(icon.label);

    	$$self.$capture_state = () => ({
    		Javascript,
    		Html5,
    		CssThree,
    		React,
    		Redux,
    		Svelte,
    		NodeDotJs: Nodedotjs,
    		Git,
    		Amazonaws,
    		Mongodb,
    		Express,
    		Notion,
    		ConstructThree,
    		Figma,
    		Sqlite,
    		Jquery,
    		iconSize,
    		colorHover,
    		icons,
    		iconMouseOver,
    		iconMouseOut,
    		$iconSize
    	});

    	$$self.$inject_state = $$props => {
    		if ('icons' in $$props) $$invalidate(0, icons = $$props.icons);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		icons,
    		$iconSize,
    		iconMouseOver,
    		iconMouseOut,
    		mouseover_handler,
    		focus_handler,
    		mouseout_handler,
    		blur_handler,
    		mouseover_handler_1,
    		focus_handler_1,
    		mouseout_handler_1,
    		blur_handler_1,
    		mouseover_handler_2,
    		focus_handler_2,
    		mouseout_handler_2,
    		blur_handler_2
    	];
    }

    class Skills extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$r, create_fragment$r, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Skills",
    			options,
    			id: create_fragment$r.name
    		});
    	}
    }

    var svelte = /*#__PURE__*/Object.freeze({
        __proto__: null,
        SvelteComponent: SvelteComponentDev,
        SvelteComponentTyped: SvelteComponentTyped,
        afterUpdate: afterUpdate,
        beforeUpdate: beforeUpdate,
        createEventDispatcher: createEventDispatcher,
        getAllContexts: getAllContexts,
        getContext: getContext,
        hasContext: hasContext,
        onDestroy: onDestroy,
        onMount: onMount,
        setContext: setContext,
        tick: tick
    });

    /* node_modules\svelte-lightbox\LightboxThumbnail.svelte generated by Svelte v3.47.0 */
    const file$o = "node_modules\\svelte-lightbox\\LightboxThumbnail.svelte";

    function create_fragment$q(ctx) {
    	let div1;
    	let div0;
    	let div0_class_value;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[5].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div0, "class", div0_class_value = "" + (null_to_empty(/*classes*/ ctx[0]) + " svelte-1u332e1"));
    			attr_dev(div0, "style", /*style*/ ctx[1]);
    			toggle_class(div0, "svelte-lightbox-unselectable", /*protect*/ ctx[2]);
    			add_location(div0, file$o, 11, 4, 296);
    			attr_dev(div1, "class", "clickable svelte-1u332e1");
    			add_location(div1, file$o, 10, 0, 231);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);

    			if (default_slot) {
    				default_slot.m(div0, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(div1, "click", /*click_handler*/ ctx[6], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 16)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[4],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[4], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*classes*/ 1 && div0_class_value !== (div0_class_value = "" + (null_to_empty(/*classes*/ ctx[0]) + " svelte-1u332e1"))) {
    				attr_dev(div0, "class", div0_class_value);
    			}

    			if (!current || dirty & /*style*/ 2) {
    				attr_dev(div0, "style", /*style*/ ctx[1]);
    			}

    			if (dirty & /*classes, protect*/ 5) {
    				toggle_class(div0, "svelte-lightbox-unselectable", /*protect*/ ctx[2]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$q.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$q($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('LightboxThumbnail', slots, ['default']);
    	const dispatch = createEventDispatcher();
    	let { class: classes = '' } = $$props;
    	let { style = '' } = $$props;
    	let { protect = false } = $$props;
    	const writable_props = ['class', 'style', 'protect'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<LightboxThumbnail> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => dispatch('click');

    	$$self.$$set = $$props => {
    		if ('class' in $$props) $$invalidate(0, classes = $$props.class);
    		if ('style' in $$props) $$invalidate(1, style = $$props.style);
    		if ('protect' in $$props) $$invalidate(2, protect = $$props.protect);
    		if ('$$scope' in $$props) $$invalidate(4, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		dispatch,
    		classes,
    		style,
    		protect
    	});

    	$$self.$inject_state = $$props => {
    		if ('classes' in $$props) $$invalidate(0, classes = $$props.classes);
    		if ('style' in $$props) $$invalidate(1, style = $$props.style);
    		if ('protect' in $$props) $$invalidate(2, protect = $$props.protect);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [classes, style, protect, dispatch, $$scope, slots, click_handler];
    }

    class LightboxThumbnail extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$q, create_fragment$q, safe_not_equal, { class: 0, style: 1, protect: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "LightboxThumbnail",
    			options,
    			id: create_fragment$q.name
    		});
    	}

    	get class() {
    		throw new Error("<LightboxThumbnail>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<LightboxThumbnail>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<LightboxThumbnail>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<LightboxThumbnail>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get protect() {
    		throw new Error("<LightboxThumbnail>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set protect(value) {
    		throw new Error("<LightboxThumbnail>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
        const o = +getComputedStyle(node).opacity;
        return {
            delay,
            duration,
            easing,
            css: t => `opacity: ${t * o}`
        };
    }

    /* node_modules\svelte-lightbox\Modal\LightboxHeader.svelte generated by Svelte v3.47.0 */
    const file$n = "node_modules\\svelte-lightbox\\Modal\\LightboxHeader.svelte";

    // (14:4) {#if closeButton}
    function create_if_block$b(ctx) {
    	let button;
    	let t;
    	let button_class_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			t = text("×");
    			attr_dev(button, "size", /*size*/ ctx[0]);
    			attr_dev(button, "style", /*style*/ ctx[1]);
    			attr_dev(button, "class", button_class_value = "" + (null_to_empty(/*buttonClasses*/ ctx[3]) + " svelte-fa0syz"));
    			toggle_class(button, "fullscreen", /*fullscreen*/ ctx[5]);
    			add_location(button, file$n, 14, 8, 417);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, t);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*click_handler*/ ctx[7], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*size*/ 1) {
    				attr_dev(button, "size", /*size*/ ctx[0]);
    			}

    			if (dirty & /*style*/ 2) {
    				attr_dev(button, "style", /*style*/ ctx[1]);
    			}

    			if (dirty & /*buttonClasses*/ 8 && button_class_value !== (button_class_value = "" + (null_to_empty(/*buttonClasses*/ ctx[3]) + " svelte-fa0syz"))) {
    				attr_dev(button, "class", button_class_value);
    			}

    			if (dirty & /*buttonClasses, fullscreen*/ 40) {
    				toggle_class(button, "fullscreen", /*fullscreen*/ ctx[5]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$b.name,
    		type: "if",
    		source: "(14:4) {#if closeButton}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$p(ctx) {
    	let div;
    	let div_class_value;
    	let if_block = /*closeButton*/ ctx[4] && create_if_block$b(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (if_block) if_block.c();
    			attr_dev(div, "class", div_class_value = "" + (null_to_empty("svelte-lightbox-header " + /*headerClasses*/ ctx[2]) + " svelte-fa0syz"));
    			toggle_class(div, "fullscreen", /*fullscreen*/ ctx[5]);
    			add_location(div, file$n, 12, 0, 314);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if (if_block) if_block.m(div, null);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*closeButton*/ ctx[4]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$b(ctx);
    					if_block.c();
    					if_block.m(div, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*headerClasses*/ 4 && div_class_value !== (div_class_value = "" + (null_to_empty("svelte-lightbox-header " + /*headerClasses*/ ctx[2]) + " svelte-fa0syz"))) {
    				attr_dev(div, "class", div_class_value);
    			}

    			if (dirty & /*headerClasses, fullscreen*/ 36) {
    				toggle_class(div, "fullscreen", /*fullscreen*/ ctx[5]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$p.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$p($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('LightboxHeader', slots, []);
    	const dispatch = createEventDispatcher();
    	let { size = 'xs' } = $$props;
    	let { style = '' } = $$props;
    	let { headerClasses = '' } = $$props;
    	let { buttonClasses = '' } = $$props;
    	let { closeButton = true } = $$props;
    	let { fullscreen = false } = $$props;
    	const writable_props = ['size', 'style', 'headerClasses', 'buttonClasses', 'closeButton', 'fullscreen'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<LightboxHeader> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => dispatch('close');

    	$$self.$$set = $$props => {
    		if ('size' in $$props) $$invalidate(0, size = $$props.size);
    		if ('style' in $$props) $$invalidate(1, style = $$props.style);
    		if ('headerClasses' in $$props) $$invalidate(2, headerClasses = $$props.headerClasses);
    		if ('buttonClasses' in $$props) $$invalidate(3, buttonClasses = $$props.buttonClasses);
    		if ('closeButton' in $$props) $$invalidate(4, closeButton = $$props.closeButton);
    		if ('fullscreen' in $$props) $$invalidate(5, fullscreen = $$props.fullscreen);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		dispatch,
    		size,
    		style,
    		headerClasses,
    		buttonClasses,
    		closeButton,
    		fullscreen
    	});

    	$$self.$inject_state = $$props => {
    		if ('size' in $$props) $$invalidate(0, size = $$props.size);
    		if ('style' in $$props) $$invalidate(1, style = $$props.style);
    		if ('headerClasses' in $$props) $$invalidate(2, headerClasses = $$props.headerClasses);
    		if ('buttonClasses' in $$props) $$invalidate(3, buttonClasses = $$props.buttonClasses);
    		if ('closeButton' in $$props) $$invalidate(4, closeButton = $$props.closeButton);
    		if ('fullscreen' in $$props) $$invalidate(5, fullscreen = $$props.fullscreen);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		size,
    		style,
    		headerClasses,
    		buttonClasses,
    		closeButton,
    		fullscreen,
    		dispatch,
    		click_handler
    	];
    }

    class LightboxHeader extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$p, create_fragment$p, safe_not_equal, {
    			size: 0,
    			style: 1,
    			headerClasses: 2,
    			buttonClasses: 3,
    			closeButton: 4,
    			fullscreen: 5
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "LightboxHeader",
    			options,
    			id: create_fragment$p.name
    		});
    	}

    	get size() {
    		throw new Error("<LightboxHeader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<LightboxHeader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<LightboxHeader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<LightboxHeader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get headerClasses() {
    		throw new Error("<LightboxHeader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set headerClasses(value) {
    		throw new Error("<LightboxHeader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get buttonClasses() {
    		throw new Error("<LightboxHeader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set buttonClasses(value) {
    		throw new Error("<LightboxHeader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get closeButton() {
    		throw new Error("<LightboxHeader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set closeButton(value) {
    		throw new Error("<LightboxHeader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get fullscreen() {
    		throw new Error("<LightboxHeader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set fullscreen(value) {
    		throw new Error("<LightboxHeader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const presets =  {
        expand: {
            "width": "100%",
            "maxWidth": "",
            "height": "auto",
            "maxHeight": ""
        },
        fit: {
            "width": "",
            "maxWidth": "80vw",
            "height": "",
            "maxHeight": "80vh"
        },
        fullscreen: {
            "width": "100vw",
            "maxWidth": "100vw",
            "height": "100vh",
            "maxHeight": "100vh"
        },
        scroll: {
            "width": "auto",
            "height": "auto",
            "overflow": "scroll"
        }
    };

    /* node_modules\svelte-lightbox\Modal\LightboxBody.svelte generated by Svelte v3.47.0 */

    const { Object: Object_1$2 } = globals;
    const file$m = "node_modules\\svelte-lightbox\\Modal\\LightboxBody.svelte";

    // (51:1) {:else}
    function create_else_block$4(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[10].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[9], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", "svelte-3luti8");
    			toggle_class(div, "svelte-lightbox-image-portrait", /*portrait*/ ctx[2]);
    			toggle_class(div, "expand", /*imagePreset*/ ctx[3] == 'expand');
    			toggle_class(div, "fit", /*imagePreset*/ ctx[3] == 'fit');
    			toggle_class(div, "fullscreen", /*fullscreen*/ ctx[4]);
    			add_location(div, file$m, 51, 2, 2071);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			/*div_binding*/ ctx[11](div);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 512)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[9],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[9])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[9], dirty, null),
    						null
    					);
    				}
    			}

    			if (dirty & /*portrait*/ 4) {
    				toggle_class(div, "svelte-lightbox-image-portrait", /*portrait*/ ctx[2]);
    			}

    			if (dirty & /*imagePreset*/ 8) {
    				toggle_class(div, "expand", /*imagePreset*/ ctx[3] == 'expand');
    			}

    			if (dirty & /*imagePreset*/ 8) {
    				toggle_class(div, "fit", /*imagePreset*/ ctx[3] == 'fit');
    			}

    			if (dirty & /*fullscreen*/ 16) {
    				toggle_class(div, "fullscreen", /*fullscreen*/ ctx[4]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    			/*div_binding*/ ctx[11](null);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$4.name,
    		type: "else",
    		source: "(51:1) {:else}",
    		ctx
    	});

    	return block;
    }

    // (49:1) {#if !fullscreen && image.src}
    function create_if_block$a(ctx) {
    	let img;
    	let img_src_value;
    	let img_alt_value;
    	let img_style_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			if (!src_url_equal(img.src, img_src_value = /*image*/ ctx[0].src)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", img_alt_value = /*image*/ ctx[0].alt);
    			attr_dev(img, "style", img_style_value = /*image*/ ctx[0].style);
    			attr_dev(img, "class", /*imageClass*/ ctx[6]);
    			add_location(img, file$m, 49, 2, 1983);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*image*/ 1 && !src_url_equal(img.src, img_src_value = /*image*/ ctx[0].src)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*image*/ 1 && img_alt_value !== (img_alt_value = /*image*/ ctx[0].alt)) {
    				attr_dev(img, "alt", img_alt_value);
    			}

    			if (dirty & /*image*/ 1 && img_style_value !== (img_style_value = /*image*/ ctx[0].style)) {
    				attr_dev(img, "style", img_style_value);
    			}

    			if (dirty & /*imageClass*/ 64) {
    				attr_dev(img, "class", /*imageClass*/ ctx[6]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$a.name,
    		type: "if",
    		source: "(49:1) {#if !fullscreen && image.src}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$o(ctx) {
    	let div;
    	let current_block_type_index;
    	let if_block;
    	let div_style_value;
    	let current;
    	const if_block_creators = [create_if_block$a, create_else_block$4];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (!/*fullscreen*/ ctx[4] && /*image*/ ctx[0].src) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if_block.c();
    			attr_dev(div, "class", "svelte-lightbox-body svelte-3luti8");

    			attr_dev(div, "style", div_style_value = /*fullscreen*/ ctx[4]
    			? `background-image: url(${/*image*/ ctx[0].src || ''})`
    			: '');

    			toggle_class(div, "svelte-lightbox-unselectable", /*protect*/ ctx[1]);
    			toggle_class(div, "fullscreen", /*fullscreen*/ ctx[4]);
    			add_location(div, file$m, 47, 0, 1780);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if_blocks[current_block_type_index].m(div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(div, null);
    			}

    			if (!current || dirty & /*fullscreen, image*/ 17 && div_style_value !== (div_style_value = /*fullscreen*/ ctx[4]
    			? `background-image: url(${/*image*/ ctx[0].src || ''})`
    			: '')) {
    				attr_dev(div, "style", div_style_value);
    			}

    			if (dirty & /*protect*/ 2) {
    				toggle_class(div, "svelte-lightbox-unselectable", /*protect*/ ctx[1]);
    			}

    			if (dirty & /*fullscreen*/ 16) {
    				toggle_class(div, "fullscreen", /*fullscreen*/ ctx[4]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if_blocks[current_block_type_index].d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$o.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$o($$self, $$props, $$invalidate) {
    	let imageClass;
    	let $activeImageStore;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('LightboxBody', slots, ['default']);
    	let { image = {} } = $$props;
    	let { protect = false } = $$props;
    	let { portrait = false } = $$props;
    	let { imagePreset = false } = $$props;
    	let { fullscreen = false } = $$props;
    	let { gallery = false } = $$props;
    	const activeImageStore = getContext('svelte-lightbox-activeImage');
    	validate_store(activeImageStore, 'activeImageStore');
    	component_subscribe($$self, activeImageStore, value => $$invalidate(12, $activeImageStore = value));
    	let imageParent;

    	const getFullscreenSrc = () => {
    		// Getting image that should been displayed and taking its src
    		if (imageParent) {
    			let imageElement;

    			if (gallery) {
    				// Getting active images src from gallery
    				imageElement = imageParent.firstChild.children[1].children[$activeImageStore].firstChild;
    			} else {
    				// In case of classic lightbox, we just grab image that is first child
    				imageElement = imageParent.firstChild;
    			}

    			// Getting source for lightbox body background and hiding original
    			$$invalidate(0, image.src = imageElement.src, image);

    			imageElement.style.display = 'none';
    		} else {
    			queueMicrotask(getFullscreenSrc);
    		}
    	};

    	const writable_props = ['image', 'protect', 'portrait', 'imagePreset', 'fullscreen', 'gallery'];

    	Object_1$2.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<LightboxBody> was created with unknown prop '${key}'`);
    	});

    	function div_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			imageParent = $$value;
    			$$invalidate(5, imageParent);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('image' in $$props) $$invalidate(0, image = $$props.image);
    		if ('protect' in $$props) $$invalidate(1, protect = $$props.protect);
    		if ('portrait' in $$props) $$invalidate(2, portrait = $$props.portrait);
    		if ('imagePreset' in $$props) $$invalidate(3, imagePreset = $$props.imagePreset);
    		if ('fullscreen' in $$props) $$invalidate(4, fullscreen = $$props.fullscreen);
    		if ('gallery' in $$props) $$invalidate(8, gallery = $$props.gallery);
    		if ('$$scope' in $$props) $$invalidate(9, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		presets,
    		afterUpdate,
    		getContext,
    		image,
    		protect,
    		portrait,
    		imagePreset,
    		fullscreen,
    		gallery,
    		activeImageStore,
    		imageParent,
    		getFullscreenSrc,
    		imageClass,
    		$activeImageStore
    	});

    	$$self.$inject_state = $$props => {
    		if ('image' in $$props) $$invalidate(0, image = $$props.image);
    		if ('protect' in $$props) $$invalidate(1, protect = $$props.protect);
    		if ('portrait' in $$props) $$invalidate(2, portrait = $$props.portrait);
    		if ('imagePreset' in $$props) $$invalidate(3, imagePreset = $$props.imagePreset);
    		if ('fullscreen' in $$props) $$invalidate(4, fullscreen = $$props.fullscreen);
    		if ('gallery' in $$props) $$invalidate(8, gallery = $$props.gallery);
    		if ('imageParent' in $$props) $$invalidate(5, imageParent = $$props.imageParent);
    		if ('imageClass' in $$props) $$invalidate(6, imageClass = $$props.imageClass);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*imageParent, imagePreset*/ 40) {
    			if (imageParent && imagePreset && presets[imagePreset]) {
    				const imageStyle = imageParent.firstChild.style;
    				const styles = Object.keys(presets[imagePreset]);

    				for (let i = 0; i !== styles.length; i++) {
    					imageStyle[styles[i]] = presets[imagePreset][i];
    				}
    			}
    		}

    		if ($$self.$$.dirty & /*image, imagePreset*/ 9) {
    			$$invalidate(6, imageClass = `${image.class ? image.class : ''} ${imagePreset ? imagePreset : ''}`);
    		}

    		if ($$self.$$.dirty & /*fullscreen, image*/ 17) {
    			if (fullscreen && !image?.src) getFullscreenSrc();
    		}

    		if ($$self.$$.dirty & /*fullscreen*/ 16) {
    			if (fullscreen) {
    				// In case user uses fullscreen preset, we need to get image source from new image and hide it
    				afterUpdate(getFullscreenSrc);
    			}
    		}
    	};

    	return [
    		image,
    		protect,
    		portrait,
    		imagePreset,
    		fullscreen,
    		imageParent,
    		imageClass,
    		activeImageStore,
    		gallery,
    		$$scope,
    		slots,
    		div_binding
    	];
    }

    class LightboxBody extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$o, create_fragment$o, safe_not_equal, {
    			image: 0,
    			protect: 1,
    			portrait: 2,
    			imagePreset: 3,
    			fullscreen: 4,
    			gallery: 8
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "LightboxBody",
    			options,
    			id: create_fragment$o.name
    		});
    	}

    	get image() {
    		throw new Error("<LightboxBody>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set image(value) {
    		throw new Error("<LightboxBody>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get protect() {
    		throw new Error("<LightboxBody>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set protect(value) {
    		throw new Error("<LightboxBody>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get portrait() {
    		throw new Error("<LightboxBody>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set portrait(value) {
    		throw new Error("<LightboxBody>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get imagePreset() {
    		throw new Error("<LightboxBody>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set imagePreset(value) {
    		throw new Error("<LightboxBody>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get fullscreen() {
    		throw new Error("<LightboxBody>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set fullscreen(value) {
    		throw new Error("<LightboxBody>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get gallery() {
    		throw new Error("<LightboxBody>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set gallery(value) {
    		throw new Error("<LightboxBody>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\svelte-lightbox\Modal\LightboxFooter.svelte generated by Svelte v3.47.0 */

    const file$l = "node_modules\\svelte-lightbox\\Modal\\LightboxFooter.svelte";

    // (18:4) {#if galleryLength}
    function create_if_block$9(ctx) {
    	let p;
    	let t0;
    	let t1_value = /*activeImage*/ ctx[3] + 1 + "";
    	let t1;
    	let t2;
    	let t3;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t0 = text("Image ");
    			t1 = text(t1_value);
    			t2 = text(" of ");
    			t3 = text(/*galleryLength*/ ctx[2]);
    			add_location(p, file$l, 18, 8, 373);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t0);
    			append_dev(p, t1);
    			append_dev(p, t2);
    			append_dev(p, t3);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*activeImage*/ 8 && t1_value !== (t1_value = /*activeImage*/ ctx[3] + 1 + "")) set_data_dev(t1, t1_value);
    			if (dirty & /*galleryLength*/ 4) set_data_dev(t3, /*galleryLength*/ ctx[2]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$9.name,
    		type: "if",
    		source: "(18:4) {#if galleryLength}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$n(ctx) {
    	let div;
    	let h2;
    	let t0;
    	let h5;
    	let t1;
    	let div_class_value;
    	let if_block = /*galleryLength*/ ctx[2] && create_if_block$9(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			h2 = element("h2");
    			t0 = space();
    			h5 = element("h5");
    			t1 = space();
    			if (if_block) if_block.c();
    			add_location(h2, file$l, 11, 4, 257);
    			add_location(h5, file$l, 14, 4, 298);
    			attr_dev(div, "class", div_class_value = "" + (null_to_empty("svelte-lightbox-footer " + /*classes*/ ctx[4]) + " svelte-1u8lh7d"));
    			attr_dev(div, "style", /*style*/ ctx[5]);
    			add_location(div, file$l, 10, 0, 195);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h2);
    			h2.innerHTML = /*title*/ ctx[0];
    			append_dev(div, t0);
    			append_dev(div, h5);
    			h5.innerHTML = /*description*/ ctx[1];
    			append_dev(div, t1);
    			if (if_block) if_block.m(div, null);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*title*/ 1) h2.innerHTML = /*title*/ ctx[0];			if (dirty & /*description*/ 2) h5.innerHTML = /*description*/ ctx[1];
    			if (/*galleryLength*/ ctx[2]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$9(ctx);
    					if_block.c();
    					if_block.m(div, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*classes*/ 16 && div_class_value !== (div_class_value = "" + (null_to_empty("svelte-lightbox-footer " + /*classes*/ ctx[4]) + " svelte-1u8lh7d"))) {
    				attr_dev(div, "class", div_class_value);
    			}

    			if (dirty & /*style*/ 32) {
    				attr_dev(div, "style", /*style*/ ctx[5]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$n.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$n($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('LightboxFooter', slots, []);
    	let { title = '' } = $$props;
    	let { description = '' } = $$props;
    	let { galleryLength } = $$props;
    	let { activeImage } = $$props;
    	let { classes = '' } = $$props;
    	let { style = '' } = $$props;
    	const writable_props = ['title', 'description', 'galleryLength', 'activeImage', 'classes', 'style'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<LightboxFooter> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('description' in $$props) $$invalidate(1, description = $$props.description);
    		if ('galleryLength' in $$props) $$invalidate(2, galleryLength = $$props.galleryLength);
    		if ('activeImage' in $$props) $$invalidate(3, activeImage = $$props.activeImage);
    		if ('classes' in $$props) $$invalidate(4, classes = $$props.classes);
    		if ('style' in $$props) $$invalidate(5, style = $$props.style);
    	};

    	$$self.$capture_state = () => ({
    		title,
    		description,
    		galleryLength,
    		activeImage,
    		classes,
    		style
    	});

    	$$self.$inject_state = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('description' in $$props) $$invalidate(1, description = $$props.description);
    		if ('galleryLength' in $$props) $$invalidate(2, galleryLength = $$props.galleryLength);
    		if ('activeImage' in $$props) $$invalidate(3, activeImage = $$props.activeImage);
    		if ('classes' in $$props) $$invalidate(4, classes = $$props.classes);
    		if ('style' in $$props) $$invalidate(5, style = $$props.style);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [title, description, galleryLength, activeImage, classes, style];
    }

    class LightboxFooter extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$n, create_fragment$n, safe_not_equal, {
    			title: 0,
    			description: 1,
    			galleryLength: 2,
    			activeImage: 3,
    			classes: 4,
    			style: 5
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "LightboxFooter",
    			options,
    			id: create_fragment$n.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*galleryLength*/ ctx[2] === undefined && !('galleryLength' in props)) {
    			console.warn("<LightboxFooter> was created without expected prop 'galleryLength'");
    		}

    		if (/*activeImage*/ ctx[3] === undefined && !('activeImage' in props)) {
    			console.warn("<LightboxFooter> was created without expected prop 'activeImage'");
    		}
    	}

    	get title() {
    		throw new Error("<LightboxFooter>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<LightboxFooter>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get description() {
    		throw new Error("<LightboxFooter>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set description(value) {
    		throw new Error("<LightboxFooter>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get galleryLength() {
    		throw new Error("<LightboxFooter>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set galleryLength(value) {
    		throw new Error("<LightboxFooter>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get activeImage() {
    		throw new Error("<LightboxFooter>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set activeImage(value) {
    		throw new Error("<LightboxFooter>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get classes() {
    		throw new Error("<LightboxFooter>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set classes(value) {
    		throw new Error("<LightboxFooter>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<LightboxFooter>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<LightboxFooter>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\svelte-lightbox\Modal\ModalCover.svelte generated by Svelte v3.47.0 */
    const file$k = "node_modules\\svelte-lightbox\\Modal\\ModalCover.svelte";

    function create_fragment$m(ctx) {
    	let div;
    	let div_intro;
    	let div_outro;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", "svelte-o5rrpx");
    			add_location(div, file$k, 12, 0, 255);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(div, "click", /*click_handler*/ ctx[3], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);

    			add_render_callback(() => {
    				if (div_outro) div_outro.end(1);

    				div_intro = create_in_transition(div, fade, {
    					duration: /*transitionDuration*/ ctx[0] * 2
    				});

    				div_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			if (div_intro) div_intro.invalidate();

    			div_outro = create_out_transition(div, fade, {
    				duration: /*transitionDuration*/ ctx[0] / 2
    			});

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    			if (detaching && div_outro) div_outro.end();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$m.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$m($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ModalCover', slots, ['default']);
    	let { transitionDuration } = $$props;
    	const dispatch = createEventDispatcher();

    	const click = () => {
    		dispatch('click');
    	};

    	const writable_props = ['transitionDuration'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ModalCover> was created with unknown prop '${key}'`);
    	});

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ('transitionDuration' in $$props) $$invalidate(0, transitionDuration = $$props.transitionDuration);
    		if ('$$scope' in $$props) $$invalidate(1, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		fade,
    		createEventDispatcher,
    		transitionDuration,
    		dispatch,
    		click
    	});

    	$$self.$inject_state = $$props => {
    		if ('transitionDuration' in $$props) $$invalidate(0, transitionDuration = $$props.transitionDuration);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [transitionDuration, $$scope, slots, click_handler];
    }

    class ModalCover extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$m, create_fragment$m, safe_not_equal, { transitionDuration: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ModalCover",
    			options,
    			id: create_fragment$m.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*transitionDuration*/ ctx[0] === undefined && !('transitionDuration' in props)) {
    			console.warn("<ModalCover> was created without expected prop 'transitionDuration'");
    		}
    	}

    	get transitionDuration() {
    		throw new Error("<ModalCover>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set transitionDuration(value) {
    		throw new Error("<ModalCover>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\svelte-lightbox\Modal\Modal.svelte generated by Svelte v3.47.0 */
    const file$j = "node_modules\\svelte-lightbox\\Modal\\Modal.svelte";

    function create_fragment$l(ctx) {
    	let div;
    	let div_class_value;
    	let div_transition;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[5].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", div_class_value = "" + (null_to_empty(/*modalClasses*/ ctx[1]) + " svelte-12ihcp1"));
    			attr_dev(div, "style", /*modalStyle*/ ctx[0]);
    			toggle_class(div, "fullscreen", /*fullscreen*/ ctx[3]);
    			add_location(div, file$j, 16, 0, 347);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(div, "click", /*click_handler*/ ctx[6], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 16)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[4],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[4], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*modalClasses*/ 2 && div_class_value !== (div_class_value = "" + (null_to_empty(/*modalClasses*/ ctx[1]) + " svelte-12ihcp1"))) {
    				attr_dev(div, "class", div_class_value);
    			}

    			if (!current || dirty & /*modalStyle*/ 1) {
    				attr_dev(div, "style", /*modalStyle*/ ctx[0]);
    			}

    			if (dirty & /*modalClasses, fullscreen*/ 10) {
    				toggle_class(div, "fullscreen", /*fullscreen*/ ctx[3]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);

    			add_render_callback(() => {
    				if (!div_transition) div_transition = create_bidirectional_transition(div, fade, { duration: /*transitionDuration*/ ctx[2] }, true);
    				div_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			if (!div_transition) div_transition = create_bidirectional_transition(div, fade, { duration: /*transitionDuration*/ ctx[2] }, false);
    			div_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    			if (detaching && div_transition) div_transition.end();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$l.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$l($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Modal', slots, ['default']);
    	const dispatch = createEventDispatcher();
    	let { modalStyle } = $$props;
    	let { modalClasses } = $$props;
    	let { transitionDuration } = $$props;
    	let { fullscreen = false } = $$props;

    	const click = () => {
    		dispatch('click');
    	};

    	const writable_props = ['modalStyle', 'modalClasses', 'transitionDuration', 'fullscreen'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Modal> was created with unknown prop '${key}'`);
    	});

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ('modalStyle' in $$props) $$invalidate(0, modalStyle = $$props.modalStyle);
    		if ('modalClasses' in $$props) $$invalidate(1, modalClasses = $$props.modalClasses);
    		if ('transitionDuration' in $$props) $$invalidate(2, transitionDuration = $$props.transitionDuration);
    		if ('fullscreen' in $$props) $$invalidate(3, fullscreen = $$props.fullscreen);
    		if ('$$scope' in $$props) $$invalidate(4, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		fade,
    		createEventDispatcher,
    		dispatch,
    		modalStyle,
    		modalClasses,
    		transitionDuration,
    		fullscreen,
    		click
    	});

    	$$self.$inject_state = $$props => {
    		if ('modalStyle' in $$props) $$invalidate(0, modalStyle = $$props.modalStyle);
    		if ('modalClasses' in $$props) $$invalidate(1, modalClasses = $$props.modalClasses);
    		if ('transitionDuration' in $$props) $$invalidate(2, transitionDuration = $$props.transitionDuration);
    		if ('fullscreen' in $$props) $$invalidate(3, fullscreen = $$props.fullscreen);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		modalStyle,
    		modalClasses,
    		transitionDuration,
    		fullscreen,
    		$$scope,
    		slots,
    		click_handler
    	];
    }

    class Modal$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$l, create_fragment$l, safe_not_equal, {
    			modalStyle: 0,
    			modalClasses: 1,
    			transitionDuration: 2,
    			fullscreen: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Modal",
    			options,
    			id: create_fragment$l.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*modalStyle*/ ctx[0] === undefined && !('modalStyle' in props)) {
    			console.warn("<Modal> was created without expected prop 'modalStyle'");
    		}

    		if (/*modalClasses*/ ctx[1] === undefined && !('modalClasses' in props)) {
    			console.warn("<Modal> was created without expected prop 'modalClasses'");
    		}

    		if (/*transitionDuration*/ ctx[2] === undefined && !('transitionDuration' in props)) {
    			console.warn("<Modal> was created without expected prop 'transitionDuration'");
    		}
    	}

    	get modalStyle() {
    		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set modalStyle(value) {
    		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get modalClasses() {
    		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set modalClasses(value) {
    		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get transitionDuration() {
    		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set transitionDuration(value) {
    		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get fullscreen() {
    		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set fullscreen(value) {
    		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\svelte-lightbox\Modal\Index.svelte generated by Svelte v3.47.0 */

    // (46:8) <Body bind:image={image} bind:protect={protect} bind:portrait={portrait} {imagePreset} {fullscreen} gallery={!!gallery.length}>
    function create_default_slot_2$3(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[17].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[32], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty[1] & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[32],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[32])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[32], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$3.name,
    		type: "slot",
    		source: "(46:8) <Body bind:image={image} bind:protect={protect} bind:portrait={portrait} {imagePreset} {fullscreen} gallery={!!gallery.length}>",
    		ctx
    	});

    	return block;
    }

    // (43:4) <Modal bind:modalClasses bind:modalStyle bind:transitionDuration {fullscreen} on:click={ () => dispatch('modalClick') }>
    function create_default_slot_1$5(ctx) {
    	let header;
    	let updating_closeButton;
    	let t0;
    	let body;
    	let updating_image;
    	let updating_protect;
    	let updating_portrait;
    	let t1;
    	let footer;
    	let updating_title;
    	let updating_description;
    	let updating_activeImage;
    	let current;

    	function header_closeButton_binding(value) {
    		/*header_closeButton_binding*/ ctx[18](value);
    	}

    	let header_props = { fullscreen: /*fullscreen*/ ctx[12] };

    	if (/*closeButton*/ ctx[6] !== void 0) {
    		header_props.closeButton = /*closeButton*/ ctx[6];
    	}

    	header = new LightboxHeader({ props: header_props, $$inline: true });
    	binding_callbacks.push(() => bind$1(header, 'closeButton', header_closeButton_binding));
    	header.$on("close", /*close_handler*/ ctx[19]);

    	function body_image_binding(value) {
    		/*body_image_binding*/ ctx[20](value);
    	}

    	function body_protect_binding(value) {
    		/*body_protect_binding*/ ctx[21](value);
    	}

    	function body_portrait_binding(value) {
    		/*body_portrait_binding*/ ctx[22](value);
    	}

    	let body_props = {
    		imagePreset: /*imagePreset*/ ctx[8],
    		fullscreen: /*fullscreen*/ ctx[12],
    		gallery: !!/*gallery*/ ctx[7].length,
    		$$slots: { default: [create_default_slot_2$3] },
    		$$scope: { ctx }
    	};

    	if (/*image*/ ctx[3] !== void 0) {
    		body_props.image = /*image*/ ctx[3];
    	}

    	if (/*protect*/ ctx[4] !== void 0) {
    		body_props.protect = /*protect*/ ctx[4];
    	}

    	if (/*portrait*/ ctx[5] !== void 0) {
    		body_props.portrait = /*portrait*/ ctx[5];
    	}

    	body = new LightboxBody({ props: body_props, $$inline: true });
    	binding_callbacks.push(() => bind$1(body, 'image', body_image_binding));
    	binding_callbacks.push(() => bind$1(body, 'protect', body_protect_binding));
    	binding_callbacks.push(() => bind$1(body, 'portrait', body_portrait_binding));

    	function footer_title_binding(value) {
    		/*footer_title_binding*/ ctx[23](value);
    	}

    	function footer_description_binding(value) {
    		/*footer_description_binding*/ ctx[24](value);
    	}

    	function footer_activeImage_binding(value) {
    		/*footer_activeImage_binding*/ ctx[25](value);
    	}

    	let footer_props = {
    		galleryLength: /*gallery*/ ctx[7] ? /*gallery*/ ctx[7].length : false
    	};

    	if (/*actualTitle*/ ctx[10] !== void 0) {
    		footer_props.title = /*actualTitle*/ ctx[10];
    	}

    	if (/*actualDescription*/ ctx[11] !== void 0) {
    		footer_props.description = /*actualDescription*/ ctx[11];
    	}

    	if (/*$activeImageStore*/ ctx[9] !== void 0) {
    		footer_props.activeImage = /*$activeImageStore*/ ctx[9];
    	}

    	footer = new LightboxFooter({ props: footer_props, $$inline: true });
    	binding_callbacks.push(() => bind$1(footer, 'title', footer_title_binding));
    	binding_callbacks.push(() => bind$1(footer, 'description', footer_description_binding));
    	binding_callbacks.push(() => bind$1(footer, 'activeImage', footer_activeImage_binding));

    	const block = {
    		c: function create() {
    			create_component(header.$$.fragment);
    			t0 = space();
    			create_component(body.$$.fragment);
    			t1 = space();
    			create_component(footer.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(header, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(body, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(footer, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const header_changes = {};
    			if (dirty[0] & /*fullscreen*/ 4096) header_changes.fullscreen = /*fullscreen*/ ctx[12];

    			if (!updating_closeButton && dirty[0] & /*closeButton*/ 64) {
    				updating_closeButton = true;
    				header_changes.closeButton = /*closeButton*/ ctx[6];
    				add_flush_callback(() => updating_closeButton = false);
    			}

    			header.$set(header_changes);
    			const body_changes = {};
    			if (dirty[0] & /*imagePreset*/ 256) body_changes.imagePreset = /*imagePreset*/ ctx[8];
    			if (dirty[0] & /*fullscreen*/ 4096) body_changes.fullscreen = /*fullscreen*/ ctx[12];
    			if (dirty[0] & /*gallery*/ 128) body_changes.gallery = !!/*gallery*/ ctx[7].length;

    			if (dirty[1] & /*$$scope*/ 2) {
    				body_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_image && dirty[0] & /*image*/ 8) {
    				updating_image = true;
    				body_changes.image = /*image*/ ctx[3];
    				add_flush_callback(() => updating_image = false);
    			}

    			if (!updating_protect && dirty[0] & /*protect*/ 16) {
    				updating_protect = true;
    				body_changes.protect = /*protect*/ ctx[4];
    				add_flush_callback(() => updating_protect = false);
    			}

    			if (!updating_portrait && dirty[0] & /*portrait*/ 32) {
    				updating_portrait = true;
    				body_changes.portrait = /*portrait*/ ctx[5];
    				add_flush_callback(() => updating_portrait = false);
    			}

    			body.$set(body_changes);
    			const footer_changes = {};
    			if (dirty[0] & /*gallery*/ 128) footer_changes.galleryLength = /*gallery*/ ctx[7] ? /*gallery*/ ctx[7].length : false;

    			if (!updating_title && dirty[0] & /*actualTitle*/ 1024) {
    				updating_title = true;
    				footer_changes.title = /*actualTitle*/ ctx[10];
    				add_flush_callback(() => updating_title = false);
    			}

    			if (!updating_description && dirty[0] & /*actualDescription*/ 2048) {
    				updating_description = true;
    				footer_changes.description = /*actualDescription*/ ctx[11];
    				add_flush_callback(() => updating_description = false);
    			}

    			if (!updating_activeImage && dirty[0] & /*$activeImageStore*/ 512) {
    				updating_activeImage = true;
    				footer_changes.activeImage = /*$activeImageStore*/ ctx[9];
    				add_flush_callback(() => updating_activeImage = false);
    			}

    			footer.$set(footer_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(body.$$.fragment, local);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(body.$$.fragment, local);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(header, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(body, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(footer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$5.name,
    		type: "slot",
    		source: "(43:4) <Modal bind:modalClasses bind:modalStyle bind:transitionDuration {fullscreen} on:click={ () => dispatch('modalClick') }>",
    		ctx
    	});

    	return block;
    }

    // (42:0) <ModalCover bind:transitionDuration on:click={ () => dispatch('topModalClick') }>
    function create_default_slot$8(ctx) {
    	let modal;
    	let updating_modalClasses;
    	let updating_modalStyle;
    	let updating_transitionDuration;
    	let current;

    	function modal_modalClasses_binding(value) {
    		/*modal_modalClasses_binding*/ ctx[26](value);
    	}

    	function modal_modalStyle_binding(value) {
    		/*modal_modalStyle_binding*/ ctx[27](value);
    	}

    	function modal_transitionDuration_binding(value) {
    		/*modal_transitionDuration_binding*/ ctx[28](value);
    	}

    	let modal_props = {
    		fullscreen: /*fullscreen*/ ctx[12],
    		$$slots: { default: [create_default_slot_1$5] },
    		$$scope: { ctx }
    	};

    	if (/*modalClasses*/ ctx[0] !== void 0) {
    		modal_props.modalClasses = /*modalClasses*/ ctx[0];
    	}

    	if (/*modalStyle*/ ctx[1] !== void 0) {
    		modal_props.modalStyle = /*modalStyle*/ ctx[1];
    	}

    	if (/*transitionDuration*/ ctx[2] !== void 0) {
    		modal_props.transitionDuration = /*transitionDuration*/ ctx[2];
    	}

    	modal = new Modal$1({ props: modal_props, $$inline: true });
    	binding_callbacks.push(() => bind$1(modal, 'modalClasses', modal_modalClasses_binding));
    	binding_callbacks.push(() => bind$1(modal, 'modalStyle', modal_modalStyle_binding));
    	binding_callbacks.push(() => bind$1(modal, 'transitionDuration', modal_transitionDuration_binding));
    	modal.$on("click", /*click_handler*/ ctx[29]);

    	const block = {
    		c: function create() {
    			create_component(modal.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(modal, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const modal_changes = {};
    			if (dirty[0] & /*fullscreen*/ 4096) modal_changes.fullscreen = /*fullscreen*/ ctx[12];

    			if (dirty[0] & /*gallery, actualTitle, actualDescription, $activeImageStore, imagePreset, fullscreen, image, protect, portrait, closeButton*/ 8184 | dirty[1] & /*$$scope*/ 2) {
    				modal_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_modalClasses && dirty[0] & /*modalClasses*/ 1) {
    				updating_modalClasses = true;
    				modal_changes.modalClasses = /*modalClasses*/ ctx[0];
    				add_flush_callback(() => updating_modalClasses = false);
    			}

    			if (!updating_modalStyle && dirty[0] & /*modalStyle*/ 2) {
    				updating_modalStyle = true;
    				modal_changes.modalStyle = /*modalStyle*/ ctx[1];
    				add_flush_callback(() => updating_modalStyle = false);
    			}

    			if (!updating_transitionDuration && dirty[0] & /*transitionDuration*/ 4) {
    				updating_transitionDuration = true;
    				modal_changes.transitionDuration = /*transitionDuration*/ ctx[2];
    				add_flush_callback(() => updating_transitionDuration = false);
    			}

    			modal.$set(modal_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(modal.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(modal.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(modal, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$8.name,
    		type: "slot",
    		source: "(42:0) <ModalCover bind:transitionDuration on:click={ () => dispatch('topModalClick') }>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$k(ctx) {
    	let modalcover;
    	let updating_transitionDuration;
    	let current;

    	function modalcover_transitionDuration_binding(value) {
    		/*modalcover_transitionDuration_binding*/ ctx[30](value);
    	}

    	let modalcover_props = {
    		$$slots: { default: [create_default_slot$8] },
    		$$scope: { ctx }
    	};

    	if (/*transitionDuration*/ ctx[2] !== void 0) {
    		modalcover_props.transitionDuration = /*transitionDuration*/ ctx[2];
    	}

    	modalcover = new ModalCover({ props: modalcover_props, $$inline: true });
    	binding_callbacks.push(() => bind$1(modalcover, 'transitionDuration', modalcover_transitionDuration_binding));
    	modalcover.$on("click", /*click_handler_1*/ ctx[31]);

    	const block = {
    		c: function create() {
    			create_component(modalcover.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(modalcover, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const modalcover_changes = {};

    			if (dirty[0] & /*fullscreen, modalClasses, modalStyle, transitionDuration, gallery, actualTitle, actualDescription, $activeImageStore, imagePreset, image, protect, portrait, closeButton*/ 8191 | dirty[1] & /*$$scope*/ 2) {
    				modalcover_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_transitionDuration && dirty[0] & /*transitionDuration*/ 4) {
    				updating_transitionDuration = true;
    				modalcover_changes.transitionDuration = /*transitionDuration*/ ctx[2];
    				add_flush_callback(() => updating_transitionDuration = false);
    			}

    			modalcover.$set(modalcover_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(modalcover.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(modalcover.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(modalcover, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$k.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$k($$self, $$props, $$invalidate) {
    	let fullscreen;
    	let $activeImageStore;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Index', slots, ['default']);
    	const dispatch = createEventDispatcher();
    	let { modalClasses = '' } = $$props;
    	let { modalStyle = '' } = $$props;
    	let { transitionDuration = 500 } = $$props;
    	let { image = {} } = $$props;
    	let { protect = false } = $$props;
    	let { portrait = false } = $$props;
    	let { title = '' } = $$props;
    	let { description = '' } = $$props;
    	let { gallery = [] } = $$props;
    	let { imagePreset } = $$props;
    	let { closeButton } = $$props;
    	const activeImageStore = new writable(0);
    	validate_store(activeImageStore, 'activeImageStore');
    	component_subscribe($$self, activeImageStore, value => $$invalidate(9, $activeImageStore = value));
    	let actualTitle;
    	let actualDescription;
    	setContext('svelte-lightbox-activeImage', activeImageStore);

    	const writable_props = [
    		'modalClasses',
    		'modalStyle',
    		'transitionDuration',
    		'image',
    		'protect',
    		'portrait',
    		'title',
    		'description',
    		'gallery',
    		'imagePreset',
    		'closeButton'
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Index> was created with unknown prop '${key}'`);
    	});

    	function header_closeButton_binding(value) {
    		closeButton = value;
    		$$invalidate(6, closeButton);
    	}

    	const close_handler = () => dispatch('close');

    	function body_image_binding(value) {
    		image = value;
    		$$invalidate(3, image);
    	}

    	function body_protect_binding(value) {
    		protect = value;
    		$$invalidate(4, protect);
    	}

    	function body_portrait_binding(value) {
    		portrait = value;
    		$$invalidate(5, portrait);
    	}

    	function footer_title_binding(value) {
    		actualTitle = value;
    		(((($$invalidate(10, actualTitle), $$invalidate(15, title)), $$invalidate(7, gallery)), $$invalidate(16, description)), $$invalidate(9, $activeImageStore));
    	}

    	function footer_description_binding(value) {
    		actualDescription = value;
    		(((($$invalidate(11, actualDescription), $$invalidate(16, description)), $$invalidate(7, gallery)), $$invalidate(15, title)), $$invalidate(9, $activeImageStore));
    	}

    	function footer_activeImage_binding(value) {
    		$activeImageStore = value;
    		activeImageStore.set($activeImageStore);
    	}

    	function modal_modalClasses_binding(value) {
    		modalClasses = value;
    		$$invalidate(0, modalClasses);
    	}

    	function modal_modalStyle_binding(value) {
    		modalStyle = value;
    		$$invalidate(1, modalStyle);
    	}

    	function modal_transitionDuration_binding(value) {
    		transitionDuration = value;
    		$$invalidate(2, transitionDuration);
    	}

    	const click_handler = () => dispatch('modalClick');

    	function modalcover_transitionDuration_binding(value) {
    		transitionDuration = value;
    		$$invalidate(2, transitionDuration);
    	}

    	const click_handler_1 = () => dispatch('topModalClick');

    	$$self.$$set = $$props => {
    		if ('modalClasses' in $$props) $$invalidate(0, modalClasses = $$props.modalClasses);
    		if ('modalStyle' in $$props) $$invalidate(1, modalStyle = $$props.modalStyle);
    		if ('transitionDuration' in $$props) $$invalidate(2, transitionDuration = $$props.transitionDuration);
    		if ('image' in $$props) $$invalidate(3, image = $$props.image);
    		if ('protect' in $$props) $$invalidate(4, protect = $$props.protect);
    		if ('portrait' in $$props) $$invalidate(5, portrait = $$props.portrait);
    		if ('title' in $$props) $$invalidate(15, title = $$props.title);
    		if ('description' in $$props) $$invalidate(16, description = $$props.description);
    		if ('gallery' in $$props) $$invalidate(7, gallery = $$props.gallery);
    		if ('imagePreset' in $$props) $$invalidate(8, imagePreset = $$props.imagePreset);
    		if ('closeButton' in $$props) $$invalidate(6, closeButton = $$props.closeButton);
    		if ('$$scope' in $$props) $$invalidate(32, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		fade,
    		createEventDispatcher,
    		setContext,
    		Header: LightboxHeader,
    		Body: LightboxBody,
    		Footer: LightboxFooter,
    		ModalCover,
    		Modal: Modal$1,
    		writable,
    		dispatch,
    		modalClasses,
    		modalStyle,
    		transitionDuration,
    		image,
    		protect,
    		portrait,
    		title,
    		description,
    		gallery,
    		imagePreset,
    		closeButton,
    		activeImageStore,
    		actualTitle,
    		actualDescription,
    		fullscreen,
    		$activeImageStore
    	});

    	$$self.$inject_state = $$props => {
    		if ('modalClasses' in $$props) $$invalidate(0, modalClasses = $$props.modalClasses);
    		if ('modalStyle' in $$props) $$invalidate(1, modalStyle = $$props.modalStyle);
    		if ('transitionDuration' in $$props) $$invalidate(2, transitionDuration = $$props.transitionDuration);
    		if ('image' in $$props) $$invalidate(3, image = $$props.image);
    		if ('protect' in $$props) $$invalidate(4, protect = $$props.protect);
    		if ('portrait' in $$props) $$invalidate(5, portrait = $$props.portrait);
    		if ('title' in $$props) $$invalidate(15, title = $$props.title);
    		if ('description' in $$props) $$invalidate(16, description = $$props.description);
    		if ('gallery' in $$props) $$invalidate(7, gallery = $$props.gallery);
    		if ('imagePreset' in $$props) $$invalidate(8, imagePreset = $$props.imagePreset);
    		if ('closeButton' in $$props) $$invalidate(6, closeButton = $$props.closeButton);
    		if ('actualTitle' in $$props) $$invalidate(10, actualTitle = $$props.actualTitle);
    		if ('actualDescription' in $$props) $$invalidate(11, actualDescription = $$props.actualDescription);
    		if ('fullscreen' in $$props) $$invalidate(12, fullscreen = $$props.fullscreen);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*title*/ 32768) {
    			// For variable title and description, we need to define this auxiliary variables
    			$$invalidate(10, actualTitle = title);
    		}

    		if ($$self.$$.dirty[0] & /*description*/ 65536) {
    			$$invalidate(11, actualDescription = description);
    		}

    		if ($$self.$$.dirty[0] & /*gallery, title, description, $activeImageStore*/ 98944) {
    			// If there is not universal title or description for gallery, we will display individual title and description
    			if (gallery && !title && !description) {
    				$$invalidate(10, actualTitle = gallery[$activeImageStore].title);
    				$$invalidate(11, actualDescription = gallery[$activeImageStore].description);
    			}
    		}

    		if ($$self.$$.dirty[0] & /*imagePreset*/ 256) {
    			$$invalidate(12, fullscreen = imagePreset === 'fullscreen');
    		}
    	};

    	return [
    		modalClasses,
    		modalStyle,
    		transitionDuration,
    		image,
    		protect,
    		portrait,
    		closeButton,
    		gallery,
    		imagePreset,
    		$activeImageStore,
    		actualTitle,
    		actualDescription,
    		fullscreen,
    		dispatch,
    		activeImageStore,
    		title,
    		description,
    		slots,
    		header_closeButton_binding,
    		close_handler,
    		body_image_binding,
    		body_protect_binding,
    		body_portrait_binding,
    		footer_title_binding,
    		footer_description_binding,
    		footer_activeImage_binding,
    		modal_modalClasses_binding,
    		modal_modalStyle_binding,
    		modal_transitionDuration_binding,
    		click_handler,
    		modalcover_transitionDuration_binding,
    		click_handler_1,
    		$$scope
    	];
    }

    class Index extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(
    			this,
    			options,
    			instance$k,
    			create_fragment$k,
    			safe_not_equal,
    			{
    				modalClasses: 0,
    				modalStyle: 1,
    				transitionDuration: 2,
    				image: 3,
    				protect: 4,
    				portrait: 5,
    				title: 15,
    				description: 16,
    				gallery: 7,
    				imagePreset: 8,
    				closeButton: 6
    			},
    			null,
    			[-1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Index",
    			options,
    			id: create_fragment$k.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*imagePreset*/ ctx[8] === undefined && !('imagePreset' in props)) {
    			console.warn("<Index> was created without expected prop 'imagePreset'");
    		}

    		if (/*closeButton*/ ctx[6] === undefined && !('closeButton' in props)) {
    			console.warn("<Index> was created without expected prop 'closeButton'");
    		}
    	}

    	get modalClasses() {
    		throw new Error("<Index>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set modalClasses(value) {
    		throw new Error("<Index>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get modalStyle() {
    		throw new Error("<Index>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set modalStyle(value) {
    		throw new Error("<Index>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get transitionDuration() {
    		throw new Error("<Index>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set transitionDuration(value) {
    		throw new Error("<Index>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get image() {
    		throw new Error("<Index>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set image(value) {
    		throw new Error("<Index>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get protect() {
    		throw new Error("<Index>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set protect(value) {
    		throw new Error("<Index>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get portrait() {
    		throw new Error("<Index>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set portrait(value) {
    		throw new Error("<Index>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<Index>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Index>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get description() {
    		throw new Error("<Index>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set description(value) {
    		throw new Error("<Index>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get gallery() {
    		throw new Error("<Index>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set gallery(value) {
    		throw new Error("<Index>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get imagePreset() {
    		throw new Error("<Index>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set imagePreset(value) {
    		throw new Error("<Index>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get closeButton() {
    		throw new Error("<Index>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set closeButton(value) {
    		throw new Error("<Index>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\svelte-lightbox\Gallery\InternalGallery.svelte generated by Svelte v3.47.0 */

    const { Object: Object_1$1, console: console_1$3 } = globals;
    const file$i = "node_modules\\svelte-lightbox\\Gallery\\InternalGallery.svelte";

    function create_fragment$j(ctx) {
    	let div1;
    	let button0;
    	let svg0;
    	let g0;
    	let path0;
    	let button0_disabled_value;
    	let t0;
    	let div0;
    	let t1;
    	let button1;
    	let svg1;
    	let g1;
    	let path1;
    	let button1_disabled_value;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[19].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[18], null);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			button0 = element("button");
    			svg0 = svg_element("svg");
    			g0 = svg_element("g");
    			path0 = svg_element("path");
    			t0 = space();
    			div0 = element("div");
    			if (default_slot) default_slot.c();
    			t1 = space();
    			button1 = element("button");
    			svg1 = svg_element("svg");
    			g1 = svg_element("g");
    			path1 = svg_element("path");
    			attr_dev(path0, "class", "arrow svelte-1lrmlbr");
    			attr_dev(path0, "d", "M8.7,7.22,4.59,11.33a1,1,0,0,0,0,1.41l4,4");
    			add_location(path0, file$i, 89, 16, 3411);
    			add_location(g0, file$i, 88, 12, 3391);
    			attr_dev(svg0, "viewBox", "0 0 24 24");
    			attr_dev(svg0, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg0, "class", "svelte-1lrmlbr");
    			add_location(svg0, file$i, 87, 8, 3318);
    			button0.disabled = button0_disabled_value = /*galleryArrowsCharacter*/ ctx[4] !== 'loop' && /*activeImage*/ ctx[3] === 0;
    			attr_dev(button0, "class", "previous-button svelte-1lrmlbr");
    			toggle_class(button0, "hideDisabled", /*galleryArrowsCharacter*/ ctx[4] === 'hide');
    			add_location(button0, file$i, 85, 4, 3119);
    			attr_dev(div0, "class", "slot svelte-1lrmlbr");
    			add_location(div0, file$i, 95, 4, 3557);
    			attr_dev(path1, "d", "M15.3,16.78l4.11-4.11a1,1,0,0,0,0-1.41l-4-4");
    			attr_dev(path1, "class", "arrow svelte-1lrmlbr");
    			add_location(path1, file$i, 105, 16, 3971);
    			add_location(g1, file$i, 104, 12, 3951);
    			attr_dev(svg1, "viewBox", "0 0 24 24");
    			attr_dev(svg1, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg1, "class", "svelte-1lrmlbr");
    			add_location(svg1, file$i, 103, 8, 3878);
    			button1.disabled = button1_disabled_value = /*galleryArrowsCharacter*/ ctx[4] !== 'loop' && /*activeImage*/ ctx[3] === /*images*/ ctx[1]?.length - 1;
    			attr_dev(button1, "class", "next-button svelte-1lrmlbr");
    			toggle_class(button1, "hideDisabled", /*galleryArrowsCharacter*/ ctx[4] === 'hide');
    			add_location(button1, file$i, 101, 4, 3672);
    			attr_dev(div1, "class", "wrapper svelte-1lrmlbr");
    			set_style(div1, "--svelte-lightbox-arrows-color", /*galleryArrowsColor*/ ctx[5]);
    			toggle_class(div1, "fullscreen", /*fullscreen*/ ctx[2]);
    			add_location(div1, file$i, 83, 0, 2991);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, button0);
    			append_dev(button0, svg0);
    			append_dev(svg0, g0);
    			append_dev(g0, path0);
    			append_dev(div1, t0);
    			append_dev(div1, div0);

    			if (default_slot) {
    				default_slot.m(div0, null);
    			}

    			/*div0_binding*/ ctx[21](div0);
    			append_dev(div1, t1);
    			append_dev(div1, button1);
    			append_dev(button1, svg1);
    			append_dev(svg1, g1);
    			append_dev(g1, path1);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(window, "keydown", /*keydown_handler*/ ctx[20], false, false, false),
    					listen_dev(button0, "click", /*previousImage*/ ctx[10], false, false, false),
    					listen_dev(button1, "click", /*nextImage*/ ctx[11], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*galleryArrowsCharacter, activeImage*/ 24 && button0_disabled_value !== (button0_disabled_value = /*galleryArrowsCharacter*/ ctx[4] !== 'loop' && /*activeImage*/ ctx[3] === 0)) {
    				prop_dev(button0, "disabled", button0_disabled_value);
    			}

    			if (dirty & /*galleryArrowsCharacter*/ 16) {
    				toggle_class(button0, "hideDisabled", /*galleryArrowsCharacter*/ ctx[4] === 'hide');
    			}

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 262144)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[18],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[18])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[18], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*galleryArrowsCharacter, activeImage, images*/ 26 && button1_disabled_value !== (button1_disabled_value = /*galleryArrowsCharacter*/ ctx[4] !== 'loop' && /*activeImage*/ ctx[3] === /*images*/ ctx[1]?.length - 1)) {
    				prop_dev(button1, "disabled", button1_disabled_value);
    			}

    			if (dirty & /*galleryArrowsCharacter*/ 16) {
    				toggle_class(button1, "hideDisabled", /*galleryArrowsCharacter*/ ctx[4] === 'hide');
    			}

    			if (!current || dirty & /*galleryArrowsColor*/ 32) {
    				set_style(div1, "--svelte-lightbox-arrows-color", /*galleryArrowsColor*/ ctx[5]);
    			}

    			if (dirty & /*fullscreen*/ 4) {
    				toggle_class(div1, "fullscreen", /*fullscreen*/ ctx[2]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (default_slot) default_slot.d(detaching);
    			/*div0_binding*/ ctx[21](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$j.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$j($$self, $$props, $$invalidate) {
    	let activeImage;
    	let galleryArrowsColor;
    	let galleryArrowsCharacter;
    	let disableKeyboardArrowsControl;
    	let fullscreen;
    	let $keyboardControlStore;
    	let $arrowsCharacterStore;
    	let $arrowsColorStore;
    	let $activeImageStore;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('InternalGallery', slots, ['default']);
    	let { imagePreset = '' } = $$props;
    	const activeImageStore = getContext('svelte-lightbox-activeImage');
    	validate_store(activeImageStore, 'activeImageStore');
    	component_subscribe($$self, activeImageStore, value => $$invalidate(17, $activeImageStore = value));
    	const arrowsColorStore = new writable('black');
    	validate_store(arrowsColorStore, 'arrowsColorStore');
    	component_subscribe($$self, arrowsColorStore, value => $$invalidate(16, $arrowsColorStore = value));
    	const arrowsCharacterStore = new writable('unset');
    	validate_store(arrowsCharacterStore, 'arrowsCharacterStore');
    	component_subscribe($$self, arrowsCharacterStore, value => $$invalidate(15, $arrowsCharacterStore = value));
    	const keyboardControlStore = new writable(false);
    	validate_store(keyboardControlStore, 'keyboardControlStore');
    	component_subscribe($$self, keyboardControlStore, value => $$invalidate(14, $keyboardControlStore = value));

    	// Here will be stored markup that will user put inside of this component
    	let slotContent;

    	// Auxiliary variable for storing elements with image that user has provided
    	let images;

    	const previousImage = () => {
    		if (activeImage === 0) {
    			if (galleryArrowsCharacter === 'loop') {
    				activeImageStore.set(images.length - 1);
    			}
    		} else {
    			activeImageStore.set(activeImage - 1);
    		}
    	};

    	const nextImage = () => {
    		if (activeImage === images.length - 1) {
    			if (galleryArrowsCharacter === 'loop') {
    				activeImageStore.set(0);
    			}
    		} else {
    			activeImageStore.set(activeImage + 1);
    		}
    	};

    	const handleKey = event => {
    		if (!disableKeyboardArrowsControl) {
    			switch (event.key) {
    				case 'ArrowLeft':
    					{
    						previousImage();
    						break;
    					}
    				case 'ArrowRight':
    					{
    						nextImage();
    						break;
    					}
    			}
    		}
    	};

    	setContext('svelte-lightbox-galleryArrowsColor', arrowsColorStore);
    	setContext('svelte-lightbox-galleryArrowsCharacter', arrowsCharacterStore);
    	setContext('svelte-lightbox-disableKeyboardArrowsControl', keyboardControlStore);
    	const writable_props = ['imagePreset'];

    	Object_1$1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$3.warn(`<InternalGallery> was created with unknown prop '${key}'`);
    	});

    	const keydown_handler = event => handleKey(event);

    	function div0_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			slotContent = $$value;
    			$$invalidate(0, slotContent);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('imagePreset' in $$props) $$invalidate(13, imagePreset = $$props.imagePreset);
    		if ('$$scope' in $$props) $$invalidate(18, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		setContext,
    		writable,
    		imagePreset,
    		activeImageStore,
    		arrowsColorStore,
    		arrowsCharacterStore,
    		keyboardControlStore,
    		slotContent,
    		images,
    		previousImage,
    		nextImage,
    		handleKey,
    		fullscreen,
    		activeImage,
    		disableKeyboardArrowsControl,
    		galleryArrowsCharacter,
    		galleryArrowsColor,
    		$keyboardControlStore,
    		$arrowsCharacterStore,
    		$arrowsColorStore,
    		$activeImageStore
    	});

    	$$self.$inject_state = $$props => {
    		if ('imagePreset' in $$props) $$invalidate(13, imagePreset = $$props.imagePreset);
    		if ('slotContent' in $$props) $$invalidate(0, slotContent = $$props.slotContent);
    		if ('images' in $$props) $$invalidate(1, images = $$props.images);
    		if ('fullscreen' in $$props) $$invalidate(2, fullscreen = $$props.fullscreen);
    		if ('activeImage' in $$props) $$invalidate(3, activeImage = $$props.activeImage);
    		if ('disableKeyboardArrowsControl' in $$props) disableKeyboardArrowsControl = $$props.disableKeyboardArrowsControl;
    		if ('galleryArrowsCharacter' in $$props) $$invalidate(4, galleryArrowsCharacter = $$props.galleryArrowsCharacter);
    		if ('galleryArrowsColor' in $$props) $$invalidate(5, galleryArrowsColor = $$props.galleryArrowsColor);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$activeImageStore*/ 131072) {
    			$$invalidate(3, activeImage = $activeImageStore);
    		}

    		if ($$self.$$.dirty & /*$arrowsColorStore*/ 65536) {
    			$$invalidate(5, galleryArrowsColor = $arrowsColorStore);
    		}

    		if ($$self.$$.dirty & /*$arrowsCharacterStore*/ 32768) {
    			$$invalidate(4, galleryArrowsCharacter = $arrowsCharacterStore);
    		}

    		if ($$self.$$.dirty & /*$keyboardControlStore*/ 16384) {
    			disableKeyboardArrowsControl = $keyboardControlStore;
    		}

    		if ($$self.$$.dirty & /*slotContent*/ 1) {
    			// Every time, when contents of this component changes, images will be updated
    			$$invalidate(1, images = slotContent?.children);
    		}

    		if ($$self.$$.dirty & /*imagePreset*/ 8192) {
    			$$invalidate(2, fullscreen = imagePreset === 'fullscreen');
    		}

    		if ($$self.$$.dirty & /*images, activeImage, fullscreen*/ 14) {
    			{
    				/*
    When activeImage or images array changes, checks if active image points to existing image and then displays it,
    if selected image doesn't exist, then logs out error, these error normally does not occur, only in cases when
    activeImage is controlled programmatically
     */
    				if (images && activeImage < images.length) {
    					Object.values(images).forEach(img => {
    						img.hidden = true;
    						return img;
    					});

    					if (!fullscreen) {
    						$$invalidate(1, images[activeImage].hidden = false, images);
    					}
    				} else if (images && activeImage >= images.length) {
    					console.error("LightboxGallery: Selected image doesn't exist, invalid activeImage");
    				}
    			}
    		}
    	};

    	return [
    		slotContent,
    		images,
    		fullscreen,
    		activeImage,
    		galleryArrowsCharacter,
    		galleryArrowsColor,
    		activeImageStore,
    		arrowsColorStore,
    		arrowsCharacterStore,
    		keyboardControlStore,
    		previousImage,
    		nextImage,
    		handleKey,
    		imagePreset,
    		$keyboardControlStore,
    		$arrowsCharacterStore,
    		$arrowsColorStore,
    		$activeImageStore,
    		$$scope,
    		slots,
    		keydown_handler,
    		div0_binding
    	];
    }

    class InternalGallery extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$j, create_fragment$j, safe_not_equal, { imagePreset: 13 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "InternalGallery",
    			options,
    			id: create_fragment$j.name
    		});
    	}

    	get imagePreset() {
    		throw new Error("<InternalGallery>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set imagePreset(value) {
    		throw new Error("<InternalGallery>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\svelte-lightbox\Modal\BodyChild.svelte generated by Svelte v3.47.0 */
    const file$h = "node_modules\\svelte-lightbox\\Modal\\BodyChild.svelte";

    function create_fragment$i(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);
    	let div_levels = [/*$$restProps*/ ctx[1]];
    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign(div_data, div_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			set_attributes(div, div_data);
    			add_location(div, file$h, 21, 0, 476);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			/*div_binding*/ ctx[4](div);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[2],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(div, div_data = get_spread_update(div_levels, [dirty & /*$$restProps*/ 2 && /*$$restProps*/ ctx[1]]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    			/*div_binding*/ ctx[4](null);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$i.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$i($$self, $$props, $$invalidate) {
    	const omit_props_names = [];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('BodyChild', slots, ['default']);
    	let targetElement;
    	let child;

    	const stackTarget = () => {
    		child = document.createElement('div');
    		document.body.appendChild(child);
    		child.appendChild(targetElement);
    	};

    	const removeTarget = () => {
    		if (typeof document !== 'undefined') {
    			document.body.removeChild(child);
    		}
    	};

    	onMount(stackTarget);
    	onDestroy(removeTarget);

    	function div_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			targetElement = $$value;
    			$$invalidate(0, targetElement);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('$$scope' in $$new_props) $$invalidate(2, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		onDestroy,
    		targetElement,
    		child,
    		stackTarget,
    		removeTarget
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('targetElement' in $$props) $$invalidate(0, targetElement = $$new_props.targetElement);
    		if ('child' in $$props) child = $$new_props.child;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [targetElement, $$restProps, $$scope, slots, div_binding];
    }

    class BodyChild extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$i, create_fragment$i, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "BodyChild",
    			options,
    			id: create_fragment$i.name
    		});
    	}
    }

    /* node_modules\svelte-lightbox\Lightbox.svelte generated by Svelte v3.47.0 */
    const file$g = "node_modules\\svelte-lightbox\\Lightbox.svelte";
    const get_thumbnail_slot_changes_1 = dirty => ({});
    const get_thumbnail_slot_context_1 = ctx => ({});
    const get_image_slot_changes = dirty => ({});
    const get_image_slot_context = ctx => ({});
    const get_thumbnail_slot_changes = dirty => ({});
    const get_thumbnail_slot_context = ctx => ({});

    // (81:1) {:else}
    function create_else_block_1$1(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[22].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[37], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty[1] & /*$$scope*/ 64)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[37],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[37])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[37], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_1$1.name,
    		type: "else",
    		source: "(81:1) {:else}",
    		ctx
    	});

    	return block;
    }

    // (79:1) {#if thumbnail || gallery}
    function create_if_block_4(ctx) {
    	let current;
    	const thumbnail_slot_template = /*#slots*/ ctx[22].thumbnail;
    	const thumbnail_slot = create_slot(thumbnail_slot_template, ctx, /*$$scope*/ ctx[37], get_thumbnail_slot_context);

    	const block = {
    		c: function create() {
    			if (thumbnail_slot) thumbnail_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (thumbnail_slot) {
    				thumbnail_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (thumbnail_slot) {
    				if (thumbnail_slot.p && (!current || dirty[1] & /*$$scope*/ 64)) {
    					update_slot_base(
    						thumbnail_slot,
    						thumbnail_slot_template,
    						ctx,
    						/*$$scope*/ ctx[37],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[37])
    						: get_slot_changes(thumbnail_slot_template, /*$$scope*/ ctx[37], dirty, get_thumbnail_slot_changes),
    						get_thumbnail_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(thumbnail_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(thumbnail_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (thumbnail_slot) thumbnail_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(79:1) {#if thumbnail || gallery}",
    		ctx
    	});

    	return block;
    }

    // (78:0) <Thumbnail bind:class={thumbnailClasses} bind:style={thumbnailStyle} bind:protect on:click={toggle}>
    function create_default_slot_3$1(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_4, create_else_block_1$1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*thumbnail*/ ctx[14] || /*gallery*/ ctx[4]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$1.name,
    		type: "slot",
    		source: "(78:0) <Thumbnail bind:class={thumbnailClasses} bind:style={thumbnailStyle} bind:protect on:click={toggle}>",
    		ctx
    	});

    	return block;
    }

    // (86:0) {#if isVisible}
    function create_if_block$8(ctx) {
    	let bodychild;
    	let current;

    	bodychild = new BodyChild({
    			props: {
    				$$slots: { default: [create_default_slot$7] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(bodychild.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(bodychild, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const bodychild_changes = {};

    			if (dirty[0] & /*modalClasses, modalStyle, transitionDuration, image, protect, portrait, title, description, gallery, imagePreset, closeButton, thumbnail, $$slots*/ 548860 | dirty[1] & /*$$scope*/ 64) {
    				bodychild_changes.$$scope = { dirty, ctx };
    			}

    			bodychild.$set(bodychild_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(bodychild.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(bodychild.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(bodychild, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$8.name,
    		type: "if",
    		source: "(86:0) {#if isVisible}",
    		ctx
    	});

    	return block;
    }

    // (103:3) {:else}
    function create_else_block$3(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[22].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[37], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty[1] & /*$$scope*/ 64)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[37],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[37])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[37], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$3.name,
    		type: "else",
    		source: "(103:3) {:else}",
    		ctx
    	});

    	return block;
    }

    // (93:21) 
    function create_if_block_2$6(ctx) {
    	let internalgallery;
    	let current;

    	internalgallery = new InternalGallery({
    			props: {
    				imagePreset: /*imagePreset*/ ctx[11],
    				$$slots: { default: [create_default_slot_2$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(internalgallery.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(internalgallery, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const internalgallery_changes = {};
    			if (dirty[0] & /*imagePreset*/ 2048) internalgallery_changes.imagePreset = /*imagePreset*/ ctx[11];

    			if (dirty[0] & /*$$slots*/ 524288 | dirty[1] & /*$$scope*/ 64) {
    				internalgallery_changes.$$scope = { dirty, ctx };
    			}

    			internalgallery.$set(internalgallery_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(internalgallery.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(internalgallery.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(internalgallery, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$6.name,
    		type: "if",
    		source: "(93:21) ",
    		ctx
    	});

    	return block;
    }

    // (91:3) {#if thumbnail}
    function create_if_block_1$7(ctx) {
    	let current;
    	const image_slot_template = /*#slots*/ ctx[22].image;
    	const image_slot = create_slot(image_slot_template, ctx, /*$$scope*/ ctx[37], get_image_slot_context);

    	const block = {
    		c: function create() {
    			if (image_slot) image_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (image_slot) {
    				image_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (image_slot) {
    				if (image_slot.p && (!current || dirty[1] & /*$$scope*/ 64)) {
    					update_slot_base(
    						image_slot,
    						image_slot_template,
    						ctx,
    						/*$$scope*/ ctx[37],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[37])
    						: get_slot_changes(image_slot_template, /*$$scope*/ ctx[37], dirty, get_image_slot_changes),
    						get_image_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(image_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(image_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (image_slot) image_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$7.name,
    		type: "if",
    		source: "(91:3) {#if thumbnail}",
    		ctx
    	});

    	return block;
    }

    // (95:5) {#if $$slots.thumbnail}
    function create_if_block_3$2(ctx) {
    	let div;
    	let current;
    	const thumbnail_slot_template = /*#slots*/ ctx[22].thumbnail;
    	const thumbnail_slot = create_slot(thumbnail_slot_template, ctx, /*$$scope*/ ctx[37], get_thumbnail_slot_context_1);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (thumbnail_slot) thumbnail_slot.c();
    			add_location(div, file$g, 95, 6, 2786);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (thumbnail_slot) {
    				thumbnail_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (thumbnail_slot) {
    				if (thumbnail_slot.p && (!current || dirty[1] & /*$$scope*/ 64)) {
    					update_slot_base(
    						thumbnail_slot,
    						thumbnail_slot_template,
    						ctx,
    						/*$$scope*/ ctx[37],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[37])
    						: get_slot_changes(thumbnail_slot_template, /*$$scope*/ ctx[37], dirty, get_thumbnail_slot_changes_1),
    						get_thumbnail_slot_context_1
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(thumbnail_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(thumbnail_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (thumbnail_slot) thumbnail_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3$2.name,
    		type: "if",
    		source: "(95:5) {#if $$slots.thumbnail}",
    		ctx
    	});

    	return block;
    }

    // (94:4) <InternalGallery {imagePreset}>
    function create_default_slot_2$2(ctx) {
    	let t;
    	let current;
    	let if_block = /*$$slots*/ ctx[19].thumbnail && create_if_block_3$2(ctx);
    	const default_slot_template = /*#slots*/ ctx[22].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[37], null);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			t = space();
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, t, anchor);

    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*$$slots*/ ctx[19].thumbnail) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty[0] & /*$$slots*/ 524288) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block_3$2(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(t.parentNode, t);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty[1] & /*$$scope*/ 64)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[37],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[37])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[37], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(t);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$2.name,
    		type: "slot",
    		source: "(94:4) <InternalGallery {imagePreset}>",
    		ctx
    	});

    	return block;
    }

    // (88:2) <Modal bind:modalClasses bind:modalStyle bind:transitionDuration bind:image bind:protect          bind:portrait bind:title bind:description bind:gallery bind:imagePreset bind:closeButton          on:close={close} on:topModalClick={coverClick} on:modalClick={modalClick}>
    function create_default_slot_1$4(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_1$7, create_if_block_2$6, create_else_block$3];
    	const if_blocks = [];

    	function select_block_type_1(ctx, dirty) {
    		if (/*thumbnail*/ ctx[14]) return 0;
    		if (/*gallery*/ ctx[4]) return 1;
    		return 2;
    	}

    	current_block_type_index = select_block_type_1(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type_1(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$4.name,
    		type: "slot",
    		source: "(88:2) <Modal bind:modalClasses bind:modalStyle bind:transitionDuration bind:image bind:protect          bind:portrait bind:title bind:description bind:gallery bind:imagePreset bind:closeButton          on:close={close} on:topModalClick={coverClick} on:modalClick={modalClick}>",
    		ctx
    	});

    	return block;
    }

    // (87:1) <BodyChild>
    function create_default_slot$7(ctx) {
    	let modal;
    	let updating_modalClasses;
    	let updating_modalStyle;
    	let updating_transitionDuration;
    	let updating_image;
    	let updating_protect;
    	let updating_portrait;
    	let updating_title;
    	let updating_description;
    	let updating_gallery;
    	let updating_imagePreset;
    	let updating_closeButton;
    	let current;

    	function modal_modalClasses_binding(value) {
    		/*modal_modalClasses_binding*/ ctx[26](value);
    	}

    	function modal_modalStyle_binding(value) {
    		/*modal_modalStyle_binding*/ ctx[27](value);
    	}

    	function modal_transitionDuration_binding(value) {
    		/*modal_transitionDuration_binding*/ ctx[28](value);
    	}

    	function modal_image_binding(value) {
    		/*modal_image_binding*/ ctx[29](value);
    	}

    	function modal_protect_binding(value) {
    		/*modal_protect_binding*/ ctx[30](value);
    	}

    	function modal_portrait_binding(value) {
    		/*modal_portrait_binding*/ ctx[31](value);
    	}

    	function modal_title_binding(value) {
    		/*modal_title_binding*/ ctx[32](value);
    	}

    	function modal_description_binding(value) {
    		/*modal_description_binding*/ ctx[33](value);
    	}

    	function modal_gallery_binding(value) {
    		/*modal_gallery_binding*/ ctx[34](value);
    	}

    	function modal_imagePreset_binding(value) {
    		/*modal_imagePreset_binding*/ ctx[35](value);
    	}

    	function modal_closeButton_binding(value) {
    		/*modal_closeButton_binding*/ ctx[36](value);
    	}

    	let modal_props = {
    		$$slots: { default: [create_default_slot_1$4] },
    		$$scope: { ctx }
    	};

    	if (/*modalClasses*/ ctx[2] !== void 0) {
    		modal_props.modalClasses = /*modalClasses*/ ctx[2];
    	}

    	if (/*modalStyle*/ ctx[3] !== void 0) {
    		modal_props.modalStyle = /*modalStyle*/ ctx[3];
    	}

    	if (/*transitionDuration*/ ctx[7] !== void 0) {
    		modal_props.transitionDuration = /*transitionDuration*/ ctx[7];
    	}

    	if (/*image*/ ctx[9] !== void 0) {
    		modal_props.image = /*image*/ ctx[9];
    	}

    	if (/*protect*/ ctx[8] !== void 0) {
    		modal_props.protect = /*protect*/ ctx[8];
    	}

    	if (/*portrait*/ ctx[10] !== void 0) {
    		modal_props.portrait = /*portrait*/ ctx[10];
    	}

    	if (/*title*/ ctx[5] !== void 0) {
    		modal_props.title = /*title*/ ctx[5];
    	}

    	if (/*description*/ ctx[6] !== void 0) {
    		modal_props.description = /*description*/ ctx[6];
    	}

    	if (/*gallery*/ ctx[4] !== void 0) {
    		modal_props.gallery = /*gallery*/ ctx[4];
    	}

    	if (/*imagePreset*/ ctx[11] !== void 0) {
    		modal_props.imagePreset = /*imagePreset*/ ctx[11];
    	}

    	if (/*closeButton*/ ctx[12] !== void 0) {
    		modal_props.closeButton = /*closeButton*/ ctx[12];
    	}

    	modal = new Index({ props: modal_props, $$inline: true });
    	binding_callbacks.push(() => bind$1(modal, 'modalClasses', modal_modalClasses_binding));
    	binding_callbacks.push(() => bind$1(modal, 'modalStyle', modal_modalStyle_binding));
    	binding_callbacks.push(() => bind$1(modal, 'transitionDuration', modal_transitionDuration_binding));
    	binding_callbacks.push(() => bind$1(modal, 'image', modal_image_binding));
    	binding_callbacks.push(() => bind$1(modal, 'protect', modal_protect_binding));
    	binding_callbacks.push(() => bind$1(modal, 'portrait', modal_portrait_binding));
    	binding_callbacks.push(() => bind$1(modal, 'title', modal_title_binding));
    	binding_callbacks.push(() => bind$1(modal, 'description', modal_description_binding));
    	binding_callbacks.push(() => bind$1(modal, 'gallery', modal_gallery_binding));
    	binding_callbacks.push(() => bind$1(modal, 'imagePreset', modal_imagePreset_binding));
    	binding_callbacks.push(() => bind$1(modal, 'closeButton', modal_closeButton_binding));
    	modal.$on("close", /*close*/ ctx[16]);
    	modal.$on("topModalClick", /*coverClick*/ ctx[17]);
    	modal.$on("modalClick", /*modalClick*/ ctx[18]);

    	const block = {
    		c: function create() {
    			create_component(modal.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(modal, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const modal_changes = {};

    			if (dirty[0] & /*thumbnail, imagePreset, $$slots, gallery*/ 542736 | dirty[1] & /*$$scope*/ 64) {
    				modal_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_modalClasses && dirty[0] & /*modalClasses*/ 4) {
    				updating_modalClasses = true;
    				modal_changes.modalClasses = /*modalClasses*/ ctx[2];
    				add_flush_callback(() => updating_modalClasses = false);
    			}

    			if (!updating_modalStyle && dirty[0] & /*modalStyle*/ 8) {
    				updating_modalStyle = true;
    				modal_changes.modalStyle = /*modalStyle*/ ctx[3];
    				add_flush_callback(() => updating_modalStyle = false);
    			}

    			if (!updating_transitionDuration && dirty[0] & /*transitionDuration*/ 128) {
    				updating_transitionDuration = true;
    				modal_changes.transitionDuration = /*transitionDuration*/ ctx[7];
    				add_flush_callback(() => updating_transitionDuration = false);
    			}

    			if (!updating_image && dirty[0] & /*image*/ 512) {
    				updating_image = true;
    				modal_changes.image = /*image*/ ctx[9];
    				add_flush_callback(() => updating_image = false);
    			}

    			if (!updating_protect && dirty[0] & /*protect*/ 256) {
    				updating_protect = true;
    				modal_changes.protect = /*protect*/ ctx[8];
    				add_flush_callback(() => updating_protect = false);
    			}

    			if (!updating_portrait && dirty[0] & /*portrait*/ 1024) {
    				updating_portrait = true;
    				modal_changes.portrait = /*portrait*/ ctx[10];
    				add_flush_callback(() => updating_portrait = false);
    			}

    			if (!updating_title && dirty[0] & /*title*/ 32) {
    				updating_title = true;
    				modal_changes.title = /*title*/ ctx[5];
    				add_flush_callback(() => updating_title = false);
    			}

    			if (!updating_description && dirty[0] & /*description*/ 64) {
    				updating_description = true;
    				modal_changes.description = /*description*/ ctx[6];
    				add_flush_callback(() => updating_description = false);
    			}

    			if (!updating_gallery && dirty[0] & /*gallery*/ 16) {
    				updating_gallery = true;
    				modal_changes.gallery = /*gallery*/ ctx[4];
    				add_flush_callback(() => updating_gallery = false);
    			}

    			if (!updating_imagePreset && dirty[0] & /*imagePreset*/ 2048) {
    				updating_imagePreset = true;
    				modal_changes.imagePreset = /*imagePreset*/ ctx[11];
    				add_flush_callback(() => updating_imagePreset = false);
    			}

    			if (!updating_closeButton && dirty[0] & /*closeButton*/ 4096) {
    				updating_closeButton = true;
    				modal_changes.closeButton = /*closeButton*/ ctx[12];
    				add_flush_callback(() => updating_closeButton = false);
    			}

    			modal.$set(modal_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(modal.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(modal.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(modal, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$7.name,
    		type: "slot",
    		source: "(87:1) <BodyChild>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$h(ctx) {
    	let thumbnail_1;
    	let updating_class;
    	let updating_style;
    	let updating_protect;
    	let t;
    	let if_block_anchor;
    	let current;

    	function thumbnail_1_class_binding(value) {
    		/*thumbnail_1_class_binding*/ ctx[23](value);
    	}

    	function thumbnail_1_style_binding(value) {
    		/*thumbnail_1_style_binding*/ ctx[24](value);
    	}

    	function thumbnail_1_protect_binding(value) {
    		/*thumbnail_1_protect_binding*/ ctx[25](value);
    	}

    	let thumbnail_1_props = {
    		$$slots: { default: [create_default_slot_3$1] },
    		$$scope: { ctx }
    	};

    	if (/*thumbnailClasses*/ ctx[0] !== void 0) {
    		thumbnail_1_props.class = /*thumbnailClasses*/ ctx[0];
    	}

    	if (/*thumbnailStyle*/ ctx[1] !== void 0) {
    		thumbnail_1_props.style = /*thumbnailStyle*/ ctx[1];
    	}

    	if (/*protect*/ ctx[8] !== void 0) {
    		thumbnail_1_props.protect = /*protect*/ ctx[8];
    	}

    	thumbnail_1 = new LightboxThumbnail({ props: thumbnail_1_props, $$inline: true });
    	binding_callbacks.push(() => bind$1(thumbnail_1, 'class', thumbnail_1_class_binding));
    	binding_callbacks.push(() => bind$1(thumbnail_1, 'style', thumbnail_1_style_binding));
    	binding_callbacks.push(() => bind$1(thumbnail_1, 'protect', thumbnail_1_protect_binding));
    	thumbnail_1.$on("click", /*toggle*/ ctx[15]);
    	let if_block = /*isVisible*/ ctx[13] && create_if_block$8(ctx);

    	const block = {
    		c: function create() {
    			create_component(thumbnail_1.$$.fragment);
    			t = space();
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(thumbnail_1, target, anchor);
    			insert_dev(target, t, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const thumbnail_1_changes = {};

    			if (dirty[0] & /*thumbnail, gallery*/ 16400 | dirty[1] & /*$$scope*/ 64) {
    				thumbnail_1_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_class && dirty[0] & /*thumbnailClasses*/ 1) {
    				updating_class = true;
    				thumbnail_1_changes.class = /*thumbnailClasses*/ ctx[0];
    				add_flush_callback(() => updating_class = false);
    			}

    			if (!updating_style && dirty[0] & /*thumbnailStyle*/ 2) {
    				updating_style = true;
    				thumbnail_1_changes.style = /*thumbnailStyle*/ ctx[1];
    				add_flush_callback(() => updating_style = false);
    			}

    			if (!updating_protect && dirty[0] & /*protect*/ 256) {
    				updating_protect = true;
    				thumbnail_1_changes.protect = /*protect*/ ctx[8];
    				add_flush_callback(() => updating_protect = false);
    			}

    			thumbnail_1.$set(thumbnail_1_changes);

    			if (/*isVisible*/ ctx[13]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty[0] & /*isVisible*/ 8192) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$8(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(thumbnail_1.$$.fragment, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(thumbnail_1.$$.fragment, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(thumbnail_1, detaching);
    			if (detaching) detach_dev(t);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$h.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$h($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Lightbox', slots, ['thumbnail','default','image']);
    	const $$slots = compute_slots(slots);
    	let { thumbnailClasses = '' } = $$props;
    	let { thumbnailStyle = '' } = $$props;
    	let { modalClasses = '' } = $$props;
    	let { modalStyle = '' } = $$props;
    	let { gallery = false } = $$props;
    	let { title = '' } = $$props;
    	let { description = '' } = $$props;
    	let { transitionDuration = 500 } = $$props;
    	let { protect = false } = $$props;
    	let { image = {} } = $$props;
    	let { portrait = false } = $$props;
    	let { noScroll = true } = $$props;
    	let { thumbnail = false } = $$props;
    	let { imagePreset = false } = $$props;
    	let { clickToClose = false } = $$props;
    	let { closeButton = true } = $$props;
    	let { isVisible = false } = $$props;
    	let modalClicked = false;

    	const toggle = () => {
    		$$invalidate(13, isVisible = !isVisible);
    		toggleScroll();
    	};

    	const close = () => {
    		$$invalidate(13, isVisible = false);
    		toggleScroll();
    	};

    	const coverClick = () => {
    		// console.log('coverClick')
    		if (!modalClicked || clickToClose) {
    			close();
    		}

    		modalClicked = false;
    	};

    	const modalClick = () => {
    		// console.log('modalClick')
    		modalClicked = true;
    	};

    	let toggleScroll = () => {
    		
    	};

    	onMount(() => {
    		let defaultOverflow = document.body.style.overflow;

    		toggleScroll = () => {
    			if (noScroll) {
    				if (isVisible) {
    					document.body.style.overflow = 'hidden';
    				} else {
    					document.body.style.overflow = defaultOverflow;
    				}
    			}
    		};
    	});

    	const writable_props = [
    		'thumbnailClasses',
    		'thumbnailStyle',
    		'modalClasses',
    		'modalStyle',
    		'gallery',
    		'title',
    		'description',
    		'transitionDuration',
    		'protect',
    		'image',
    		'portrait',
    		'noScroll',
    		'thumbnail',
    		'imagePreset',
    		'clickToClose',
    		'closeButton',
    		'isVisible'
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Lightbox> was created with unknown prop '${key}'`);
    	});

    	function thumbnail_1_class_binding(value) {
    		thumbnailClasses = value;
    		$$invalidate(0, thumbnailClasses);
    	}

    	function thumbnail_1_style_binding(value) {
    		thumbnailStyle = value;
    		$$invalidate(1, thumbnailStyle);
    	}

    	function thumbnail_1_protect_binding(value) {
    		protect = value;
    		$$invalidate(8, protect);
    	}

    	function modal_modalClasses_binding(value) {
    		modalClasses = value;
    		$$invalidate(2, modalClasses);
    	}

    	function modal_modalStyle_binding(value) {
    		modalStyle = value;
    		$$invalidate(3, modalStyle);
    	}

    	function modal_transitionDuration_binding(value) {
    		transitionDuration = value;
    		$$invalidate(7, transitionDuration);
    	}

    	function modal_image_binding(value) {
    		image = value;
    		$$invalidate(9, image);
    	}

    	function modal_protect_binding(value) {
    		protect = value;
    		$$invalidate(8, protect);
    	}

    	function modal_portrait_binding(value) {
    		portrait = value;
    		$$invalidate(10, portrait);
    	}

    	function modal_title_binding(value) {
    		title = value;
    		$$invalidate(5, title);
    	}

    	function modal_description_binding(value) {
    		description = value;
    		$$invalidate(6, description);
    	}

    	function modal_gallery_binding(value) {
    		gallery = value;
    		$$invalidate(4, gallery);
    	}

    	function modal_imagePreset_binding(value) {
    		imagePreset = value;
    		$$invalidate(11, imagePreset);
    	}

    	function modal_closeButton_binding(value) {
    		closeButton = value;
    		$$invalidate(12, closeButton);
    	}

    	$$self.$$set = $$props => {
    		if ('thumbnailClasses' in $$props) $$invalidate(0, thumbnailClasses = $$props.thumbnailClasses);
    		if ('thumbnailStyle' in $$props) $$invalidate(1, thumbnailStyle = $$props.thumbnailStyle);
    		if ('modalClasses' in $$props) $$invalidate(2, modalClasses = $$props.modalClasses);
    		if ('modalStyle' in $$props) $$invalidate(3, modalStyle = $$props.modalStyle);
    		if ('gallery' in $$props) $$invalidate(4, gallery = $$props.gallery);
    		if ('title' in $$props) $$invalidate(5, title = $$props.title);
    		if ('description' in $$props) $$invalidate(6, description = $$props.description);
    		if ('transitionDuration' in $$props) $$invalidate(7, transitionDuration = $$props.transitionDuration);
    		if ('protect' in $$props) $$invalidate(8, protect = $$props.protect);
    		if ('image' in $$props) $$invalidate(9, image = $$props.image);
    		if ('portrait' in $$props) $$invalidate(10, portrait = $$props.portrait);
    		if ('noScroll' in $$props) $$invalidate(20, noScroll = $$props.noScroll);
    		if ('thumbnail' in $$props) $$invalidate(14, thumbnail = $$props.thumbnail);
    		if ('imagePreset' in $$props) $$invalidate(11, imagePreset = $$props.imagePreset);
    		if ('clickToClose' in $$props) $$invalidate(21, clickToClose = $$props.clickToClose);
    		if ('closeButton' in $$props) $$invalidate(12, closeButton = $$props.closeButton);
    		if ('isVisible' in $$props) $$invalidate(13, isVisible = $$props.isVisible);
    		if ('$$scope' in $$props) $$invalidate(37, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		Thumbnail: LightboxThumbnail,
    		Modal: Index,
    		InternalGallery,
    		BodyChild,
    		onMount,
    		thumbnailClasses,
    		thumbnailStyle,
    		modalClasses,
    		modalStyle,
    		gallery,
    		title,
    		description,
    		transitionDuration,
    		protect,
    		image,
    		portrait,
    		noScroll,
    		thumbnail,
    		imagePreset,
    		clickToClose,
    		closeButton,
    		isVisible,
    		modalClicked,
    		toggle,
    		close,
    		coverClick,
    		modalClick,
    		toggleScroll
    	});

    	$$self.$inject_state = $$props => {
    		if ('thumbnailClasses' in $$props) $$invalidate(0, thumbnailClasses = $$props.thumbnailClasses);
    		if ('thumbnailStyle' in $$props) $$invalidate(1, thumbnailStyle = $$props.thumbnailStyle);
    		if ('modalClasses' in $$props) $$invalidate(2, modalClasses = $$props.modalClasses);
    		if ('modalStyle' in $$props) $$invalidate(3, modalStyle = $$props.modalStyle);
    		if ('gallery' in $$props) $$invalidate(4, gallery = $$props.gallery);
    		if ('title' in $$props) $$invalidate(5, title = $$props.title);
    		if ('description' in $$props) $$invalidate(6, description = $$props.description);
    		if ('transitionDuration' in $$props) $$invalidate(7, transitionDuration = $$props.transitionDuration);
    		if ('protect' in $$props) $$invalidate(8, protect = $$props.protect);
    		if ('image' in $$props) $$invalidate(9, image = $$props.image);
    		if ('portrait' in $$props) $$invalidate(10, portrait = $$props.portrait);
    		if ('noScroll' in $$props) $$invalidate(20, noScroll = $$props.noScroll);
    		if ('thumbnail' in $$props) $$invalidate(14, thumbnail = $$props.thumbnail);
    		if ('imagePreset' in $$props) $$invalidate(11, imagePreset = $$props.imagePreset);
    		if ('clickToClose' in $$props) $$invalidate(21, clickToClose = $$props.clickToClose);
    		if ('closeButton' in $$props) $$invalidate(12, closeButton = $$props.closeButton);
    		if ('isVisible' in $$props) $$invalidate(13, isVisible = $$props.isVisible);
    		if ('modalClicked' in $$props) modalClicked = $$props.modalClicked;
    		if ('toggleScroll' in $$props) toggleScroll = $$props.toggleScroll;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		thumbnailClasses,
    		thumbnailStyle,
    		modalClasses,
    		modalStyle,
    		gallery,
    		title,
    		description,
    		transitionDuration,
    		protect,
    		image,
    		portrait,
    		imagePreset,
    		closeButton,
    		isVisible,
    		thumbnail,
    		toggle,
    		close,
    		coverClick,
    		modalClick,
    		$$slots,
    		noScroll,
    		clickToClose,
    		slots,
    		thumbnail_1_class_binding,
    		thumbnail_1_style_binding,
    		thumbnail_1_protect_binding,
    		modal_modalClasses_binding,
    		modal_modalStyle_binding,
    		modal_transitionDuration_binding,
    		modal_image_binding,
    		modal_protect_binding,
    		modal_portrait_binding,
    		modal_title_binding,
    		modal_description_binding,
    		modal_gallery_binding,
    		modal_imagePreset_binding,
    		modal_closeButton_binding,
    		$$scope
    	];
    }

    class Lightbox extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(
    			this,
    			options,
    			instance$h,
    			create_fragment$h,
    			safe_not_equal,
    			{
    				thumbnailClasses: 0,
    				thumbnailStyle: 1,
    				modalClasses: 2,
    				modalStyle: 3,
    				gallery: 4,
    				title: 5,
    				description: 6,
    				transitionDuration: 7,
    				protect: 8,
    				image: 9,
    				portrait: 10,
    				noScroll: 20,
    				thumbnail: 14,
    				imagePreset: 11,
    				clickToClose: 21,
    				closeButton: 12,
    				isVisible: 13
    			},
    			null,
    			[-1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Lightbox",
    			options,
    			id: create_fragment$h.name
    		});
    	}

    	get thumbnailClasses() {
    		throw new Error("<Lightbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set thumbnailClasses(value) {
    		throw new Error("<Lightbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get thumbnailStyle() {
    		throw new Error("<Lightbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set thumbnailStyle(value) {
    		throw new Error("<Lightbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get modalClasses() {
    		throw new Error("<Lightbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set modalClasses(value) {
    		throw new Error("<Lightbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get modalStyle() {
    		throw new Error("<Lightbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set modalStyle(value) {
    		throw new Error("<Lightbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get gallery() {
    		throw new Error("<Lightbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set gallery(value) {
    		throw new Error("<Lightbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<Lightbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Lightbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get description() {
    		throw new Error("<Lightbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set description(value) {
    		throw new Error("<Lightbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get transitionDuration() {
    		throw new Error("<Lightbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set transitionDuration(value) {
    		throw new Error("<Lightbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get protect() {
    		throw new Error("<Lightbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set protect(value) {
    		throw new Error("<Lightbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get image() {
    		throw new Error("<Lightbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set image(value) {
    		throw new Error("<Lightbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get portrait() {
    		throw new Error("<Lightbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set portrait(value) {
    		throw new Error("<Lightbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get noScroll() {
    		throw new Error("<Lightbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set noScroll(value) {
    		throw new Error("<Lightbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get thumbnail() {
    		throw new Error("<Lightbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set thumbnail(value) {
    		throw new Error("<Lightbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get imagePreset() {
    		throw new Error("<Lightbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set imagePreset(value) {
    		throw new Error("<Lightbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get clickToClose() {
    		throw new Error("<Lightbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set clickToClose(value) {
    		throw new Error("<Lightbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get closeButton() {
    		throw new Error("<Lightbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set closeButton(value) {
    		throw new Error("<Lightbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isVisible() {
    		throw new Error("<Lightbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isVisible(value) {
    		throw new Error("<Lightbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\svelte-media-query\src\MediaQuery.svelte generated by Svelte v3.47.0 */
    const get_default_slot_changes = dirty => ({ matches: dirty & /*matches*/ 1 });
    const get_default_slot_context = ctx => ({ matches: /*matches*/ ctx[0] });

    function create_fragment$g(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], get_default_slot_context);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope, matches*/ 9)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[3],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[3])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[3], dirty, get_default_slot_changes),
    						get_default_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$g.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$g($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('MediaQuery', slots, ['default']);
    	let { query } = $$props;
    	let mql;
    	let mqlListener;
    	let wasMounted = false;
    	let matches = false;

    	onMount(() => {
    		$$invalidate(2, wasMounted = true);

    		return () => {
    			removeActiveListener();
    		};
    	});

    	function addNewListener(query) {
    		mql = window.matchMedia(query);
    		mqlListener = v => $$invalidate(0, matches = v.matches);

    		mql.addEventListener
    		? mql.addEventListener("change", mqlListener)
    		: mql.addListener(mqlListener);

    		$$invalidate(0, matches = mql.matches);
    	}

    	function removeActiveListener() {
    		if (mql && mqlListener) {
    			mql.removeEventListener
    			? mql.removeEventListener("change", mqlListener)
    			: mql.removeListener(mqlListener);
    		}
    	}

    	const writable_props = ['query'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<MediaQuery> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('query' in $$props) $$invalidate(1, query = $$props.query);
    		if ('$$scope' in $$props) $$invalidate(3, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		query,
    		mql,
    		mqlListener,
    		wasMounted,
    		matches,
    		addNewListener,
    		removeActiveListener
    	});

    	$$self.$inject_state = $$props => {
    		if ('query' in $$props) $$invalidate(1, query = $$props.query);
    		if ('mql' in $$props) mql = $$props.mql;
    		if ('mqlListener' in $$props) mqlListener = $$props.mqlListener;
    		if ('wasMounted' in $$props) $$invalidate(2, wasMounted = $$props.wasMounted);
    		if ('matches' in $$props) $$invalidate(0, matches = $$props.matches);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*wasMounted, query*/ 6) {
    			{
    				if (wasMounted) {
    					removeActiveListener();
    					addNewListener(query);
    				}
    			}
    		}
    	};

    	return [matches, query, wasMounted, $$scope, slots];
    }

    class MediaQuery$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$g, create_fragment$g, safe_not_equal, { query: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "MediaQuery",
    			options,
    			id: create_fragment$g.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*query*/ ctx[1] === undefined && !('query' in props)) {
    			console.warn("<MediaQuery> was created without expected prop 'query'");
    		}
    	}

    	get query() {
    		throw new Error("<MediaQuery>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set query(value) {
    		throw new Error("<MediaQuery>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\DeviceContent.svelte generated by Svelte v3.47.0 */

    const { console: console_1$2 } = globals;
    const file$f = "src\\components\\DeviceContent.svelte";

    // (44:8) {:else}
    function create_else_block_1(ctx) {
    	let div;
    	let lightbox;
    	let current;

    	lightbox = new Lightbox({
    			props: {
    				transitionDuration: "150",
    				$$slots: { default: [create_default_slot_2$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(lightbox.$$.fragment);
    			attr_dev(div, "class", "lightbox svelte-w9ee7m");
    			add_location(div, file$f, 44, 12, 1641);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(lightbox, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const lightbox_changes = {};

    			if (dirty & /*$$scope, img*/ 129) {
    				lightbox_changes.$$scope = { dirty, ctx };
    			}

    			lightbox.$set(lightbox_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(lightbox.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(lightbox.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(lightbox);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_1.name,
    		type: "else",
    		source: "(44:8) {:else}",
    		ctx
    	});

    	return block;
    }

    // (21:8) {#if preview}
    function create_if_block$7(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_1$6, create_if_block_2$5, create_else_block$2];
    	const if_blocks = [];

    	function select_block_type_1(ctx, dirty) {
    		if (/*matches*/ ctx[6] && /*hasDesktopPreview*/ ctx[3]) return 0;
    		if (/*hasMobilePreview*/ ctx[4]) return 1;
    		return 2;
    	}

    	current_block_type_index = select_block_type_1(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type_1(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$7.name,
    		type: "if",
    		source: "(21:8) {#if preview}",
    		ctx
    	});

    	return block;
    }

    // (46:16) <Lightbox transitionDuration="150">
    function create_default_slot_2$1(ctx) {
    	let img_1;
    	let img_1_src_value;

    	const block = {
    		c: function create() {
    			img_1 = element("img");
    			attr_dev(img_1, "class", "gif svelte-w9ee7m");
    			if (!src_url_equal(img_1.src, img_1_src_value = /*img*/ ctx[0])) attr_dev(img_1, "src", img_1_src_value);
    			attr_dev(img_1, "alt", "project preview");
    			add_location(img_1, file$f, 46, 20, 1738);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img_1, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*img*/ 1 && !src_url_equal(img_1.src, img_1_src_value = /*img*/ ctx[0])) {
    				attr_dev(img_1, "src", img_1_src_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$1.name,
    		type: "slot",
    		source: "(46:16) <Lightbox transitionDuration=\\\"150\\\">",
    		ctx
    	});

    	return block;
    }

    // (37:12) {:else}
    function create_else_block$2(ctx) {
    	let div;
    	let lightbox;
    	let current;

    	lightbox = new Lightbox({
    			props: {
    				transitionDuration: "150",
    				$$slots: { default: [create_default_slot_1$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(lightbox.$$.fragment);
    			attr_dev(div, "class", "lightbox svelte-w9ee7m");
    			add_location(div, file$f, 37, 16, 1381);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(lightbox, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const lightbox_changes = {};

    			if (dirty & /*$$scope, gif*/ 132) {
    				lightbox_changes.$$scope = { dirty, ctx };
    			}

    			lightbox.$set(lightbox_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(lightbox.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(lightbox.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(lightbox);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$2.name,
    		type: "else",
    		source: "(37:12) {:else}",
    		ctx
    	});

    	return block;
    }

    // (24:39) 
    function create_if_block_2$5(ctx) {
    	let div1;
    	let img0;
    	let img0_src_value;
    	let t;
    	let a;
    	let div0;
    	let img1;
    	let img1_src_value;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			img0 = element("img");
    			t = space();
    			a = element("a");
    			div0 = element("div");
    			img1 = element("img");
    			attr_dev(img0, "class", "gif svelte-w9ee7m");
    			if (!src_url_equal(img0.src, img0_src_value = /*gif*/ ctx[2])) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "gameplay gif");
    			add_location(img0, file$f, 25, 20, 889);
    			attr_dev(img1, "class", "playBtn svelte-w9ee7m");
    			if (!src_url_equal(img1.src, img1_src_value = "/assets/icons/play.png")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "play button");
    			add_location(img1, file$f, 28, 28, 1062);
    			attr_dev(div0, "class", "cover svelte-w9ee7m");
    			add_location(div0, file$f, 27, 24, 1013);
    			attr_dev(a, "href", /*src*/ ctx[1]);
    			attr_dev(a, "target", "game");
    			add_location(a, file$f, 26, 20, 959);
    			attr_dev(div1, "class", "demo svelte-w9ee7m");
    			add_location(div1, file$f, 24, 16, 849);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, img0);
    			append_dev(div1, t);
    			append_dev(div1, a);
    			append_dev(a, div0);
    			append_dev(div0, img1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*gif*/ 4 && !src_url_equal(img0.src, img0_src_value = /*gif*/ ctx[2])) {
    				attr_dev(img0, "src", img0_src_value);
    			}

    			if (dirty & /*src*/ 2) {
    				attr_dev(a, "href", /*src*/ ctx[1]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$5.name,
    		type: "if",
    		source: "(24:39) ",
    		ctx
    	});

    	return block;
    }

    // (22:12) {#if matches && hasDesktopPreview}
    function create_if_block_1$6(ctx) {
    	let iframe;
    	let iframe_src_value;

    	const block = {
    		c: function create() {
    			iframe = element("iframe");
    			if (!src_url_equal(iframe.src, iframe_src_value = /*src*/ ctx[1])) attr_dev(iframe, "src", iframe_src_value);
    			attr_dev(iframe, "title", "Game Preview");
    			iframe.allowFullscreen = true;
    			attr_dev(iframe, "class", "svelte-w9ee7m");
    			add_location(iframe, file$f, 22, 16, 730);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, iframe, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*src*/ 2 && !src_url_equal(iframe.src, iframe_src_value = /*src*/ ctx[1])) {
    				attr_dev(iframe, "src", iframe_src_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(iframe);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$6.name,
    		type: "if",
    		source: "(22:12) {#if matches && hasDesktopPreview}",
    		ctx
    	});

    	return block;
    }

    // (39:20) <Lightbox transitionDuration="150">
    function create_default_slot_1$3(ctx) {
    	let img_1;
    	let img_1_src_value;

    	const block = {
    		c: function create() {
    			img_1 = element("img");
    			attr_dev(img_1, "class", "gif svelte-w9ee7m");
    			if (!src_url_equal(img_1.src, img_1_src_value = /*gif*/ ctx[2])) attr_dev(img_1, "src", img_1_src_value);
    			attr_dev(img_1, "alt", "gameplay gif");
    			add_location(img_1, file$f, 39, 24, 1486);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img_1, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*gif*/ 4 && !src_url_equal(img_1.src, img_1_src_value = /*gif*/ ctx[2])) {
    				attr_dev(img_1, "src", img_1_src_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$3.name,
    		type: "slot",
    		source: "(39:20) <Lightbox transitionDuration=\\\"150\\\">",
    		ctx
    	});

    	return block;
    }

    // (20:4) <MediaQuery query="(min-width: 1200px)" let:matches>
    function create_default_slot$6(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$7, create_else_block_1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*preview*/ ctx[5]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$6.name,
    		type: "slot",
    		source: "(20:4) <MediaQuery query=\\\"(min-width: 1200px)\\\" let:matches>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$f(ctx) {
    	let div;
    	let mediaquery;
    	let current;

    	mediaquery = new MediaQuery$1({
    			props: {
    				query: "(min-width: 1200px)",
    				$$slots: {
    					default: [
    						create_default_slot$6,
    						({ matches }) => ({ 6: matches }),
    						({ matches }) => matches ? 64 : 0
    					]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(mediaquery.$$.fragment);
    			attr_dev(div, "class", "screen svelte-w9ee7m");
    			add_location(div, file$f, 18, 0, 563);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(mediaquery, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const mediaquery_changes = {};

    			if (dirty & /*$$scope, src, matches, hasDesktopPreview, gif, hasMobilePreview, preview, img*/ 255) {
    				mediaquery_changes.$$scope = { dirty, ctx };
    			}

    			mediaquery.$set(mediaquery_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(mediaquery.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(mediaquery.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(mediaquery);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$f.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$f($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('DeviceContent', slots, []);
    	let { img, src, gif, hasDesktopPreview, hasMobilePreview } = $$props;

    	// If img is defined, content is static and does not have preview content
    	let preview = false;

    	if (img === "") {
    		preview = true;
    	}

    	console.log(hasMobilePreview);
    	const writable_props = ['img', 'src', 'gif', 'hasDesktopPreview', 'hasMobilePreview'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$2.warn(`<DeviceContent> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('img' in $$props) $$invalidate(0, img = $$props.img);
    		if ('src' in $$props) $$invalidate(1, src = $$props.src);
    		if ('gif' in $$props) $$invalidate(2, gif = $$props.gif);
    		if ('hasDesktopPreview' in $$props) $$invalidate(3, hasDesktopPreview = $$props.hasDesktopPreview);
    		if ('hasMobilePreview' in $$props) $$invalidate(4, hasMobilePreview = $$props.hasMobilePreview);
    	};

    	$$self.$capture_state = () => ({
    		Lightbox,
    		MediaQuery: MediaQuery$1,
    		img,
    		src,
    		gif,
    		hasDesktopPreview,
    		hasMobilePreview,
    		preview
    	});

    	$$self.$inject_state = $$props => {
    		if ('img' in $$props) $$invalidate(0, img = $$props.img);
    		if ('src' in $$props) $$invalidate(1, src = $$props.src);
    		if ('gif' in $$props) $$invalidate(2, gif = $$props.gif);
    		if ('hasDesktopPreview' in $$props) $$invalidate(3, hasDesktopPreview = $$props.hasDesktopPreview);
    		if ('hasMobilePreview' in $$props) $$invalidate(4, hasMobilePreview = $$props.hasMobilePreview);
    		if ('preview' in $$props) $$invalidate(5, preview = $$props.preview);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [img, src, gif, hasDesktopPreview, hasMobilePreview, preview];
    }

    class DeviceContent extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$f, create_fragment$f, safe_not_equal, {
    			img: 0,
    			src: 1,
    			gif: 2,
    			hasDesktopPreview: 3,
    			hasMobilePreview: 4
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "DeviceContent",
    			options,
    			id: create_fragment$f.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*img*/ ctx[0] === undefined && !('img' in props)) {
    			console_1$2.warn("<DeviceContent> was created without expected prop 'img'");
    		}

    		if (/*src*/ ctx[1] === undefined && !('src' in props)) {
    			console_1$2.warn("<DeviceContent> was created without expected prop 'src'");
    		}

    		if (/*gif*/ ctx[2] === undefined && !('gif' in props)) {
    			console_1$2.warn("<DeviceContent> was created without expected prop 'gif'");
    		}

    		if (/*hasDesktopPreview*/ ctx[3] === undefined && !('hasDesktopPreview' in props)) {
    			console_1$2.warn("<DeviceContent> was created without expected prop 'hasDesktopPreview'");
    		}

    		if (/*hasMobilePreview*/ ctx[4] === undefined && !('hasMobilePreview' in props)) {
    			console_1$2.warn("<DeviceContent> was created without expected prop 'hasMobilePreview'");
    		}
    	}

    	get img() {
    		throw new Error("<DeviceContent>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set img(value) {
    		throw new Error("<DeviceContent>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get src() {
    		throw new Error("<DeviceContent>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set src(value) {
    		throw new Error("<DeviceContent>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get gif() {
    		throw new Error("<DeviceContent>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set gif(value) {
    		throw new Error("<DeviceContent>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get hasDesktopPreview() {
    		throw new Error("<DeviceContent>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set hasDesktopPreview(value) {
    		throw new Error("<DeviceContent>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get hasMobilePreview() {
    		throw new Error("<DeviceContent>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set hasMobilePreview(value) {
    		throw new Error("<DeviceContent>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\Laptop.svelte generated by Svelte v3.47.0 */
    const file$e = "src\\components\\Laptop.svelte";

    function create_fragment$e(ctx) {
    	let div6;
    	let div1;
    	let div0;
    	let t0;
    	let div3;
    	let div2;
    	let devicecontent;
    	let t1;
    	let div5;
    	let div4;
    	let current;

    	devicecontent = new DeviceContent({
    			props: {
    				img: /*img*/ ctx[0],
    				src: /*src*/ ctx[1],
    				gif: /*gif*/ ctx[2],
    				hasDesktopPreview: /*hasDesktopPreview*/ ctx[3],
    				hasMobilePreview: /*hasMobilePreview*/ ctx[4]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div6 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			t0 = space();
    			div3 = element("div");
    			div2 = element("div");
    			create_component(devicecontent.$$.fragment);
    			t1 = space();
    			div5 = element("div");
    			div4 = element("div");
    			attr_dev(div0, "class", "laptop__camera svelte-aupvis");
    			add_location(div0, file$e, 12, 8, 304);
    			attr_dev(div1, "class", "laptop__top svelte-aupvis");
    			add_location(div1, file$e, 11, 4, 269);
    			attr_dev(div2, "class", "game svelte-aupvis");
    			add_location(div2, file$e, 15, 8, 387);
    			attr_dev(div3, "class", "laptop__mid svelte-aupvis");
    			add_location(div3, file$e, 14, 4, 352);
    			attr_dev(div4, "class", "laptop__divot svelte-aupvis");
    			add_location(div4, file$e, 26, 8, 660);
    			attr_dev(div5, "class", "laptop__bot svelte-aupvis");
    			add_location(div5, file$e, 25, 4, 625);
    			attr_dev(div6, "class", "laptop svelte-aupvis");
    			add_location(div6, file$e, 10, 0, 243);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div6, anchor);
    			append_dev(div6, div1);
    			append_dev(div1, div0);
    			append_dev(div6, t0);
    			append_dev(div6, div3);
    			append_dev(div3, div2);
    			mount_component(devicecontent, div2, null);
    			append_dev(div6, t1);
    			append_dev(div6, div5);
    			append_dev(div5, div4);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const devicecontent_changes = {};
    			if (dirty & /*img*/ 1) devicecontent_changes.img = /*img*/ ctx[0];
    			if (dirty & /*src*/ 2) devicecontent_changes.src = /*src*/ ctx[1];
    			if (dirty & /*gif*/ 4) devicecontent_changes.gif = /*gif*/ ctx[2];
    			if (dirty & /*hasDesktopPreview*/ 8) devicecontent_changes.hasDesktopPreview = /*hasDesktopPreview*/ ctx[3];
    			if (dirty & /*hasMobilePreview*/ 16) devicecontent_changes.hasMobilePreview = /*hasMobilePreview*/ ctx[4];
    			devicecontent.$set(devicecontent_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(devicecontent.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(devicecontent.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div6);
    			destroy_component(devicecontent);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$e($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Laptop', slots, []);
    	let { img = "" } = $$props;
    	let { src = "" } = $$props;
    	let { gif = "" } = $$props;
    	let { hasDesktopPreview = true } = $$props;
    	let { hasMobilePreview = true } = $$props;
    	const writable_props = ['img', 'src', 'gif', 'hasDesktopPreview', 'hasMobilePreview'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Laptop> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('img' in $$props) $$invalidate(0, img = $$props.img);
    		if ('src' in $$props) $$invalidate(1, src = $$props.src);
    		if ('gif' in $$props) $$invalidate(2, gif = $$props.gif);
    		if ('hasDesktopPreview' in $$props) $$invalidate(3, hasDesktopPreview = $$props.hasDesktopPreview);
    		if ('hasMobilePreview' in $$props) $$invalidate(4, hasMobilePreview = $$props.hasMobilePreview);
    	};

    	$$self.$capture_state = () => ({
    		DeviceContent,
    		img,
    		src,
    		gif,
    		hasDesktopPreview,
    		hasMobilePreview
    	});

    	$$self.$inject_state = $$props => {
    		if ('img' in $$props) $$invalidate(0, img = $$props.img);
    		if ('src' in $$props) $$invalidate(1, src = $$props.src);
    		if ('gif' in $$props) $$invalidate(2, gif = $$props.gif);
    		if ('hasDesktopPreview' in $$props) $$invalidate(3, hasDesktopPreview = $$props.hasDesktopPreview);
    		if ('hasMobilePreview' in $$props) $$invalidate(4, hasMobilePreview = $$props.hasMobilePreview);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [img, src, gif, hasDesktopPreview, hasMobilePreview];
    }

    class Laptop extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$e, create_fragment$e, safe_not_equal, {
    			img: 0,
    			src: 1,
    			gif: 2,
    			hasDesktopPreview: 3,
    			hasMobilePreview: 4
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Laptop",
    			options,
    			id: create_fragment$e.name
    		});
    	}

    	get img() {
    		throw new Error("<Laptop>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set img(value) {
    		throw new Error("<Laptop>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get src() {
    		throw new Error("<Laptop>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set src(value) {
    		throw new Error("<Laptop>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get gif() {
    		throw new Error("<Laptop>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set gif(value) {
    		throw new Error("<Laptop>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get hasDesktopPreview() {
    		throw new Error("<Laptop>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set hasDesktopPreview(value) {
    		throw new Error("<Laptop>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get hasMobilePreview() {
    		throw new Error("<Laptop>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set hasMobilePreview(value) {
    		throw new Error("<Laptop>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\web\Project.svelte generated by Svelte v3.47.0 */
    const file$d = "src\\components\\web\\Project.svelte";

    function get_each_context$4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	return child_ctx;
    }

    // (19:12) {#each stack as item}
    function create_each_block$4(ctx) {
    	let h4;
    	let t_value = /*item*/ ctx[4] + "";
    	let t;

    	const block = {
    		c: function create() {
    			h4 = element("h4");
    			t = text(t_value);
    			attr_dev(h4, "class", "svelte-1rnhz2y");
    			add_location(h4, file$d, 19, 16, 642);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h4, anchor);
    			append_dev(h4, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*stack*/ 4 && t_value !== (t_value = /*item*/ ctx[4] + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h4);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$4.name,
    		type: "each",
    		source: "(19:12) {#each stack as item}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$d(ctx) {
    	let div5;
    	let h30;
    	let t0;
    	let t1;
    	let div2;
    	let div0;
    	let laptop;
    	let t2;
    	let div1;
    	let t3;
    	let div4;
    	let h31;
    	let t4;
    	let t5;
    	let p;
    	let t6;
    	let t7;
    	let div3;
    	let button0;
    	let t9;
    	let button1;
    	let current;

    	laptop = new Laptop({
    			props: {
    				img: "/assets/games/protoshift/protoshiftcover.png"
    			},
    			$$inline: true
    		});

    	let each_value = /*stack*/ ctx[2];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div5 = element("div");
    			h30 = element("h3");
    			t0 = text(/*title*/ ctx[0]);
    			t1 = space();
    			div2 = element("div");
    			div0 = element("div");
    			create_component(laptop.$$.fragment);
    			t2 = space();
    			div1 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t3 = space();
    			div4 = element("div");
    			h31 = element("h3");
    			t4 = text(/*title*/ ctx[0]);
    			t5 = space();
    			p = element("p");
    			t6 = text(/*desc*/ ctx[1]);
    			t7 = space();
    			div3 = element("div");
    			button0 = element("button");
    			button0.textContent = "Live Demo";
    			t9 = space();
    			button1 = element("button");
    			button1.textContent = "More Info & Source";
    			attr_dev(h30, "class", "project__title svelte-1rnhz2y");
    			add_location(h30, file$d, 10, 4, 280);
    			set_style(div0, "padding-inline", "30px");
    			add_location(div0, file$d, 13, 8, 391);
    			set_style(div1, "display", "flex");
    			set_style(div1, "justify-content", "center");
    			set_style(div1, "gap", "5% ");
    			add_location(div1, file$d, 17, 8, 527);
    			attr_dev(div2, "class", "spotlight content__section svelte-1rnhz2y");
    			toggle_class(div2, "reverse", /*reverse*/ ctx[3]);
    			add_location(div2, file$d, 12, 4, 327);
    			attr_dev(h31, "class", "info__title svelte-1rnhz2y");
    			add_location(h31, file$d, 25, 8, 773);
    			attr_dev(p, "class", "info__text svelte-1rnhz2y");
    			add_location(p, file$d, 27, 8, 821);
    			attr_dev(button0, "class", "button");
    			add_location(button0, file$d, 31, 12, 922);
    			attr_dev(button1, "class", "button");
    			add_location(button1, file$d, 32, 12, 977);
    			attr_dev(div3, "class", "buttons svelte-1rnhz2y");
    			add_location(div3, file$d, 30, 8, 887);
    			attr_dev(div4, "class", "info content__section svelte-1rnhz2y");
    			toggle_class(div4, "reverse", /*reverse*/ ctx[3]);
    			add_location(div4, file$d, 24, 4, 714);
    			attr_dev(div5, "class", "project content svelte-1rnhz2y");
    			add_location(div5, file$d, 9, 0, 245);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div5, anchor);
    			append_dev(div5, h30);
    			append_dev(h30, t0);
    			append_dev(div5, t1);
    			append_dev(div5, div2);
    			append_dev(div2, div0);
    			mount_component(laptop, div0, null);
    			append_dev(div2, t2);
    			append_dev(div2, div1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}

    			append_dev(div5, t3);
    			append_dev(div5, div4);
    			append_dev(div4, h31);
    			append_dev(h31, t4);
    			append_dev(div4, t5);
    			append_dev(div4, p);
    			append_dev(p, t6);
    			append_dev(div4, t7);
    			append_dev(div4, div3);
    			append_dev(div3, button0);
    			append_dev(div3, t9);
    			append_dev(div3, button1);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*title*/ 1) set_data_dev(t0, /*title*/ ctx[0]);

    			if (dirty & /*stack*/ 4) {
    				each_value = /*stack*/ ctx[2];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$4(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$4(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div1, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*reverse*/ 8) {
    				toggle_class(div2, "reverse", /*reverse*/ ctx[3]);
    			}

    			if (!current || dirty & /*title*/ 1) set_data_dev(t4, /*title*/ ctx[0]);
    			if (!current || dirty & /*desc*/ 2) set_data_dev(t6, /*desc*/ ctx[1]);

    			if (dirty & /*reverse*/ 8) {
    				toggle_class(div4, "reverse", /*reverse*/ ctx[3]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(laptop.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(laptop.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div5);
    			destroy_component(laptop);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$d($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Project', slots, []);
    	let { title, desc } = $$props;
    	let { stack = [] } = $$props;
    	let { reverse = false } = $$props;
    	const writable_props = ['title', 'desc', 'stack', 'reverse'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Project> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('desc' in $$props) $$invalidate(1, desc = $$props.desc);
    		if ('stack' in $$props) $$invalidate(2, stack = $$props.stack);
    		if ('reverse' in $$props) $$invalidate(3, reverse = $$props.reverse);
    	};

    	$$self.$capture_state = () => ({ Laptop, title, desc, stack, reverse });

    	$$self.$inject_state = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('desc' in $$props) $$invalidate(1, desc = $$props.desc);
    		if ('stack' in $$props) $$invalidate(2, stack = $$props.stack);
    		if ('reverse' in $$props) $$invalidate(3, reverse = $$props.reverse);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [title, desc, stack, reverse];
    }

    class Project extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$d, create_fragment$d, safe_not_equal, { title: 0, desc: 1, stack: 2, reverse: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Project",
    			options,
    			id: create_fragment$d.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*title*/ ctx[0] === undefined && !('title' in props)) {
    			console.warn("<Project> was created without expected prop 'title'");
    		}

    		if (/*desc*/ ctx[1] === undefined && !('desc' in props)) {
    			console.warn("<Project> was created without expected prop 'desc'");
    		}
    	}

    	get title() {
    		throw new Error("<Project>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Project>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get desc() {
    		throw new Error("<Project>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set desc(value) {
    		throw new Error("<Project>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get stack() {
    		throw new Error("<Project>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set stack(value) {
    		throw new Error("<Project>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get reverse() {
    		throw new Error("<Project>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set reverse(value) {
    		throw new Error("<Project>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\pages\Web.svelte generated by Svelte v3.47.0 */
    const file$c = "src\\pages\\Web.svelte";

    // (38:4) <Section top={false} bottom={false} bg={theme.bgColors.primary}>
    function create_default_slot_3(ctx) {
    	let h2;
    	let t1;
    	let skills;
    	let current;
    	skills = new Skills({ $$inline: true });

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			h2.textContent = "Skills";
    			t1 = space();
    			create_component(skills.$$.fragment);
    			attr_dev(h2, "class", "dash");
    			add_location(h2, file$c, 38, 8, 1506);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(skills, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(skills.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(skills.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    			if (detaching) detach_dev(t1);
    			destroy_component(skills, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(38:4) <Section top={false} bottom={false} bg={theme.bgColors.primary}>",
    		ctx
    	});

    	return block;
    }

    // (55:4) <Section          top={true}          bottom={false}          bg={"linear-gradient(120deg, rgba(113,120,125,1) 0%, rgba(112,145,170,1) 100%)"}      >
    function create_default_slot_2(ctx) {
    	let h2;
    	let t1;
    	let project0;
    	let t2;
    	let project1;
    	let t3;
    	let project2;
    	let current;

    	project0 = new Project({
    			props: {
    				title: "React Ticket Tracker",
    				desc: "React Ticket Tracker is a fullstack bug tracker built with React and with state management by redux. Supports filtering, user roles, permissions, and organization assignment. Backend is built with Node & Express. More filler paragraph text here cause it looks nice.",
    				stack: /*stack*/ ctx[0]
    			},
    			$$inline: true
    		});

    	project1 = new Project({
    			props: {
    				title: "Project 2",
    				desc: "React Ticket Tracker is a fullstack bug tracker built with React and with state management by redux. Supports filtering, user roles, permissions, and organization assignment. Backend is built with Node & Express. More filler paragraph text here cause it looks nice.",
    				stack: /*stack*/ ctx[0],
    				reverse: true
    			},
    			$$inline: true
    		});

    	project2 = new Project({
    			props: {
    				title: "New Project",
    				desc: "React Ticket Tracker is a fullstack bug tracker built with React and with state management by redux. Supports filtering, user roles, permissions, and organization assignment. Backend is built with Node & Express. More filler paragraph text here cause it looks nice.",
    				stack: /*stack*/ ctx[0]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			h2.textContent = "Projects";
    			t1 = space();
    			create_component(project0.$$.fragment);
    			t2 = space();
    			create_component(project1.$$.fragment);
    			t3 = space();
    			create_component(project2.$$.fragment);
    			attr_dev(h2, "class", "dash");
    			add_location(h2, file$c, 59, 8, 2140);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(project0, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(project1, target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(project2, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(project0.$$.fragment, local);
    			transition_in(project1.$$.fragment, local);
    			transition_in(project2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(project0.$$.fragment, local);
    			transition_out(project1.$$.fragment, local);
    			transition_out(project2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    			if (detaching) detach_dev(t1);
    			destroy_component(project0, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(project1, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(project2, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(55:4) <Section          top={true}          bottom={false}          bg={\\\"linear-gradient(120deg, rgba(113,120,125,1) 0%, rgba(112,145,170,1) 100%)\\\"}      >",
    		ctx
    	});

    	return block;
    }

    // (79:4) <Section top={true} bottom={true} bg={theme.bgColors.primary}>
    function create_default_slot_1$2(ctx) {
    	let h2;
    	let t1;
    	let otherprojects;
    	let current;

    	otherprojects = new OtherProjects({
    			props: { projects: /*projectsOther*/ ctx[1] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			h2.textContent = "Other Projects";
    			t1 = space();
    			create_component(otherprojects.$$.fragment);
    			attr_dev(h2, "class", "dash");
    			add_location(h2, file$c, 79, 8, 3411);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(otherprojects, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(otherprojects.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(otherprojects.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    			if (detaching) detach_dev(t1);
    			destroy_component(otherprojects, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$2.name,
    		type: "slot",
    		source: "(79:4) <Section top={true} bottom={true} bg={theme.bgColors.primary}>",
    		ctx
    	});

    	return block;
    }

    // (92:4) <SectionBreak>
    function create_default_slot$5(ctx) {
    	let contactform;
    	let current;
    	contactform = new ContactForm({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(contactform.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(contactform, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(contactform.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(contactform.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(contactform, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$5.name,
    		type: "slot",
    		source: "(92:4) <SectionBreak>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$c(ctx) {
    	let div;
    	let section0;
    	let t0;
    	let section1;
    	let t1;
    	let section2;
    	let t2;
    	let sectionbreak;
    	let current;

    	section0 = new Section({
    			props: {
    				top: false,
    				bottom: false,
    				bg: theme.bgColors.primary,
    				$$slots: { default: [create_default_slot_3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	section1 = new Section({
    			props: {
    				top: true,
    				bottom: false,
    				bg: "linear-gradient(120deg, rgba(113,120,125,1) 0%, rgba(112,145,170,1) 100%)",
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	section2 = new Section({
    			props: {
    				top: true,
    				bottom: true,
    				bg: theme.bgColors.primary,
    				$$slots: { default: [create_default_slot_1$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	sectionbreak = new SectionBreak({
    			props: {
    				$$slots: { default: [create_default_slot$5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(section0.$$.fragment);
    			t0 = space();
    			create_component(section1.$$.fragment);
    			t1 = space();
    			create_component(section2.$$.fragment);
    			t2 = space();
    			create_component(sectionbreak.$$.fragment);
    			attr_dev(div, "class", "page");
    			add_location(div, file$c, 32, 0, 1274);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(section0, div, null);
    			append_dev(div, t0);
    			mount_component(section1, div, null);
    			append_dev(div, t1);
    			mount_component(section2, div, null);
    			append_dev(div, t2);
    			mount_component(sectionbreak, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const section0_changes = {};

    			if (dirty & /*$$scope*/ 4) {
    				section0_changes.$$scope = { dirty, ctx };
    			}

    			section0.$set(section0_changes);
    			const section1_changes = {};

    			if (dirty & /*$$scope*/ 4) {
    				section1_changes.$$scope = { dirty, ctx };
    			}

    			section1.$set(section1_changes);
    			const section2_changes = {};

    			if (dirty & /*$$scope*/ 4) {
    				section2_changes.$$scope = { dirty, ctx };
    			}

    			section2.$set(section2_changes);
    			const sectionbreak_changes = {};

    			if (dirty & /*$$scope*/ 4) {
    				sectionbreak_changes.$$scope = { dirty, ctx };
    			}

    			sectionbreak.$set(sectionbreak_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(section0.$$.fragment, local);
    			transition_in(section1.$$.fragment, local);
    			transition_in(section2.$$.fragment, local);
    			transition_in(sectionbreak.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(section0.$$.fragment, local);
    			transition_out(section1.$$.fragment, local);
    			transition_out(section2.$$.fragment, local);
    			transition_out(sectionbreak.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(section0);
    			destroy_component(section1);
    			destroy_component(section2);
    			destroy_component(sectionbreak);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Web', slots, []);
    	let stack = ["React", "Redux", "Node", "Express"];

    	let projectsOther = [
    		{
    			title: "Map Builder",
    			desc: "Create a fantasy style map with jqeury drag and drop",
    			img: "/assets/games/protoshift/protoshiftcover.png"
    		},
    		{
    			title: "Map Builder",
    			desc: "Create a fantasy style map with jqeury drag and drop",
    			img: "/assets/games/protoshift/protoshiftcover.png"
    		},
    		{
    			title: "Map Builder",
    			desc: "Create a fantasy style map with jqeury drag and drop",
    			img: "/assets/games/protoshift/protoshiftcover.png"
    		}
    	];

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Web> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		ContactForm,
    		OtherProjects,
    		SectionBreak,
    		Section,
    		Skills,
    		Project,
    		theme,
    		stack,
    		projectsOther
    	});

    	$$self.$inject_state = $$props => {
    		if ('stack' in $$props) $$invalidate(0, stack = $$props.stack);
    		if ('projectsOther' in $$props) $$invalidate(1, projectsOther = $$props.projectsOther);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [stack, projectsOther];
    }

    class Web extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Web",
    			options,
    			id: create_fragment$c.name
    		});
    	}
    }

    /* src\components\game\GameIntro.svelte generated by Svelte v3.47.0 */

    const file$b = "src\\components\\game\\GameIntro.svelte";

    function create_fragment$b(ctx) {
    	let h2;
    	let t1;
    	let div1;
    	let div0;
    	let p0;
    	let t3;
    	let p1;
    	let t5;
    	let p2;

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			h2.textContent = "About";
    			t1 = space();
    			div1 = element("div");
    			div0 = element("div");
    			p0 = element("p");
    			p0.textContent = "As a solo developer, I've worn many hats. I've taken games through\r\n            their full lifecycle: handling all aspects of designing, developing,\r\n            testing, and publishing. But I'm no stranger to getting in the\r\n            weeds. I like the idea of a π shaped skillset, wherein I specialize\r\n            in design and development.";
    			t3 = space();
    			p1 = element("p");
    			p1.textContent = "I've published projects on Steam, Google Play, and the App Store. My\r\n            HTML5 games have have reached millions of players and I've participated in a few game jams. I've worked as a freelancer on many projects, including apps, educational games, and games published as op-eds.";
    			t5 = space();
    			p2 = element("p");
    			p2.textContent = "Scroll down to see my finished projects to date.";
    			attr_dev(h2, "class", "dash");
    			add_location(h2, file$b, 0, 0, 0);
    			add_location(p0, file$b, 8, 8, 310);
    			add_location(p1, file$b, 15, 8, 696);
    			add_location(p2, file$b, 22, 8, 1272);
    			attr_dev(div0, "class", "content__text");
    			add_location(div0, file$b, 7, 4, 273);
    			attr_dev(div1, "class", "content");
    			add_location(div1, file$b, 6, 0, 246);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, p0);
    			append_dev(div0, t3);
    			append_dev(div0, p1);
    			append_dev(div0, t5);
    			append_dev(div0, p2);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('GameIntro', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<GameIntro> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class GameIntro extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "GameIntro",
    			options,
    			id: create_fragment$b.name
    		});
    	}
    }

    /* src\components\game\GameShowcaseLaptop.svelte generated by Svelte v3.47.0 */
    const file$a = "src\\components\\game\\GameShowcaseLaptop.svelte";

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[8] = list[i];
    	return child_ctx;
    }

    // (17:4) {#each links as link}
    function create_each_block$3(ctx) {
    	let a;
    	let h4;
    	let t0_value = /*link*/ ctx[8].label + "";
    	let t0;
    	let t1;
    	let a_href_value;

    	const block = {
    		c: function create() {
    			a = element("a");
    			h4 = element("h4");
    			t0 = text(t0_value);
    			t1 = space();
    			set_style(h4, "max-width", "100%");
    			add_location(h4, file$a, 18, 12, 511);
    			attr_dev(a, "href", a_href_value = /*link*/ ctx[8].link);
    			attr_dev(a, "target", "game");
    			add_location(a, file$a, 17, 8, 463);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, h4);
    			append_dev(h4, t0);
    			append_dev(a, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*links*/ 8 && t0_value !== (t0_value = /*link*/ ctx[8].label + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*links*/ 8 && a_href_value !== (a_href_value = /*link*/ ctx[8].link)) {
    				attr_dev(a, "href", a_href_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(17:4) {#each links as link}",
    		ctx
    	});

    	return block;
    }

    // (26:8) {#if date}
    function create_if_block$6(ctx) {
    	let p;
    	let b;
    	let t1;
    	let t2;

    	const block = {
    		c: function create() {
    			p = element("p");
    			b = element("b");
    			b.textContent = "Release Date:";
    			t1 = space();
    			t2 = text(/*date*/ ctx[1]);
    			add_location(b, file$a, 26, 15, 694);
    			add_location(p, file$a, 26, 12, 691);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, b);
    			append_dev(p, t1);
    			append_dev(p, t2);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*date*/ 2) set_data_dev(t2, /*date*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$6.name,
    		type: "if",
    		source: "(26:8) {#if date}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$a(ctx) {
    	let h2;
    	let t0;
    	let t1;
    	let div0;
    	let laptop;
    	let t2;
    	let div1;
    	let t3;
    	let div2;
    	let p;
    	let t4;
    	let switch_instance;
    	let current;

    	laptop = new Laptop({
    			props: {
    				src: /*src*/ ctx[0],
    				gif: /*gif*/ ctx[5],
    				hasDesktopPreview: /*hasDesktopPreview*/ ctx[6],
    				hasMobilePreview: /*hasMobilePreview*/ ctx[7]
    			},
    			$$inline: true
    		});

    	let each_value = /*links*/ ctx[3];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
    	}

    	let if_block = /*date*/ ctx[1] && create_if_block$6(ctx);
    	var switch_value = /*desc*/ ctx[4];

    	function switch_props(ctx) {
    		return { $$inline: true };
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props());
    	}

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			t0 = text(/*title*/ ctx[2]);
    			t1 = space();
    			div0 = element("div");
    			create_component(laptop.$$.fragment);
    			t2 = space();
    			div1 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t3 = space();
    			div2 = element("div");
    			p = element("p");
    			if (if_block) if_block.c();
    			t4 = space();
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			attr_dev(h2, "class", "dash title");
    			add_location(h2, file$a, 9, 0, 261);
    			attr_dev(div0, "class", "laptop-wrapper svelte-qe8y8c");
    			add_location(div0, file$a, 11, 0, 300);
    			attr_dev(div1, "class", "links svelte-qe8y8c");
    			add_location(div1, file$a, 15, 0, 407);
    			attr_dev(p, "class", "content__text ");
    			add_location(p, file$a, 24, 4, 631);
    			attr_dev(div2, "class", "content__section");
    			add_location(div2, file$a, 23, 0, 595);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    			append_dev(h2, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div0, anchor);
    			mount_component(laptop, div0, null);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, div1, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}

    			insert_dev(target, t3, anchor);
    			insert_dev(target, div2, anchor);
    			append_dev(div2, p);
    			if (if_block) if_block.m(p, null);
    			append_dev(p, t4);

    			if (switch_instance) {
    				mount_component(switch_instance, p, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*title*/ 4) set_data_dev(t0, /*title*/ ctx[2]);
    			const laptop_changes = {};
    			if (dirty & /*src*/ 1) laptop_changes.src = /*src*/ ctx[0];
    			if (dirty & /*gif*/ 32) laptop_changes.gif = /*gif*/ ctx[5];
    			if (dirty & /*hasDesktopPreview*/ 64) laptop_changes.hasDesktopPreview = /*hasDesktopPreview*/ ctx[6];
    			if (dirty & /*hasMobilePreview*/ 128) laptop_changes.hasMobilePreview = /*hasMobilePreview*/ ctx[7];
    			laptop.$set(laptop_changes);

    			if (dirty & /*links*/ 8) {
    				each_value = /*links*/ ctx[3];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$3(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div1, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (/*date*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$6(ctx);
    					if_block.c();
    					if_block.m(p, t4);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (switch_value !== (switch_value = /*desc*/ ctx[4])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, p, null);
    				} else {
    					switch_instance = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(laptop.$$.fragment, local);
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(laptop.$$.fragment, local);
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div0);
    			destroy_component(laptop);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(div1);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div2);
    			if (if_block) if_block.d();
    			if (switch_instance) destroy_component(switch_instance);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('GameShowcaseLaptop', slots, []);
    	let { src = "" } = $$props;
    	let { date = "" } = $$props;
    	let { title, links, desc, gif } = $$props;
    	let { hasDesktopPreview, hasMobilePreview } = $$props;

    	const writable_props = [
    		'src',
    		'date',
    		'title',
    		'links',
    		'desc',
    		'gif',
    		'hasDesktopPreview',
    		'hasMobilePreview'
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<GameShowcaseLaptop> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('src' in $$props) $$invalidate(0, src = $$props.src);
    		if ('date' in $$props) $$invalidate(1, date = $$props.date);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    		if ('links' in $$props) $$invalidate(3, links = $$props.links);
    		if ('desc' in $$props) $$invalidate(4, desc = $$props.desc);
    		if ('gif' in $$props) $$invalidate(5, gif = $$props.gif);
    		if ('hasDesktopPreview' in $$props) $$invalidate(6, hasDesktopPreview = $$props.hasDesktopPreview);
    		if ('hasMobilePreview' in $$props) $$invalidate(7, hasMobilePreview = $$props.hasMobilePreview);
    	};

    	$$self.$capture_state = () => ({
    		Laptop,
    		src,
    		date,
    		title,
    		links,
    		desc,
    		gif,
    		hasDesktopPreview,
    		hasMobilePreview
    	});

    	$$self.$inject_state = $$props => {
    		if ('src' in $$props) $$invalidate(0, src = $$props.src);
    		if ('date' in $$props) $$invalidate(1, date = $$props.date);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    		if ('links' in $$props) $$invalidate(3, links = $$props.links);
    		if ('desc' in $$props) $$invalidate(4, desc = $$props.desc);
    		if ('gif' in $$props) $$invalidate(5, gif = $$props.gif);
    		if ('hasDesktopPreview' in $$props) $$invalidate(6, hasDesktopPreview = $$props.hasDesktopPreview);
    		if ('hasMobilePreview' in $$props) $$invalidate(7, hasMobilePreview = $$props.hasMobilePreview);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [src, date, title, links, desc, gif, hasDesktopPreview, hasMobilePreview];
    }

    class GameShowcaseLaptop extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$a, create_fragment$a, safe_not_equal, {
    			src: 0,
    			date: 1,
    			title: 2,
    			links: 3,
    			desc: 4,
    			gif: 5,
    			hasDesktopPreview: 6,
    			hasMobilePreview: 7
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "GameShowcaseLaptop",
    			options,
    			id: create_fragment$a.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*title*/ ctx[2] === undefined && !('title' in props)) {
    			console.warn("<GameShowcaseLaptop> was created without expected prop 'title'");
    		}

    		if (/*links*/ ctx[3] === undefined && !('links' in props)) {
    			console.warn("<GameShowcaseLaptop> was created without expected prop 'links'");
    		}

    		if (/*desc*/ ctx[4] === undefined && !('desc' in props)) {
    			console.warn("<GameShowcaseLaptop> was created without expected prop 'desc'");
    		}

    		if (/*gif*/ ctx[5] === undefined && !('gif' in props)) {
    			console.warn("<GameShowcaseLaptop> was created without expected prop 'gif'");
    		}

    		if (/*hasDesktopPreview*/ ctx[6] === undefined && !('hasDesktopPreview' in props)) {
    			console.warn("<GameShowcaseLaptop> was created without expected prop 'hasDesktopPreview'");
    		}

    		if (/*hasMobilePreview*/ ctx[7] === undefined && !('hasMobilePreview' in props)) {
    			console.warn("<GameShowcaseLaptop> was created without expected prop 'hasMobilePreview'");
    		}
    	}

    	get src() {
    		throw new Error("<GameShowcaseLaptop>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set src(value) {
    		throw new Error("<GameShowcaseLaptop>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get date() {
    		throw new Error("<GameShowcaseLaptop>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set date(value) {
    		throw new Error("<GameShowcaseLaptop>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<GameShowcaseLaptop>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<GameShowcaseLaptop>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get links() {
    		throw new Error("<GameShowcaseLaptop>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set links(value) {
    		throw new Error("<GameShowcaseLaptop>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get desc() {
    		throw new Error("<GameShowcaseLaptop>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set desc(value) {
    		throw new Error("<GameShowcaseLaptop>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get gif() {
    		throw new Error("<GameShowcaseLaptop>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set gif(value) {
    		throw new Error("<GameShowcaseLaptop>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get hasDesktopPreview() {
    		throw new Error("<GameShowcaseLaptop>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set hasDesktopPreview(value) {
    		throw new Error("<GameShowcaseLaptop>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get hasMobilePreview() {
    		throw new Error("<GameShowcaseLaptop>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set hasMobilePreview(value) {
    		throw new Error("<GameShowcaseLaptop>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\Phone.svelte generated by Svelte v3.47.0 */

    const { console: console_1$1 } = globals;
    const file$9 = "src\\components\\Phone.svelte";

    function create_fragment$9(ctx) {
    	let div6;
    	let div1;
    	let div0;
    	let t0;
    	let div3;
    	let div2;
    	let devicecontent;
    	let t1;
    	let div5;
    	let div4;
    	let current;

    	devicecontent = new DeviceContent({
    			props: {
    				img: /*img*/ ctx[0],
    				src: /*src*/ ctx[1],
    				gif: /*gif*/ ctx[2],
    				hasDesktopPreview: /*hasDesktopPreview*/ ctx[3],
    				hasMobilePreview: /*hasMobilePreview*/ ctx[4]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div6 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			t0 = space();
    			div3 = element("div");
    			div2 = element("div");
    			create_component(devicecontent.$$.fragment);
    			t1 = space();
    			div5 = element("div");
    			div4 = element("div");
    			attr_dev(div0, "class", "phone__speaker svelte-1kkd9c0");
    			add_location(div0, file$9, 73, 8, 2252);
    			attr_dev(div1, "class", "phone__top svelte-1kkd9c0");
    			add_location(div1, file$9, 72, 4, 2218);
    			attr_dev(div2, "class", "game svelte-1kkd9c0");
    			toggle_class(div2, "fullscreen", /*fullscreenPreview*/ ctx[5] === true);
    			add_location(div2, file$9, 76, 8, 2334);
    			attr_dev(div3, "class", "phone__mid svelte-1kkd9c0");
    			add_location(div3, file$9, 75, 4, 2300);
    			attr_dev(div4, "class", "phone__home svelte-1kkd9c0");
    			add_location(div4, file$9, 94, 8, 2885);
    			attr_dev(div5, "class", "phone__bot svelte-1kkd9c0");
    			add_location(div5, file$9, 93, 4, 2851);
    			attr_dev(div6, "class", "phone svelte-1kkd9c0");
    			add_location(div6, file$9, 71, 0, 2193);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div6, anchor);
    			append_dev(div6, div1);
    			append_dev(div1, div0);
    			append_dev(div6, t0);
    			append_dev(div6, div3);
    			append_dev(div3, div2);
    			mount_component(devicecontent, div2, null);
    			append_dev(div6, t1);
    			append_dev(div6, div5);
    			append_dev(div5, div4);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const devicecontent_changes = {};
    			if (dirty & /*img*/ 1) devicecontent_changes.img = /*img*/ ctx[0];
    			if (dirty & /*src*/ 2) devicecontent_changes.src = /*src*/ ctx[1];
    			if (dirty & /*gif*/ 4) devicecontent_changes.gif = /*gif*/ ctx[2];
    			if (dirty & /*hasDesktopPreview*/ 8) devicecontent_changes.hasDesktopPreview = /*hasDesktopPreview*/ ctx[3];
    			if (dirty & /*hasMobilePreview*/ 16) devicecontent_changes.hasMobilePreview = /*hasMobilePreview*/ ctx[4];
    			devicecontent.$set(devicecontent_changes);

    			if (dirty & /*fullscreenPreview*/ 32) {
    				toggle_class(div2, "fullscreen", /*fullscreenPreview*/ ctx[5] === true);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(devicecontent.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(devicecontent.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div6);
    			destroy_component(devicecontent);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function requestFullScreen(element) {
    	let requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullscreen;

    	if (requestMethod) {
    		// Native full screen.
    		requestMethod.call(element);
    	} else if (typeof window.ActiveXObject !== "undefined") {
    		// IE Backup
    		var wscript = new ActiveXObject("WScript.Shell");

    		if (wscript !== null) {
    			wscript.SendKeys("{F11}");
    		}
    	}
    }

    function closeFullscreen() {
    	if (document.exitFullscreen) {
    		document.exitFullscreen();
    	} else if (document.webkitExitFullscreen) {
    		/* Safari */
    		document.webkitExitFullscreen();
    	} else if (document.msExitFullscreen) {
    		/* IE11 */
    		document.msExitFullscreen();
    	}
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Phone', slots, []);
    	let { img = "" } = $$props;
    	let { src = "" } = $$props;
    	let { gif = "" } = $$props;
    	let { hasDesktopPreview = true } = $$props;
    	let { hasMobilePreview = true } = $$props;

    	// Fullscreen Button
    	let fullscreenPreview = false;

    	document.addEventListener("fullscreenchange", () => {
    		console.log("fullscreenchange");
    		$$invalidate(5, fullscreenPreview = !fullscreenPreview);
    	});

    	if (document.addEventListener) {
    		document.addEventListener("webkitfullscreenchange", exitHandler, false);
    		document.addEventListener("mozfullscreenchange", exitHandler, false);
    		document.addEventListener("fullscreenchange", exitHandler, false);
    		document.addEventListener("MSFullscreenChange", exitHandler, false);
    	}

    	function exitHandler() {
    		$$invalidate(5, fullscreenPreview = !fullscreenPreview);
    	}

    	function toggleFullScreen() {
    		var game = document.getElementsByClassName("game")[0];

    		if (fullscreenPreview) {
    			closeFullscreen();
    		} else {
    			requestFullScreen(game);
    		}
    	}

    	const writable_props = ['img', 'src', 'gif', 'hasDesktopPreview', 'hasMobilePreview'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$1.warn(`<Phone> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('img' in $$props) $$invalidate(0, img = $$props.img);
    		if ('src' in $$props) $$invalidate(1, src = $$props.src);
    		if ('gif' in $$props) $$invalidate(2, gif = $$props.gif);
    		if ('hasDesktopPreview' in $$props) $$invalidate(3, hasDesktopPreview = $$props.hasDesktopPreview);
    		if ('hasMobilePreview' in $$props) $$invalidate(4, hasMobilePreview = $$props.hasMobilePreview);
    	};

    	$$self.$capture_state = () => ({
    		DeviceContent,
    		img,
    		src,
    		gif,
    		hasDesktopPreview,
    		hasMobilePreview,
    		fullscreenPreview,
    		exitHandler,
    		toggleFullScreen,
    		requestFullScreen,
    		closeFullscreen
    	});

    	$$self.$inject_state = $$props => {
    		if ('img' in $$props) $$invalidate(0, img = $$props.img);
    		if ('src' in $$props) $$invalidate(1, src = $$props.src);
    		if ('gif' in $$props) $$invalidate(2, gif = $$props.gif);
    		if ('hasDesktopPreview' in $$props) $$invalidate(3, hasDesktopPreview = $$props.hasDesktopPreview);
    		if ('hasMobilePreview' in $$props) $$invalidate(4, hasMobilePreview = $$props.hasMobilePreview);
    		if ('fullscreenPreview' in $$props) $$invalidate(5, fullscreenPreview = $$props.fullscreenPreview);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [img, src, gif, hasDesktopPreview, hasMobilePreview, fullscreenPreview];
    }

    class Phone extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {
    			img: 0,
    			src: 1,
    			gif: 2,
    			hasDesktopPreview: 3,
    			hasMobilePreview: 4
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Phone",
    			options,
    			id: create_fragment$9.name
    		});
    	}

    	get img() {
    		throw new Error("<Phone>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set img(value) {
    		throw new Error("<Phone>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get src() {
    		throw new Error("<Phone>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set src(value) {
    		throw new Error("<Phone>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get gif() {
    		throw new Error("<Phone>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set gif(value) {
    		throw new Error("<Phone>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get hasDesktopPreview() {
    		throw new Error("<Phone>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set hasDesktopPreview(value) {
    		throw new Error("<Phone>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get hasMobilePreview() {
    		throw new Error("<Phone>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set hasMobilePreview(value) {
    		throw new Error("<Phone>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\game\GameShowcasePhone.svelte generated by Svelte v3.47.0 */
    const file$8 = "src\\components\\game\\GameShowcasePhone.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[9] = list[i];
    	return child_ctx;
    }

    // (27:16) {#each links as link}
    function create_each_block$2(ctx) {
    	let a;
    	let h4;
    	let t0_value = /*link*/ ctx[9].label + "";
    	let t0;
    	let t1;
    	let a_href_value;

    	const block = {
    		c: function create() {
    			a = element("a");
    			h4 = element("h4");
    			t0 = text(t0_value);
    			t1 = space();
    			set_style(h4, "max-width", "100%");
    			add_location(h4, file$8, 28, 24, 975);
    			attr_dev(a, "href", a_href_value = /*link*/ ctx[9].link);
    			attr_dev(a, "target", "new");
    			add_location(a, file$8, 27, 20, 916);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, h4);
    			append_dev(h4, t0);
    			append_dev(a, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*links*/ 16 && t0_value !== (t0_value = /*link*/ ctx[9].label + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*links*/ 16 && a_href_value !== (a_href_value = /*link*/ ctx[9].link)) {
    				attr_dev(a, "href", a_href_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(27:16) {#each links as link}",
    		ctx
    	});

    	return block;
    }

    // (36:20) {#if date}
    function create_if_block_1$5(ctx) {
    	let p;
    	let b;
    	let t1;
    	let t2;

    	const block = {
    		c: function create() {
    			p = element("p");
    			b = element("b");
    			b.textContent = "Release Date:";
    			t1 = space();
    			t2 = text(/*date*/ ctx[1]);
    			add_location(b, file$8, 36, 27, 1242);
    			add_location(p, file$8, 36, 24, 1239);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, b);
    			append_dev(p, t1);
    			append_dev(p, t2);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*date*/ 2) set_data_dev(t2, /*date*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$5.name,
    		type: "if",
    		source: "(36:20) {#if date}",
    		ctx
    	});

    	return block;
    }

    // (42:12) {#if icon}
    function create_if_block$5(ctx) {
    	let div;
    	let lightbox;
    	let current;

    	lightbox = new Lightbox({
    			props: {
    				$$slots: { default: [create_default_slot$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(lightbox.$$.fragment);
    			attr_dev(div, "class", "icon svelte-1ljl7on");
    			add_location(div, file$8, 42, 16, 1439);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(lightbox, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const lightbox_changes = {};

    			if (dirty & /*$$scope, icon*/ 4100) {
    				lightbox_changes.$$scope = { dirty, ctx };
    			}

    			lightbox.$set(lightbox_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(lightbox.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(lightbox.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(lightbox);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$5.name,
    		type: "if",
    		source: "(42:12) {#if icon}",
    		ctx
    	});

    	return block;
    }

    // (44:20) <Lightbox>
    function create_default_slot$4(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			if (!src_url_equal(img.src, img_src_value = /*icon*/ ctx[2])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Game Icon");
    			attr_dev(img, "class", "svelte-1ljl7on");
    			add_location(img, file$8, 44, 24, 1515);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*icon*/ 4 && !src_url_equal(img.src, img_src_value = /*icon*/ ctx[2])) {
    				attr_dev(img, "src", img_src_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$4.name,
    		type: "slot",
    		source: "(44:20) <Lightbox>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$8(ctx) {
    	let h20;
    	let t0;
    	let t1;
    	let div7;
    	let div1;
    	let div0;
    	let phone;
    	let t2;
    	let div6;
    	let div5;
    	let div2;
    	let t3;
    	let h21;
    	let t4;
    	let t5;
    	let div3;
    	let t6;
    	let div4;
    	let p;
    	let t7;
    	let switch_instance;
    	let t8;
    	let current;

    	phone = new Phone({
    			props: {
    				src: /*src*/ ctx[0],
    				gif: /*gif*/ ctx[6],
    				hasDesktopPreview: /*hasDesktopPreview*/ ctx[7],
    				hasMobilePreview: /*hasMobilePreview*/ ctx[8]
    			},
    			$$inline: true
    		});

    	let each_value = /*links*/ ctx[4];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	let if_block0 = /*date*/ ctx[1] && create_if_block_1$5(ctx);
    	var switch_value = /*desc*/ ctx[5];

    	function switch_props(ctx) {
    		return { $$inline: true };
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props());
    	}

    	let if_block1 = /*icon*/ ctx[2] && create_if_block$5(ctx);

    	const block = {
    		c: function create() {
    			h20 = element("h2");
    			t0 = text(/*title*/ ctx[3]);
    			t1 = space();
    			div7 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			create_component(phone.$$.fragment);
    			t2 = space();
    			div6 = element("div");
    			div5 = element("div");
    			div2 = element("div");
    			t3 = space();
    			h21 = element("h2");
    			t4 = text(/*title*/ ctx[3]);
    			t5 = space();
    			div3 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t6 = space();
    			div4 = element("div");
    			p = element("p");
    			if (if_block0) if_block0.c();
    			t7 = space();
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			t8 = space();
    			if (if_block1) if_block1.c();
    			attr_dev(h20, "class", "dash title svelte-1ljl7on");
    			add_location(h20, file$8, 11, 0, 402);
    			set_style(div0, "margin-inline", "15%");
    			add_location(div0, file$8, 15, 8, 517);
    			attr_dev(div1, "class", "preview svelte-1ljl7on");
    			add_location(div1, file$8, 14, 4, 486);
    			add_location(div2, file$8, 22, 12, 735);
    			attr_dev(h21, "class", "titleAlt svelte-1ljl7on");
    			add_location(h21, file$8, 23, 12, 756);
    			attr_dev(div3, "class", "links content__text content__section svelte-1ljl7on");
    			add_location(div3, file$8, 25, 12, 805);
    			attr_dev(p, "class", "content__text ");
    			add_location(p, file$8, 34, 16, 1155);
    			attr_dev(div4, "class", "content__section");
    			add_location(div4, file$8, 33, 12, 1107);
    			set_style(div5, "margin-inline", "0%");
    			add_location(div5, file$8, 21, 8, 690);
    			attr_dev(div6, "class", "details svelte-1ljl7on");
    			add_location(div6, file$8, 20, 4, 659);
    			attr_dev(div7, "class", "showcase content__section svelte-1ljl7on");
    			add_location(div7, file$8, 13, 0, 441);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h20, anchor);
    			append_dev(h20, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div7, anchor);
    			append_dev(div7, div1);
    			append_dev(div1, div0);
    			mount_component(phone, div0, null);
    			append_dev(div7, t2);
    			append_dev(div7, div6);
    			append_dev(div6, div5);
    			append_dev(div5, div2);
    			append_dev(div5, t3);
    			append_dev(div5, h21);
    			append_dev(h21, t4);
    			append_dev(div5, t5);
    			append_dev(div5, div3);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div3, null);
    			}

    			append_dev(div5, t6);
    			append_dev(div5, div4);
    			append_dev(div4, p);
    			if (if_block0) if_block0.m(p, null);
    			append_dev(p, t7);

    			if (switch_instance) {
    				mount_component(switch_instance, p, null);
    			}

    			append_dev(div5, t8);
    			if (if_block1) if_block1.m(div5, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*title*/ 8) set_data_dev(t0, /*title*/ ctx[3]);
    			const phone_changes = {};
    			if (dirty & /*src*/ 1) phone_changes.src = /*src*/ ctx[0];
    			if (dirty & /*gif*/ 64) phone_changes.gif = /*gif*/ ctx[6];
    			if (dirty & /*hasDesktopPreview*/ 128) phone_changes.hasDesktopPreview = /*hasDesktopPreview*/ ctx[7];
    			if (dirty & /*hasMobilePreview*/ 256) phone_changes.hasMobilePreview = /*hasMobilePreview*/ ctx[8];
    			phone.$set(phone_changes);
    			if (!current || dirty & /*title*/ 8) set_data_dev(t4, /*title*/ ctx[3]);

    			if (dirty & /*links*/ 16) {
    				each_value = /*links*/ ctx[4];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div3, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (/*date*/ ctx[1]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_1$5(ctx);
    					if_block0.c();
    					if_block0.m(p, t7);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (switch_value !== (switch_value = /*desc*/ ctx[5])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, p, null);
    				} else {
    					switch_instance = null;
    				}
    			}

    			if (/*icon*/ ctx[2]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty & /*icon*/ 4) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block$5(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(div5, null);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(phone.$$.fragment, local);
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			transition_in(if_block1);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(phone.$$.fragment, local);
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			transition_out(if_block1);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h20);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div7);
    			destroy_component(phone);
    			destroy_each(each_blocks, detaching);
    			if (if_block0) if_block0.d();
    			if (switch_instance) destroy_component(switch_instance);
    			if (if_block1) if_block1.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('GameShowcasePhone', slots, []);
    	let { src = "" } = $$props;
    	let { date = "" } = $$props;
    	let { icon = "" } = $$props;
    	let { title, links, desc, gif } = $$props;
    	let { hasDesktopPreview, hasMobilePreview } = $$props;

    	const writable_props = [
    		'src',
    		'date',
    		'icon',
    		'title',
    		'links',
    		'desc',
    		'gif',
    		'hasDesktopPreview',
    		'hasMobilePreview'
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<GameShowcasePhone> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('src' in $$props) $$invalidate(0, src = $$props.src);
    		if ('date' in $$props) $$invalidate(1, date = $$props.date);
    		if ('icon' in $$props) $$invalidate(2, icon = $$props.icon);
    		if ('title' in $$props) $$invalidate(3, title = $$props.title);
    		if ('links' in $$props) $$invalidate(4, links = $$props.links);
    		if ('desc' in $$props) $$invalidate(5, desc = $$props.desc);
    		if ('gif' in $$props) $$invalidate(6, gif = $$props.gif);
    		if ('hasDesktopPreview' in $$props) $$invalidate(7, hasDesktopPreview = $$props.hasDesktopPreview);
    		if ('hasMobilePreview' in $$props) $$invalidate(8, hasMobilePreview = $$props.hasMobilePreview);
    	};

    	$$self.$capture_state = () => ({
    		Phone,
    		Lightbox,
    		src,
    		date,
    		icon,
    		title,
    		links,
    		desc,
    		gif,
    		hasDesktopPreview,
    		hasMobilePreview
    	});

    	$$self.$inject_state = $$props => {
    		if ('src' in $$props) $$invalidate(0, src = $$props.src);
    		if ('date' in $$props) $$invalidate(1, date = $$props.date);
    		if ('icon' in $$props) $$invalidate(2, icon = $$props.icon);
    		if ('title' in $$props) $$invalidate(3, title = $$props.title);
    		if ('links' in $$props) $$invalidate(4, links = $$props.links);
    		if ('desc' in $$props) $$invalidate(5, desc = $$props.desc);
    		if ('gif' in $$props) $$invalidate(6, gif = $$props.gif);
    		if ('hasDesktopPreview' in $$props) $$invalidate(7, hasDesktopPreview = $$props.hasDesktopPreview);
    		if ('hasMobilePreview' in $$props) $$invalidate(8, hasMobilePreview = $$props.hasMobilePreview);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [src, date, icon, title, links, desc, gif, hasDesktopPreview, hasMobilePreview];
    }

    class GameShowcasePhone extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {
    			src: 0,
    			date: 1,
    			icon: 2,
    			title: 3,
    			links: 4,
    			desc: 5,
    			gif: 6,
    			hasDesktopPreview: 7,
    			hasMobilePreview: 8
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "GameShowcasePhone",
    			options,
    			id: create_fragment$8.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*title*/ ctx[3] === undefined && !('title' in props)) {
    			console.warn("<GameShowcasePhone> was created without expected prop 'title'");
    		}

    		if (/*links*/ ctx[4] === undefined && !('links' in props)) {
    			console.warn("<GameShowcasePhone> was created without expected prop 'links'");
    		}

    		if (/*desc*/ ctx[5] === undefined && !('desc' in props)) {
    			console.warn("<GameShowcasePhone> was created without expected prop 'desc'");
    		}

    		if (/*gif*/ ctx[6] === undefined && !('gif' in props)) {
    			console.warn("<GameShowcasePhone> was created without expected prop 'gif'");
    		}

    		if (/*hasDesktopPreview*/ ctx[7] === undefined && !('hasDesktopPreview' in props)) {
    			console.warn("<GameShowcasePhone> was created without expected prop 'hasDesktopPreview'");
    		}

    		if (/*hasMobilePreview*/ ctx[8] === undefined && !('hasMobilePreview' in props)) {
    			console.warn("<GameShowcasePhone> was created without expected prop 'hasMobilePreview'");
    		}
    	}

    	get src() {
    		throw new Error("<GameShowcasePhone>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set src(value) {
    		throw new Error("<GameShowcasePhone>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get date() {
    		throw new Error("<GameShowcasePhone>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set date(value) {
    		throw new Error("<GameShowcasePhone>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get icon() {
    		throw new Error("<GameShowcasePhone>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set icon(value) {
    		throw new Error("<GameShowcasePhone>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<GameShowcasePhone>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<GameShowcasePhone>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get links() {
    		throw new Error("<GameShowcasePhone>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set links(value) {
    		throw new Error("<GameShowcasePhone>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get desc() {
    		throw new Error("<GameShowcasePhone>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set desc(value) {
    		throw new Error("<GameShowcasePhone>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get gif() {
    		throw new Error("<GameShowcasePhone>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set gif(value) {
    		throw new Error("<GameShowcasePhone>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get hasDesktopPreview() {
    		throw new Error("<GameShowcasePhone>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set hasDesktopPreview(value) {
    		throw new Error("<GameShowcasePhone>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get hasMobilePreview() {
    		throw new Error("<GameShowcasePhone>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set hasMobilePreview(value) {
    		throw new Error("<GameShowcasePhone>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\game\GameShowcase.svelte generated by Svelte v3.47.0 */
    const file$7 = "src\\components\\game\\GameShowcase.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[13] = list[i];
    	return child_ctx;
    }

    function get_each_context_1$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[16] = list[i];
    	return child_ctx;
    }

    // (37:36) 
    function create_if_block_2$4(ctx) {
    	let showcaselaptop;
    	let current;

    	showcaselaptop = new GameShowcaseLaptop({
    			props: {
    				src: /*src*/ ctx[4],
    				title: /*title*/ ctx[0],
    				links: /*links*/ ctx[10],
    				desc: /*desc*/ ctx[1],
    				date: /*date*/ ctx[6],
    				gif: /*gif*/ ctx[5],
    				hasDesktopPreview: /*hasDesktopPreview*/ ctx[7],
    				hasMobilePreview: /*hasMobilePreview*/ ctx[8]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(showcaselaptop.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(showcaselaptop, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const showcaselaptop_changes = {};
    			if (dirty & /*src*/ 16) showcaselaptop_changes.src = /*src*/ ctx[4];
    			if (dirty & /*title*/ 1) showcaselaptop_changes.title = /*title*/ ctx[0];
    			if (dirty & /*links*/ 1024) showcaselaptop_changes.links = /*links*/ ctx[10];
    			if (dirty & /*desc*/ 2) showcaselaptop_changes.desc = /*desc*/ ctx[1];
    			if (dirty & /*date*/ 64) showcaselaptop_changes.date = /*date*/ ctx[6];
    			if (dirty & /*gif*/ 32) showcaselaptop_changes.gif = /*gif*/ ctx[5];
    			if (dirty & /*hasDesktopPreview*/ 128) showcaselaptop_changes.hasDesktopPreview = /*hasDesktopPreview*/ ctx[7];
    			if (dirty & /*hasMobilePreview*/ 256) showcaselaptop_changes.hasMobilePreview = /*hasMobilePreview*/ ctx[8];
    			showcaselaptop.$set(showcaselaptop_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(showcaselaptop.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(showcaselaptop.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(showcaselaptop, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$4.name,
    		type: "if",
    		source: "(37:36) ",
    		ctx
    	});

    	return block;
    }

    // (25:4) {#if platform === "phone"}
    function create_if_block_1$4(ctx) {
    	let showcasephone;
    	let current;

    	showcasephone = new GameShowcasePhone({
    			props: {
    				src: /*src*/ ctx[4],
    				title: /*title*/ ctx[0],
    				links: /*links*/ ctx[10],
    				desc: /*desc*/ ctx[1],
    				date: /*date*/ ctx[6],
    				gif: /*gif*/ ctx[5],
    				icon: /*icon*/ ctx[9],
    				hasDesktopPreview: /*hasDesktopPreview*/ ctx[7],
    				hasMobilePreview: /*hasMobilePreview*/ ctx[8]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(showcasephone.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(showcasephone, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const showcasephone_changes = {};
    			if (dirty & /*src*/ 16) showcasephone_changes.src = /*src*/ ctx[4];
    			if (dirty & /*title*/ 1) showcasephone_changes.title = /*title*/ ctx[0];
    			if (dirty & /*links*/ 1024) showcasephone_changes.links = /*links*/ ctx[10];
    			if (dirty & /*desc*/ 2) showcasephone_changes.desc = /*desc*/ ctx[1];
    			if (dirty & /*date*/ 64) showcasephone_changes.date = /*date*/ ctx[6];
    			if (dirty & /*gif*/ 32) showcasephone_changes.gif = /*gif*/ ctx[5];
    			if (dirty & /*icon*/ 512) showcasephone_changes.icon = /*icon*/ ctx[9];
    			if (dirty & /*hasDesktopPreview*/ 128) showcasephone_changes.hasDesktopPreview = /*hasDesktopPreview*/ ctx[7];
    			if (dirty & /*hasMobilePreview*/ 256) showcasephone_changes.hasMobilePreview = /*hasMobilePreview*/ ctx[8];
    			showcasephone.$set(showcasephone_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(showcasephone.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(showcasephone.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(showcasephone, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$4.name,
    		type: "if",
    		source: "(25:4) {#if platform === \\\"phone\\\"}",
    		ctx
    	});

    	return block;
    }

    // (52:8) {#each videos as video}
    function create_each_block_1$1(ctx) {
    	let div;
    	let iframe;
    	let iframe_src_value;

    	const block = {
    		c: function create() {
    			div = element("div");
    			iframe = element("iframe");
    			attr_dev(iframe, "class", "video svelte-jry27k");
    			if (!src_url_equal(iframe.src, iframe_src_value = /*video*/ ctx[16].src)) attr_dev(iframe, "src", iframe_src_value);
    			attr_dev(iframe, "title", "YouTube video player");
    			attr_dev(iframe, "frameborder", "0");
    			attr_dev(iframe, "allow", "autoplay; clipboard-write; encrypted-media;picture-in-picture");
    			iframe.allowFullscreen = true;
    			add_location(iframe, file$7, 53, 16, 1578);
    			attr_dev(div, "class", "image svelte-jry27k");
    			add_location(div, file$7, 52, 12, 1541);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, iframe);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*videos*/ 2048 && !src_url_equal(iframe.src, iframe_src_value = /*video*/ ctx[16].src)) {
    				attr_dev(iframe, "src", iframe_src_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$1.name,
    		type: "each",
    		source: "(52:8) {#each videos as video}",
    		ctx
    	});

    	return block;
    }

    // (66:16) <Lightbox transitionDuration="150">
    function create_default_slot$3(ctx) {
    	let img;
    	let img_src_value;
    	let img_alt_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			if (!src_url_equal(img.src, img_src_value = /*image*/ ctx[13].src)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", img_alt_value = /*image*/ ctx[13].alt);
    			attr_dev(img, "class", "svelte-jry27k");
    			add_location(img, file$7, 66, 20, 2070);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*images*/ 8 && !src_url_equal(img.src, img_src_value = /*image*/ ctx[13].src)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*images*/ 8 && img_alt_value !== (img_alt_value = /*image*/ ctx[13].alt)) {
    				attr_dev(img, "alt", img_alt_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$3.name,
    		type: "slot",
    		source: "(66:16) <Lightbox transitionDuration=\\\"150\\\">",
    		ctx
    	});

    	return block;
    }

    // (64:8) {#each images as image}
    function create_each_block$1(ctx) {
    	let div;
    	let lightbox;
    	let t;
    	let current;

    	lightbox = new Lightbox({
    			props: {
    				transitionDuration: "150",
    				$$slots: { default: [create_default_slot$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(lightbox.$$.fragment);
    			t = space();
    			attr_dev(div, "class", "image svelte-jry27k");
    			add_location(div, file$7, 64, 12, 1976);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(lightbox, div, null);
    			append_dev(div, t);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const lightbox_changes = {};

    			if (dirty & /*$$scope, images*/ 524296) {
    				lightbox_changes.$$scope = { dirty, ctx };
    			}

    			lightbox.$set(lightbox_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(lightbox.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(lightbox.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(lightbox);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(64:8) {#each images as image}",
    		ctx
    	});

    	return block;
    }

    // (74:4) {#if !fullPage}
    function create_if_block$4(ctx) {
    	let a;
    	let button;
    	let a_href_value;

    	const block = {
    		c: function create() {
    			a = element("a");
    			button = element("button");
    			button.textContent = "Open as page";
    			attr_dev(button, "class", "button");
    			add_location(button, file$7, 78, 12, 2376);
    			attr_dev(a, "href", a_href_value = `/games/${/*title*/ ctx[0].split(" ").join("").toLowerCase()}`);
    			attr_dev(a, "target", "new");
    			add_location(a, file$7, 74, 8, 2251);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, button);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 1 && a_href_value !== (a_href_value = `/games/${/*title*/ ctx[0].split(" ").join("").toLowerCase()}`)) {
    				attr_dev(a, "href", a_href_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(74:4) {#if !fullPage}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let div1;
    	let current_block_type_index;
    	let if_block0;
    	let t0;
    	let div0;
    	let t1;
    	let t2;
    	let current;
    	const if_block_creators = [create_if_block_1$4, create_if_block_2$4];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*platform*/ ctx[2] === "phone") return 0;
    		if (/*platform*/ ctx[2] === "laptop") return 1;
    		return -1;
    	}

    	if (~(current_block_type_index = select_block_type(ctx))) {
    		if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	}

    	let each_value_1 = /*videos*/ ctx[11];
    	validate_each_argument(each_value_1);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks_1[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
    	}

    	let each_value = /*images*/ ctx[3];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	let if_block1 = !/*fullPage*/ ctx[12] && create_if_block$4(ctx);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			div0 = element("div");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t1 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t2 = space();
    			if (if_block1) if_block1.c();
    			attr_dev(div0, "class", "content__section content__padding images svelte-jry27k");
    			add_location(div0, file$7, 50, 4, 1440);
    			attr_dev(div1, "class", "content");
    			add_location(div1, file$7, 22, 0, 819);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].m(div1, null);
    			}

    			append_dev(div1, t0);
    			append_dev(div1, div0);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(div0, null);
    			}

    			append_dev(div0, t1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}

    			append_dev(div1, t2);
    			if (if_block1) if_block1.m(div1, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if (~current_block_type_index) {
    					if_blocks[current_block_type_index].p(ctx, dirty);
    				}
    			} else {
    				if (if_block0) {
    					group_outros();

    					transition_out(if_blocks[previous_block_index], 1, 1, () => {
    						if_blocks[previous_block_index] = null;
    					});

    					check_outros();
    				}

    				if (~current_block_type_index) {
    					if_block0 = if_blocks[current_block_type_index];

    					if (!if_block0) {
    						if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    						if_block0.c();
    					} else {
    						if_block0.p(ctx, dirty);
    					}

    					transition_in(if_block0, 1);
    					if_block0.m(div1, t0);
    				} else {
    					if_block0 = null;
    				}
    			}

    			if (dirty & /*videos*/ 2048) {
    				each_value_1 = /*videos*/ ctx[11];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$1(ctx, each_value_1, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_1[i] = create_each_block_1$1(child_ctx);
    						each_blocks_1[i].c();
    						each_blocks_1[i].m(div0, t1);
    					}
    				}

    				for (; i < each_blocks_1.length; i += 1) {
    					each_blocks_1[i].d(1);
    				}

    				each_blocks_1.length = each_value_1.length;
    			}

    			if (dirty & /*images*/ 8) {
    				each_value = /*images*/ ctx[3];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div0, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			if (!/*fullPage*/ ctx[12]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block$4(ctx);
    					if_block1.c();
    					if_block1.m(div1, null);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].d();
    			}

    			destroy_each(each_blocks_1, detaching);
    			destroy_each(each_blocks, detaching);
    			if (if_block1) if_block1.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('GameShowcase', slots, []);
    	let { title, desc, platform, images, src, gif, date } = $$props;
    	let { hasDesktopPreview, hasMobilePreview } = $$props;
    	let { icon = '' } = $$props;
    	let { links = [] } = $$props;
    	let { videos = [] } = $$props;
    	let { fullPage = false } = $$props;

    	const writable_props = [
    		'title',
    		'desc',
    		'platform',
    		'images',
    		'src',
    		'gif',
    		'date',
    		'hasDesktopPreview',
    		'hasMobilePreview',
    		'icon',
    		'links',
    		'videos',
    		'fullPage'
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<GameShowcase> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('desc' in $$props) $$invalidate(1, desc = $$props.desc);
    		if ('platform' in $$props) $$invalidate(2, platform = $$props.platform);
    		if ('images' in $$props) $$invalidate(3, images = $$props.images);
    		if ('src' in $$props) $$invalidate(4, src = $$props.src);
    		if ('gif' in $$props) $$invalidate(5, gif = $$props.gif);
    		if ('date' in $$props) $$invalidate(6, date = $$props.date);
    		if ('hasDesktopPreview' in $$props) $$invalidate(7, hasDesktopPreview = $$props.hasDesktopPreview);
    		if ('hasMobilePreview' in $$props) $$invalidate(8, hasMobilePreview = $$props.hasMobilePreview);
    		if ('icon' in $$props) $$invalidate(9, icon = $$props.icon);
    		if ('links' in $$props) $$invalidate(10, links = $$props.links);
    		if ('videos' in $$props) $$invalidate(11, videos = $$props.videos);
    		if ('fullPage' in $$props) $$invalidate(12, fullPage = $$props.fullPage);
    	};

    	$$self.$capture_state = () => ({
    		Lightbox,
    		ShowcaseLaptop: GameShowcaseLaptop,
    		ShowcasePhone: GameShowcasePhone,
    		title,
    		desc,
    		platform,
    		images,
    		src,
    		gif,
    		date,
    		hasDesktopPreview,
    		hasMobilePreview,
    		icon,
    		links,
    		videos,
    		fullPage
    	});

    	$$self.$inject_state = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('desc' in $$props) $$invalidate(1, desc = $$props.desc);
    		if ('platform' in $$props) $$invalidate(2, platform = $$props.platform);
    		if ('images' in $$props) $$invalidate(3, images = $$props.images);
    		if ('src' in $$props) $$invalidate(4, src = $$props.src);
    		if ('gif' in $$props) $$invalidate(5, gif = $$props.gif);
    		if ('date' in $$props) $$invalidate(6, date = $$props.date);
    		if ('hasDesktopPreview' in $$props) $$invalidate(7, hasDesktopPreview = $$props.hasDesktopPreview);
    		if ('hasMobilePreview' in $$props) $$invalidate(8, hasMobilePreview = $$props.hasMobilePreview);
    		if ('icon' in $$props) $$invalidate(9, icon = $$props.icon);
    		if ('links' in $$props) $$invalidate(10, links = $$props.links);
    		if ('videos' in $$props) $$invalidate(11, videos = $$props.videos);
    		if ('fullPage' in $$props) $$invalidate(12, fullPage = $$props.fullPage);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		title,
    		desc,
    		platform,
    		images,
    		src,
    		gif,
    		date,
    		hasDesktopPreview,
    		hasMobilePreview,
    		icon,
    		links,
    		videos,
    		fullPage
    	];
    }

    class GameShowcase extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {
    			title: 0,
    			desc: 1,
    			platform: 2,
    			images: 3,
    			src: 4,
    			gif: 5,
    			date: 6,
    			hasDesktopPreview: 7,
    			hasMobilePreview: 8,
    			icon: 9,
    			links: 10,
    			videos: 11,
    			fullPage: 12
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "GameShowcase",
    			options,
    			id: create_fragment$7.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*title*/ ctx[0] === undefined && !('title' in props)) {
    			console.warn("<GameShowcase> was created without expected prop 'title'");
    		}

    		if (/*desc*/ ctx[1] === undefined && !('desc' in props)) {
    			console.warn("<GameShowcase> was created without expected prop 'desc'");
    		}

    		if (/*platform*/ ctx[2] === undefined && !('platform' in props)) {
    			console.warn("<GameShowcase> was created without expected prop 'platform'");
    		}

    		if (/*images*/ ctx[3] === undefined && !('images' in props)) {
    			console.warn("<GameShowcase> was created without expected prop 'images'");
    		}

    		if (/*src*/ ctx[4] === undefined && !('src' in props)) {
    			console.warn("<GameShowcase> was created without expected prop 'src'");
    		}

    		if (/*gif*/ ctx[5] === undefined && !('gif' in props)) {
    			console.warn("<GameShowcase> was created without expected prop 'gif'");
    		}

    		if (/*date*/ ctx[6] === undefined && !('date' in props)) {
    			console.warn("<GameShowcase> was created without expected prop 'date'");
    		}

    		if (/*hasDesktopPreview*/ ctx[7] === undefined && !('hasDesktopPreview' in props)) {
    			console.warn("<GameShowcase> was created without expected prop 'hasDesktopPreview'");
    		}

    		if (/*hasMobilePreview*/ ctx[8] === undefined && !('hasMobilePreview' in props)) {
    			console.warn("<GameShowcase> was created without expected prop 'hasMobilePreview'");
    		}
    	}

    	get title() {
    		throw new Error("<GameShowcase>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<GameShowcase>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get desc() {
    		throw new Error("<GameShowcase>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set desc(value) {
    		throw new Error("<GameShowcase>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get platform() {
    		throw new Error("<GameShowcase>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set platform(value) {
    		throw new Error("<GameShowcase>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get images() {
    		throw new Error("<GameShowcase>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set images(value) {
    		throw new Error("<GameShowcase>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get src() {
    		throw new Error("<GameShowcase>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set src(value) {
    		throw new Error("<GameShowcase>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get gif() {
    		throw new Error("<GameShowcase>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set gif(value) {
    		throw new Error("<GameShowcase>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get date() {
    		throw new Error("<GameShowcase>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set date(value) {
    		throw new Error("<GameShowcase>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get hasDesktopPreview() {
    		throw new Error("<GameShowcase>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set hasDesktopPreview(value) {
    		throw new Error("<GameShowcase>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get hasMobilePreview() {
    		throw new Error("<GameShowcase>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set hasMobilePreview(value) {
    		throw new Error("<GameShowcase>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get icon() {
    		throw new Error("<GameShowcase>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set icon(value) {
    		throw new Error("<GameShowcase>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get links() {
    		throw new Error("<GameShowcase>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set links(value) {
    		throw new Error("<GameShowcase>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get videos() {
    		throw new Error("<GameShowcase>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set videos(value) {
    		throw new Error("<GameShowcase>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get fullPage() {
    		throw new Error("<GameShowcase>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set fullPage(value) {
    		throw new Error("<GameShowcase>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\game\GamePopup.svelte generated by Svelte v3.47.0 */
    const file$6 = "src\\components\\game\\GamePopup.svelte";

    function create_fragment$6(ctx) {
    	let div;
    	let gameshowcase;
    	let current;
    	const gameshowcase_spread_levels = [/*gameProps*/ ctx[0]];
    	let gameshowcase_props = {};

    	for (let i = 0; i < gameshowcase_spread_levels.length; i += 1) {
    		gameshowcase_props = assign(gameshowcase_props, gameshowcase_spread_levels[i]);
    	}

    	gameshowcase = new GameShowcase({
    			props: gameshowcase_props,
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(gameshowcase.$$.fragment);
    			attr_dev(div, "class", "popup svelte-rmngnf");
    			add_location(div, file$6, 12, 0, 266);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(gameshowcase, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const gameshowcase_changes = (dirty & /*gameProps*/ 1)
    			? get_spread_update(gameshowcase_spread_levels, [get_spread_object(/*gameProps*/ ctx[0])])
    			: {};

    			gameshowcase.$set(gameshowcase_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(gameshowcase.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(gameshowcase.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(gameshowcase);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('GamePopup', slots, []);
    	let { title } = $$props;
    	let gameProps = {};

    	gameProps = games.find(gameObj => {
    		return gameObj.title === title;
    	});

    	const writable_props = ['title'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<GamePopup> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('title' in $$props) $$invalidate(1, title = $$props.title);
    	};

    	$$self.$capture_state = () => ({ GameShowcase, games, title, gameProps });

    	$$self.$inject_state = $$props => {
    		if ('title' in $$props) $$invalidate(1, title = $$props.title);
    		if ('gameProps' in $$props) $$invalidate(0, gameProps = $$props.gameProps);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [gameProps, title];
    }

    class GamePopup extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, { title: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "GamePopup",
    			options,
    			id: create_fragment$6.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*title*/ ctx[1] === undefined && !('title' in props)) {
    			console.warn("<GamePopup> was created without expected prop 'title'");
    		}
    	}

    	get title() {
    		throw new Error("<GamePopup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<GamePopup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\game\GameCard.svelte generated by Svelte v3.47.0 */
    const file$5 = "src\\components\\game\\GameCard.svelte";

    // (27:8) {#if matches}
    function create_if_block_3$1(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			attr_dev(img, "class", "gif full svelte-ebkndx");
    			if (!src_url_equal(img.src, img_src_value = /*gif*/ ctx[3])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", /*title*/ ctx[0]);
    			add_location(img, file$5, 27, 12, 876);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*gif*/ 8 && !src_url_equal(img.src, img_src_value = /*gif*/ ctx[3])) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*title*/ 1) {
    				attr_dev(img, "alt", /*title*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3$1.name,
    		type: "if",
    		source: "(27:8) {#if matches}",
    		ctx
    	});

    	return block;
    }

    // (26:4) <MediaQuery query="(min-width: 1200px)" let:matches>
    function create_default_slot$2(ctx) {
    	let if_block_anchor;
    	let if_block = /*matches*/ ctx[10] && create_if_block_3$1(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (/*matches*/ ctx[10]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_3$1(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(26:4) <MediaQuery query=\\\"(min-width: 1200px)\\\" let:matches>",
    		ctx
    	});

    	return block;
    }

    // (35:12) {#if freelance}
    function create_if_block_2$3(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			attr_dev(img, "class", "icon iconFreelance svelte-ebkndx");
    			if (!src_url_equal(img.src, img_src_value = "/assets/icons/freelance.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "freelance icon");
    			add_location(img, file$5, 35, 16, 1156);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$3.name,
    		type: "if",
    		source: "(35:12) {#if freelance}",
    		ctx
    	});

    	return block;
    }

    // (44:12) {#if mobile}
    function create_if_block_1$3(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			attr_dev(img, "class", "icon iconMobile svelte-ebkndx");
    			if (!src_url_equal(img.src, img_src_value = "/assets/icons/phone.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "mobile icon");
    			add_location(img, file$5, 44, 16, 1449);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$3.name,
    		type: "if",
    		source: "(44:12) {#if mobile}",
    		ctx
    	});

    	return block;
    }

    // (51:12) {#if desktop}
    function create_if_block$3(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			attr_dev(img, "class", "icon iconDesktop svelte-ebkndx");
    			if (!src_url_equal(img.src, img_src_value = "/assets/icons/desktop.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "desktop icon");
    			add_location(img, file$5, 51, 16, 1672);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(51:12) {#if desktop}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let div4;
    	let img;
    	let img_src_value;
    	let t0;
    	let mediaquery;
    	let t1;
    	let div0;
    	let t2;
    	let div3;
    	let div1;
    	let t3;
    	let div2;
    	let t4;
    	let div4_class_value;
    	let current;
    	let mounted;
    	let dispose;

    	mediaquery = new MediaQuery$1({
    			props: {
    				query: "(min-width: 1200px)",
    				$$slots: {
    					default: [
    						create_default_slot$2,
    						({ matches }) => ({ 10: matches }),
    						({ matches }) => matches ? 1024 : 0
    					]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	let if_block0 = /*freelance*/ ctx[4] && create_if_block_2$3(ctx);
    	let if_block1 = /*mobile*/ ctx[5] && create_if_block_1$3(ctx);
    	let if_block2 = /*desktop*/ ctx[6] && create_if_block$3(ctx);

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			img = element("img");
    			t0 = space();
    			create_component(mediaquery.$$.fragment);
    			t1 = space();
    			div0 = element("div");
    			t2 = space();
    			div3 = element("div");
    			div1 = element("div");
    			if (if_block0) if_block0.c();
    			t3 = space();
    			div2 = element("div");
    			if (if_block1) if_block1.c();
    			t4 = space();
    			if (if_block2) if_block2.c();
    			attr_dev(img, "class", "card full svelte-ebkndx");
    			if (!src_url_equal(img.src, img_src_value = /*src*/ ctx[1])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", /*title*/ ctx[0]);
    			add_location(img, file$5, 23, 4, 677);
    			attr_dev(div0, "class", "cover full svelte-ebkndx");
    			add_location(div0, file$5, 30, 4, 962);
    			attr_dev(div1, "class", "iconsLeft iconsGroup svelte-ebkndx");
    			add_location(div1, file$5, 33, 8, 1075);
    			attr_dev(div2, "class", "iconsRight iconsGroup svelte-ebkndx");
    			add_location(div2, file$5, 42, 8, 1370);
    			attr_dev(div3, "class", "icons svelte-ebkndx");
    			add_location(div3, file$5, 32, 4, 1046);
    			attr_dev(div4, "class", div4_class_value = "game " + /*size*/ ctx[2] + " hvr-pulse-grow" + " svelte-ebkndx");
    			add_location(div4, file$5, 22, 0, 610);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, img);
    			append_dev(div4, t0);
    			mount_component(mediaquery, div4, null);
    			append_dev(div4, t1);
    			append_dev(div4, div0);
    			append_dev(div4, t2);
    			append_dev(div4, div3);
    			append_dev(div3, div1);
    			if (if_block0) if_block0.m(div1, null);
    			append_dev(div3, t3);
    			append_dev(div3, div2);
    			if (if_block1) if_block1.m(div2, null);
    			append_dev(div2, t4);
    			if (if_block2) if_block2.m(div2, null);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(div4, "click", /*openPopup*/ ctx[7], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*src*/ 2 && !src_url_equal(img.src, img_src_value = /*src*/ ctx[1])) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (!current || dirty & /*title*/ 1) {
    				attr_dev(img, "alt", /*title*/ ctx[0]);
    			}

    			const mediaquery_changes = {};

    			if (dirty & /*$$scope, gif, title, matches*/ 3081) {
    				mediaquery_changes.$$scope = { dirty, ctx };
    			}

    			mediaquery.$set(mediaquery_changes);

    			if (!current || dirty & /*size*/ 4 && div4_class_value !== (div4_class_value = "game " + /*size*/ ctx[2] + " hvr-pulse-grow" + " svelte-ebkndx")) {
    				attr_dev(div4, "class", div4_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(mediaquery.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(mediaquery.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
    			destroy_component(mediaquery);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			if (if_block2) if_block2.d();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('GameCard', slots, []);
    	let { title } = $$props;
    	let { src = "/assets/games/cards/rrmenu.png" } = $$props;
    	let { size = "normal" } = $$props;
    	let { gif = "" } = $$props;
    	let { tags = [] } = $$props;
    	let freelance = tags.includes("freelance");
    	let mobile = tags.includes("mobile");
    	let desktop = tags.includes("web");
    	const { open } = getContext("simple-modal");
    	const openPopup = () => open(GamePopup, { title });
    	const writable_props = ['title', 'src', 'size', 'gif', 'tags'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<GameCard> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('src' in $$props) $$invalidate(1, src = $$props.src);
    		if ('size' in $$props) $$invalidate(2, size = $$props.size);
    		if ('gif' in $$props) $$invalidate(3, gif = $$props.gif);
    		if ('tags' in $$props) $$invalidate(8, tags = $$props.tags);
    	};

    	$$self.$capture_state = () => ({
    		MediaQuery: MediaQuery$1,
    		title,
    		src,
    		size,
    		gif,
    		tags,
    		freelance,
    		mobile,
    		desktop,
    		getContext,
    		Popup: GamePopup,
    		open,
    		openPopup
    	});

    	$$self.$inject_state = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('src' in $$props) $$invalidate(1, src = $$props.src);
    		if ('size' in $$props) $$invalidate(2, size = $$props.size);
    		if ('gif' in $$props) $$invalidate(3, gif = $$props.gif);
    		if ('tags' in $$props) $$invalidate(8, tags = $$props.tags);
    		if ('freelance' in $$props) $$invalidate(4, freelance = $$props.freelance);
    		if ('mobile' in $$props) $$invalidate(5, mobile = $$props.mobile);
    		if ('desktop' in $$props) $$invalidate(6, desktop = $$props.desktop);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [title, src, size, gif, freelance, mobile, desktop, openPopup, tags];
    }

    class GameCard extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {
    			title: 0,
    			src: 1,
    			size: 2,
    			gif: 3,
    			tags: 8
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "GameCard",
    			options,
    			id: create_fragment$5.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*title*/ ctx[0] === undefined && !('title' in props)) {
    			console.warn("<GameCard> was created without expected prop 'title'");
    		}
    	}

    	get title() {
    		throw new Error("<GameCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<GameCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get src() {
    		throw new Error("<GameCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set src(value) {
    		throw new Error("<GameCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<GameCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<GameCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get gif() {
    		throw new Error("<GameCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set gif(value) {
    		throw new Error("<GameCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get tags() {
    		throw new Error("<GameCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tags(value) {
    		throw new Error("<GameCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\icons\MenuIcon.svelte generated by Svelte v3.47.0 */

    const file$4 = "src\\components\\icons\\MenuIcon.svelte";

    function create_fragment$4(ctx) {
    	let svg;
    	let title_1;
    	let t;
    	let path;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[2]);
    			path = svg_element("path");
    			add_location(title_1, file$4, 13, 4, 259);
    			attr_dev(path, "d", "M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z");
    			add_location(path, file$4, 14, 4, 287);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "width", /*size*/ ctx[1]);
    			attr_dev(svg, "height", /*size*/ ctx[1]);
    			attr_dev(svg, "fill", /*color*/ ctx[0]);
    			attr_dev(svg, "viewBox", "0 0 50 50");
    			add_location(svg, file$4, 6, 0, 126);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, title_1);
    			append_dev(title_1, t);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*title*/ 4) set_data_dev(t, /*title*/ ctx[2]);

    			if (dirty & /*size*/ 2) {
    				attr_dev(svg, "width", /*size*/ ctx[1]);
    			}

    			if (dirty & /*size*/ 2) {
    				attr_dev(svg, "height", /*size*/ ctx[1]);
    			}

    			if (dirty & /*color*/ 1) {
    				attr_dev(svg, "fill", /*color*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('MenuIcon', slots, []);
    	let { color = "currentColor" } = $$props;
    	let { size = 24 } = $$props;
    	let { title = "linkedin" } = $$props;
    	const writable_props = ['color', 'size', 'title'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<MenuIcon> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    	};

    	$$self.$capture_state = () => ({ color, size, title });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color, size, title];
    }

    class MenuIcon extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { color: 0, size: 1, title: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "MenuIcon",
    			options,
    			id: create_fragment$4.name
    		});
    	}

    	get color() {
    		throw new Error("<MenuIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<MenuIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<MenuIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<MenuIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<MenuIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<MenuIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\game\GameGrid.svelte generated by Svelte v3.47.0 */
    const file$3 = "src\\components\\game\\GameGrid.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[7] = list[i];
    	return child_ctx;
    }

    // (40:20) {#if filter !== tag}
    function create_if_block_2$2(ctx) {
    	let div;
    	let h3;
    	let t0_value = /*filter*/ ctx[7][0].toUpperCase() + /*filter*/ ctx[7].substring(1) + "";
    	let t0;
    	let t1;
    	let p;
    	let t2;
    	let t3_value = /*getTagCount*/ ctx[2](/*filter*/ ctx[7]) + "";
    	let t3;
    	let t4;
    	let t5;
    	let mounted;
    	let dispose;

    	function click_handler(...args) {
    		return /*click_handler*/ ctx[3](/*filter*/ ctx[7], ...args);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			h3 = element("h3");
    			t0 = text(t0_value);
    			t1 = space();
    			p = element("p");
    			t2 = text("(");
    			t3 = text(t3_value);
    			t4 = text(")");
    			t5 = space();
    			attr_dev(h3, "class", "svelte-178iub8");
    			add_location(h3, file$3, 44, 28, 1334);
    			attr_dev(p, "class", "svelte-178iub8");
    			add_location(p, file$3, 47, 28, 1484);
    			attr_dev(div, "class", "filter__item svelte-178iub8");
    			add_location(div, file$3, 40, 24, 1158);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h3);
    			append_dev(h3, t0);
    			append_dev(div, t1);
    			append_dev(div, p);
    			append_dev(p, t2);
    			append_dev(p, t3);
    			append_dev(p, t4);
    			append_dev(div, t5);

    			if (!mounted) {
    				dispose = listen_dev(div, "click", click_handler, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$2.name,
    		type: "if",
    		source: "(40:20) {#if filter !== tag}",
    		ctx
    	});

    	return block;
    }

    // (39:16) {#each gameTags as filter}
    function create_each_block_1(ctx) {
    	let if_block_anchor;
    	let if_block = /*filter*/ ctx[7] !== /*tag*/ ctx[0] && create_if_block_2$2(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (/*filter*/ ctx[7] !== /*tag*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_2$2(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(39:16) {#each gameTags as filter}",
    		ctx
    	});

    	return block;
    }

    // (69:36) 
    function create_if_block_1$2(ctx) {
    	let gamecard;
    	let current;

    	gamecard = new GameCard({
    			props: {
    				title: /*game*/ ctx[4].title,
    				src: /*game*/ ctx[4].cover,
    				gif: /*game*/ ctx[4].gif,
    				size: /*game*/ ctx[4].size,
    				tags: /*game*/ ctx[4].tags
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(gamecard.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(gamecard, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(gamecard.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(gamecard.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(gamecard, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(69:36) ",
    		ctx
    	});

    	return block;
    }

    // (61:12) {#if game.tags.includes(tag)}
    function create_if_block$2(ctx) {
    	let gamecard;
    	let current;

    	gamecard = new GameCard({
    			props: {
    				title: /*game*/ ctx[4].title,
    				src: /*game*/ ctx[4].cover,
    				gif: /*game*/ ctx[4].gif,
    				size: /*game*/ ctx[4].size,
    				tags: /*game*/ ctx[4].tags
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(gamecard.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(gamecard, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(gamecard.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(gamecard.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(gamecard, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(61:12) {#if game.tags.includes(tag)}",
    		ctx
    	});

    	return block;
    }

    // (60:8) {#each games as game}
    function create_each_block(ctx) {
    	let show_if;
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$2, create_if_block_1$2];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (dirty & /*tag*/ 1) show_if = null;
    		if (show_if == null) show_if = !!/*game*/ ctx[4].tags.includes(/*tag*/ ctx[0]);
    		if (show_if) return 0;
    		if (/*tag*/ ctx[0] === "all") return 1;
    		return -1;
    	}

    	if (~(current_block_type_index = select_block_type(ctx, -1))) {
    		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	}

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].m(target, anchor);
    			}

    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx, dirty);

    			if (current_block_type_index === previous_block_index) {
    				if (~current_block_type_index) {
    					if_blocks[current_block_type_index].p(ctx, dirty);
    				}
    			} else {
    				if (if_block) {
    					group_outros();

    					transition_out(if_blocks[previous_block_index], 1, 1, () => {
    						if_blocks[previous_block_index] = null;
    					});

    					check_outros();
    				}

    				if (~current_block_type_index) {
    					if_block = if_blocks[current_block_type_index];

    					if (!if_block) {
    						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    						if_block.c();
    					} else {
    						if_block.p(ctx, dirty);
    					}

    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				} else {
    					if_block = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].d(detaching);
    			}

    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(60:8) {#each games as game}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let div4;
    	let div2;
    	let div1;
    	let h3;
    	let t0_value = /*tag*/ ctx[0][0].toUpperCase() + /*tag*/ ctx[0].substring(1) + "";
    	let t0;
    	let t1;
    	let menuicon;
    	let t2;
    	let div0;
    	let t3;
    	let div3;
    	let current;
    	menuicon = new MenuIcon({ props: { size: 36 }, $$inline: true });
    	let each_value_1 = gameTags;
    	validate_each_argument(each_value_1);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	let each_value = games;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			div2 = element("div");
    			div1 = element("div");
    			h3 = element("h3");
    			t0 = text(t0_value);
    			t1 = space();
    			create_component(menuicon.$$.fragment);
    			t2 = space();
    			div0 = element("div");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t3 = space();
    			div3 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(h3, "class", "filter__header svelte-178iub8");
    			add_location(h3, file$3, 33, 12, 857);
    			attr_dev(div0, "class", "filter__dropdown svelte-178iub8");
    			add_location(div0, file$3, 37, 12, 1016);
    			attr_dev(div1, "class", "filter__content svelte-178iub8");
    			add_location(div1, file$3, 32, 8, 814);
    			attr_dev(div2, "class", "filter svelte-178iub8");
    			add_location(div2, file$3, 31, 4, 784);
    			attr_dev(div3, "class", "games content__padding svelte-178iub8");
    			add_location(div3, file$3, 58, 4, 1743);
    			add_location(div4, file$3, 29, 0, 752);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div2);
    			append_dev(div2, div1);
    			append_dev(div1, h3);
    			append_dev(h3, t0);
    			append_dev(h3, t1);
    			mount_component(menuicon, h3, null);
    			append_dev(div1, t2);
    			append_dev(div1, div0);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(div0, null);
    			}

    			append_dev(div4, t3);
    			append_dev(div4, div3);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div3, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if ((!current || dirty & /*tag*/ 1) && t0_value !== (t0_value = /*tag*/ ctx[0][0].toUpperCase() + /*tag*/ ctx[0].substring(1) + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*updateTag, gameTags, getTagCount, tag*/ 7) {
    				each_value_1 = gameTags;
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_1[i] = create_each_block_1(child_ctx);
    						each_blocks_1[i].c();
    						each_blocks_1[i].m(div0, null);
    					}
    				}

    				for (; i < each_blocks_1.length; i += 1) {
    					each_blocks_1[i].d(1);
    				}

    				each_blocks_1.length = each_value_1.length;
    			}

    			if (dirty & /*games, tag*/ 1) {
    				each_value = games;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div3, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(menuicon.$$.fragment, local);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(menuicon.$$.fragment, local);
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
    			destroy_component(menuicon);
    			destroy_each(each_blocks_1, detaching);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('GameGrid', slots, []);
    	let tag = "featured";

    	// For testing
    	// tag = "all"
    	function updateTag(filter) {
    		$$invalidate(0, tag = filter);
    	}

    	function getTagCount(tag) {
    		let sum = games.reduce(
    			(count, game) => {
    				if (game.tags.includes(tag) || tag === "all") {
    					return count + 1;
    				} else {
    					return count;
    				}
    			},
    			0
    		);

    		return sum;
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<GameGrid> was created with unknown prop '${key}'`);
    	});

    	const click_handler = (filter, e) => updateTag(filter);

    	$$self.$capture_state = () => ({
    		GameCard,
    		games,
    		gameTags,
    		iconSize,
    		MenuIcon,
    		tag,
    		updateTag,
    		getTagCount
    	});

    	$$self.$inject_state = $$props => {
    		if ('tag' in $$props) $$invalidate(0, tag = $$props.tag);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [tag, updateTag, getTagCount, click_handler];
    }

    class GameGrid extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "GameGrid",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src\pages\Games.svelte generated by Svelte v3.47.0 */
    const file$2 = "src\\pages\\Games.svelte";

    // (10:4) <Section top={false} bottom={false} bg={theme.bgColors.primary}>
    function create_default_slot_1$1(ctx) {
    	let gameintro;
    	let current;
    	gameintro = new GameIntro({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(gameintro.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(gameintro, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(gameintro.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(gameintro.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(gameintro, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$1.name,
    		type: "slot",
    		source: "(10:4) <Section top={false} bottom={false} bg={theme.bgColors.primary}>",
    		ctx
    	});

    	return block;
    }

    // (14:4) <Section          top={true}          bottom={true}          bg={"linear-gradient(120deg, rgba(113,120,125,1) 0%, rgba(112,145,170,1) 100%)"}          contentNoClip={true}      >
    function create_default_slot$1(ctx) {
    	let h2;
    	let t1;
    	let gamegrid;
    	let current;
    	gamegrid = new GameGrid({ $$inline: true });

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			h2.textContent = "Game Archive";
    			t1 = space();
    			create_component(gamegrid.$$.fragment);
    			attr_dev(h2, "class", "dash");
    			add_location(h2, file$2, 19, 8, 644);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(gamegrid, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(gamegrid.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(gamegrid.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    			if (detaching) detach_dev(t1);
    			destroy_component(gamegrid, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(14:4) <Section          top={true}          bottom={true}          bg={\\\"linear-gradient(120deg, rgba(113,120,125,1) 0%, rgba(112,145,170,1) 100%)\\\"}          contentNoClip={true}      >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let div;
    	let section0;
    	let t0;
    	let section1;
    	let t1;
    	let sectionbreak;
    	let current;

    	section0 = new Section({
    			props: {
    				top: false,
    				bottom: false,
    				bg: theme.bgColors.primary,
    				$$slots: { default: [create_default_slot_1$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	section1 = new Section({
    			props: {
    				top: true,
    				bottom: true,
    				bg: "linear-gradient(120deg, rgba(113,120,125,1) 0%, rgba(112,145,170,1) 100%)",
    				contentNoClip: true,
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	sectionbreak = new SectionBreak({ $$inline: true });

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(section0.$$.fragment);
    			t0 = space();
    			create_component(section1.$$.fragment);
    			t1 = space();
    			create_component(sectionbreak.$$.fragment);
    			attr_dev(div, "class", "page");
    			add_location(div, file$2, 8, 0, 321);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(section0, div, null);
    			append_dev(div, t0);
    			mount_component(section1, div, null);
    			append_dev(div, t1);
    			mount_component(sectionbreak, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const section0_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				section0_changes.$$scope = { dirty, ctx };
    			}

    			section0.$set(section0_changes);
    			const section1_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				section1_changes.$$scope = { dirty, ctx };
    			}

    			section1.$set(section1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(section0.$$.fragment, local);
    			transition_in(section1.$$.fragment, local);
    			transition_in(sectionbreak.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(section0.$$.fragment, local);
    			transition_out(section1.$$.fragment, local);
    			transition_out(sectionbreak.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(section0);
    			destroy_component(section1);
    			destroy_component(sectionbreak);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Games', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Games> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		GameIntro,
    		GameGrid,
    		Section,
    		SectionBreak,
    		theme
    	});

    	return [];
    }

    class Games extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Games",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* node_modules\svelte-simple-modal\src\Modal.svelte generated by Svelte v3.47.0 */

    const { Object: Object_1, window: window_1 } = globals;
    const file$1 = "node_modules\\svelte-simple-modal\\src\\Modal.svelte";

    // (423:0) {#if Component}
    function create_if_block$1(ctx) {
    	let div3;
    	let div2;
    	let div1;
    	let t;
    	let div0;
    	let switch_instance;
    	let div0_class_value;
    	let div1_class_value;
    	let div1_aria_label_value;
    	let div1_aria_labelledby_value;
    	let div1_transition;
    	let div2_class_value;
    	let div3_class_value;
    	let div3_transition;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block = /*state*/ ctx[1].closeButton && create_if_block_1$1(ctx);
    	var switch_value = /*Component*/ ctx[2];

    	function switch_props(ctx) {
    		return { $$inline: true };
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props());
    	}

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div2 = element("div");
    			div1 = element("div");
    			if (if_block) if_block.c();
    			t = space();
    			div0 = element("div");
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			attr_dev(div0, "class", div0_class_value = "" + (null_to_empty(/*state*/ ctx[1].classContent) + " svelte-g4wg3a"));
    			attr_dev(div0, "style", /*cssContent*/ ctx[9]);
    			toggle_class(div0, "content", !/*unstyled*/ ctx[0]);
    			add_location(div0, file$1, 467, 8, 11882);
    			attr_dev(div1, "class", div1_class_value = "" + (null_to_empty(/*state*/ ctx[1].classWindow) + " svelte-g4wg3a"));
    			attr_dev(div1, "role", "dialog");
    			attr_dev(div1, "aria-modal", "true");

    			attr_dev(div1, "aria-label", div1_aria_label_value = /*state*/ ctx[1].ariaLabelledBy
    			? null
    			: /*state*/ ctx[1].ariaLabel || null);

    			attr_dev(div1, "aria-labelledby", div1_aria_labelledby_value = /*state*/ ctx[1].ariaLabelledBy || null);
    			attr_dev(div1, "style", /*cssWindow*/ ctx[8]);
    			toggle_class(div1, "window", !/*unstyled*/ ctx[0]);
    			add_location(div1, file$1, 438, 6, 10907);
    			attr_dev(div2, "class", div2_class_value = "" + (null_to_empty(/*state*/ ctx[1].classWindowWrap) + " svelte-g4wg3a"));
    			attr_dev(div2, "style", /*cssWindowWrap*/ ctx[7]);
    			toggle_class(div2, "wrap", !/*unstyled*/ ctx[0]);
    			add_location(div2, file$1, 432, 4, 10774);
    			attr_dev(div3, "class", div3_class_value = "" + (null_to_empty(/*state*/ ctx[1].classBg) + " svelte-g4wg3a"));
    			attr_dev(div3, "style", /*cssBg*/ ctx[6]);
    			toggle_class(div3, "bg", !/*unstyled*/ ctx[0]);
    			add_location(div3, file$1, 423, 2, 10528);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div2);
    			append_dev(div2, div1);
    			if (if_block) if_block.m(div1, null);
    			append_dev(div1, t);
    			append_dev(div1, div0);

    			if (switch_instance) {
    				mount_component(switch_instance, div0, null);
    			}

    			/*div1_binding*/ ctx[49](div1);
    			/*div2_binding*/ ctx[50](div2);
    			/*div3_binding*/ ctx[51](div3);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(
    						div1,
    						"introstart",
    						function () {
    							if (is_function(/*onOpen*/ ctx[13])) /*onOpen*/ ctx[13].apply(this, arguments);
    						},
    						false,
    						false,
    						false
    					),
    					listen_dev(
    						div1,
    						"outrostart",
    						function () {
    							if (is_function(/*onClose*/ ctx[14])) /*onClose*/ ctx[14].apply(this, arguments);
    						},
    						false,
    						false,
    						false
    					),
    					listen_dev(
    						div1,
    						"introend",
    						function () {
    							if (is_function(/*onOpened*/ ctx[15])) /*onOpened*/ ctx[15].apply(this, arguments);
    						},
    						false,
    						false,
    						false
    					),
    					listen_dev(
    						div1,
    						"outroend",
    						function () {
    							if (is_function(/*onClosed*/ ctx[16])) /*onClosed*/ ctx[16].apply(this, arguments);
    						},
    						false,
    						false,
    						false
    					),
    					listen_dev(div3, "mousedown", /*handleOuterMousedown*/ ctx[20], false, false, false),
    					listen_dev(div3, "mouseup", /*handleOuterMouseup*/ ctx[21], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (/*state*/ ctx[1].closeButton) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty[0] & /*state*/ 2) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block_1$1(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div1, t);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			if (switch_value !== (switch_value = /*Component*/ ctx[2])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, div0, null);
    				} else {
    					switch_instance = null;
    				}
    			}

    			if (!current || dirty[0] & /*state*/ 2 && div0_class_value !== (div0_class_value = "" + (null_to_empty(/*state*/ ctx[1].classContent) + " svelte-g4wg3a"))) {
    				attr_dev(div0, "class", div0_class_value);
    			}

    			if (!current || dirty[0] & /*cssContent*/ 512) {
    				attr_dev(div0, "style", /*cssContent*/ ctx[9]);
    			}

    			if (dirty[0] & /*state, unstyled*/ 3) {
    				toggle_class(div0, "content", !/*unstyled*/ ctx[0]);
    			}

    			if (!current || dirty[0] & /*state*/ 2 && div1_class_value !== (div1_class_value = "" + (null_to_empty(/*state*/ ctx[1].classWindow) + " svelte-g4wg3a"))) {
    				attr_dev(div1, "class", div1_class_value);
    			}

    			if (!current || dirty[0] & /*state*/ 2 && div1_aria_label_value !== (div1_aria_label_value = /*state*/ ctx[1].ariaLabelledBy
    			? null
    			: /*state*/ ctx[1].ariaLabel || null)) {
    				attr_dev(div1, "aria-label", div1_aria_label_value);
    			}

    			if (!current || dirty[0] & /*state*/ 2 && div1_aria_labelledby_value !== (div1_aria_labelledby_value = /*state*/ ctx[1].ariaLabelledBy || null)) {
    				attr_dev(div1, "aria-labelledby", div1_aria_labelledby_value);
    			}

    			if (!current || dirty[0] & /*cssWindow*/ 256) {
    				attr_dev(div1, "style", /*cssWindow*/ ctx[8]);
    			}

    			if (dirty[0] & /*state, unstyled*/ 3) {
    				toggle_class(div1, "window", !/*unstyled*/ ctx[0]);
    			}

    			if (!current || dirty[0] & /*state*/ 2 && div2_class_value !== (div2_class_value = "" + (null_to_empty(/*state*/ ctx[1].classWindowWrap) + " svelte-g4wg3a"))) {
    				attr_dev(div2, "class", div2_class_value);
    			}

    			if (!current || dirty[0] & /*cssWindowWrap*/ 128) {
    				attr_dev(div2, "style", /*cssWindowWrap*/ ctx[7]);
    			}

    			if (dirty[0] & /*state, unstyled*/ 3) {
    				toggle_class(div2, "wrap", !/*unstyled*/ ctx[0]);
    			}

    			if (!current || dirty[0] & /*state*/ 2 && div3_class_value !== (div3_class_value = "" + (null_to_empty(/*state*/ ctx[1].classBg) + " svelte-g4wg3a"))) {
    				attr_dev(div3, "class", div3_class_value);
    			}

    			if (!current || dirty[0] & /*cssBg*/ 64) {
    				attr_dev(div3, "style", /*cssBg*/ ctx[6]);
    			}

    			if (dirty[0] & /*state, unstyled*/ 3) {
    				toggle_class(div3, "bg", !/*unstyled*/ ctx[0]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);

    			add_render_callback(() => {
    				if (!div1_transition) div1_transition = create_bidirectional_transition(div1, /*currentTransitionWindow*/ ctx[12], /*state*/ ctx[1].transitionWindowProps, true);
    				div1_transition.run(1);
    			});

    			add_render_callback(() => {
    				if (!div3_transition) div3_transition = create_bidirectional_transition(div3, /*currentTransitionBg*/ ctx[11], /*state*/ ctx[1].transitionBgProps, true);
    				div3_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			if (!div1_transition) div1_transition = create_bidirectional_transition(div1, /*currentTransitionWindow*/ ctx[12], /*state*/ ctx[1].transitionWindowProps, false);
    			div1_transition.run(0);
    			if (!div3_transition) div3_transition = create_bidirectional_transition(div3, /*currentTransitionBg*/ ctx[11], /*state*/ ctx[1].transitionBgProps, false);
    			div3_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			if (if_block) if_block.d();
    			if (switch_instance) destroy_component(switch_instance);
    			/*div1_binding*/ ctx[49](null);
    			if (detaching && div1_transition) div1_transition.end();
    			/*div2_binding*/ ctx[50](null);
    			/*div3_binding*/ ctx[51](null);
    			if (detaching && div3_transition) div3_transition.end();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(423:0) {#if Component}",
    		ctx
    	});

    	return block;
    }

    // (454:8) {#if state.closeButton}
    function create_if_block_1$1(ctx) {
    	let show_if;
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_2$1, create_else_block$1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (dirty[0] & /*state*/ 2) show_if = null;
    		if (show_if == null) show_if = !!/*isFunction*/ ctx[17](/*state*/ ctx[1].closeButton);
    		if (show_if) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx, [-1, -1, -1]);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx, dirty);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(454:8) {#if state.closeButton}",
    		ctx
    	});

    	return block;
    }

    // (457:10) {:else}
    function create_else_block$1(ctx) {
    	let button;
    	let button_class_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			attr_dev(button, "class", button_class_value = "" + (null_to_empty(/*state*/ ctx[1].classCloseButton) + " svelte-g4wg3a"));
    			attr_dev(button, "aria-label", "Close modal");
    			attr_dev(button, "style", /*cssCloseButton*/ ctx[10]);
    			attr_dev(button, "type", "button");
    			toggle_class(button, "close", !/*unstyled*/ ctx[0]);
    			add_location(button, file$1, 457, 12, 11603);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*close*/ ctx[18], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*state*/ 2 && button_class_value !== (button_class_value = "" + (null_to_empty(/*state*/ ctx[1].classCloseButton) + " svelte-g4wg3a"))) {
    				attr_dev(button, "class", button_class_value);
    			}

    			if (dirty[0] & /*cssCloseButton*/ 1024) {
    				attr_dev(button, "style", /*cssCloseButton*/ ctx[10]);
    			}

    			if (dirty[0] & /*state, unstyled*/ 3) {
    				toggle_class(button, "close", !/*unstyled*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(457:10) {:else}",
    		ctx
    	});

    	return block;
    }

    // (455:10) {#if isFunction(state.closeButton)}
    function create_if_block_2$1(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	var switch_value = /*state*/ ctx[1].closeButton;

    	function switch_props(ctx) {
    		return {
    			props: { onClose: /*close*/ ctx[18] },
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props(ctx));
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (switch_value !== (switch_value = /*state*/ ctx[1].closeButton)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(455:10) {#if isFunction(state.closeButton)}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let t;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block = /*Component*/ ctx[2] && create_if_block$1(ctx);
    	const default_slot_template = /*#slots*/ ctx[48].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[47], null);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			t = space();
    			if (default_slot) default_slot.c();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, t, anchor);

    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(window_1, "keydown", /*handleKeydown*/ ctx[19], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (/*Component*/ ctx[2]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty[0] & /*Component*/ 4) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$1(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(t.parentNode, t);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty[1] & /*$$scope*/ 65536)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[47],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[47])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[47], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(t);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function bind(Component, props = {}) {
    	return function ModalComponent(options) {
    		return new Component({
    				...options,
    				props: { ...props, ...options.props }
    			});
    	};
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Modal', slots, ['default']);
    	const dispatch = createEventDispatcher();
    	const baseSetContext = setContext;

    	/**
     * A basic function that checks if a node is tabbale
     */
    	const baseIsTabbable = node => node.tabIndex >= 0 && !node.hidden && !node.disabled && node.style.display !== 'none' && node.type !== 'hidden' && Boolean(node.offsetWidth || node.offsetHeight || node.getClientRects().length);

    	let { isTabbable = baseIsTabbable } = $$props;
    	let { show = null } = $$props;
    	let { key = 'simple-modal' } = $$props;
    	let { ariaLabel = null } = $$props;
    	let { ariaLabelledBy = null } = $$props;
    	let { closeButton = true } = $$props;
    	let { closeOnEsc = true } = $$props;
    	let { closeOnOuterClick = true } = $$props;
    	let { styleBg = {} } = $$props;
    	let { styleWindowWrap = {} } = $$props;
    	let { styleWindow = {} } = $$props;
    	let { styleContent = {} } = $$props;
    	let { styleCloseButton = {} } = $$props;
    	let { classBg = null } = $$props;
    	let { classWindowWrap = null } = $$props;
    	let { classWindow = null } = $$props;
    	let { classContent = null } = $$props;
    	let { classCloseButton = null } = $$props;
    	let { unstyled = false } = $$props;
    	let { setContext: setContext$1 = baseSetContext } = $$props;
    	let { transitionBg = fade } = $$props;
    	let { transitionBgProps = { duration: 250 } } = $$props;
    	let { transitionWindow = transitionBg } = $$props;
    	let { transitionWindowProps = transitionBgProps } = $$props;
    	let { disableFocusTrap = false } = $$props;

    	const defaultState = {
    		ariaLabel,
    		ariaLabelledBy,
    		closeButton,
    		closeOnEsc,
    		closeOnOuterClick,
    		styleBg,
    		styleWindowWrap,
    		styleWindow,
    		styleContent,
    		styleCloseButton,
    		classBg,
    		classWindowWrap,
    		classWindow,
    		classContent,
    		classCloseButton,
    		transitionBg,
    		transitionBgProps,
    		transitionWindow,
    		transitionWindowProps,
    		disableFocusTrap,
    		isTabbable,
    		unstyled
    	};

    	let state = { ...defaultState };
    	let Component = null;
    	let background;
    	let wrap;
    	let modalWindow;
    	let scrollY;
    	let cssBg;
    	let cssWindowWrap;
    	let cssWindow;
    	let cssContent;
    	let cssCloseButton;
    	let currentTransitionBg;
    	let currentTransitionWindow;
    	let prevBodyPosition;
    	let prevBodyOverflow;
    	let prevBodyWidth;
    	let outerClickTarget;
    	const camelCaseToDash = str => str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();

    	const toCssString = props => props
    	? Object.keys(props).reduce((str, key) => `${str}; ${camelCaseToDash(key)}: ${props[key]}`, '')
    	: '';

    	const isFunction = f => !!(f && f.constructor && f.call && f.apply);

    	const updateStyleTransition = () => {
    		$$invalidate(6, cssBg = toCssString(Object.assign(
    			{},
    			{
    				width: window.innerWidth,
    				height: window.innerHeight
    			},
    			state.styleBg
    		)));

    		$$invalidate(7, cssWindowWrap = toCssString(state.styleWindowWrap));
    		$$invalidate(8, cssWindow = toCssString(state.styleWindow));
    		$$invalidate(9, cssContent = toCssString(state.styleContent));
    		$$invalidate(10, cssCloseButton = toCssString(state.styleCloseButton));
    		$$invalidate(11, currentTransitionBg = state.transitionBg);
    		$$invalidate(12, currentTransitionWindow = state.transitionWindow);
    	};

    	const toVoid = () => {
    		
    	};

    	let onOpen = toVoid;
    	let onClose = toVoid;
    	let onOpened = toVoid;
    	let onClosed = toVoid;

    	const open = (NewComponent, newProps = {}, options = {}, callback = {}) => {
    		$$invalidate(2, Component = bind(NewComponent, newProps));
    		$$invalidate(1, state = { ...defaultState, ...options });
    		updateStyleTransition();
    		disableScroll();

    		$$invalidate(13, onOpen = event => {
    			if (callback.onOpen) callback.onOpen(event);

    			/**
     * The open event is fired right before the modal opens
     * @event {void} open
     */
    			dispatch('open');

    			/**
     * The opening event is fired right before the modal opens
     * @event {void} opening
     * @deprecated Listen to the `open` event instead
     */
    			dispatch('opening'); // Deprecated. Do not use!
    		});

    		$$invalidate(14, onClose = event => {
    			if (callback.onClose) callback.onClose(event);

    			/**
     * The close event is fired right before the modal closes
     * @event {void} close
     */
    			dispatch('close');

    			/**
     * The closing event is fired right before the modal closes
     * @event {void} closing
     * @deprecated Listen to the `close` event instead
     */
    			dispatch('closing'); // Deprecated. Do not use!
    		});

    		$$invalidate(15, onOpened = event => {
    			if (callback.onOpened) callback.onOpened(event);

    			/**
     * The opened event is fired after the modal's opening transition
     * @event {void} opened
     */
    			dispatch('opened');
    		});

    		$$invalidate(16, onClosed = event => {
    			if (callback.onClosed) callback.onClosed(event);

    			/**
     * The closed event is fired after the modal's closing transition
     * @event {void} closed
     */
    			dispatch('closed');
    		});
    	};

    	const close = (callback = {}) => {
    		if (!Component) return;
    		$$invalidate(14, onClose = callback.onClose || onClose);
    		$$invalidate(16, onClosed = callback.onClosed || onClosed);
    		$$invalidate(2, Component = null);
    		enableScroll();
    	};

    	const handleKeydown = event => {
    		if (state.closeOnEsc && Component && event.key === 'Escape') {
    			event.preventDefault();
    			close();
    		}

    		if (Component && event.key === 'Tab' && !state.disableFocusTrap) {
    			// trap focus
    			const nodes = modalWindow.querySelectorAll('*');

    			const tabbable = Array.from(nodes).filter(state.isTabbable).sort((a, b) => a.tabIndex - b.tabIndex);
    			let index = tabbable.indexOf(document.activeElement);
    			if (index === -1 && event.shiftKey) index = 0;
    			index += tabbable.length + (event.shiftKey ? -1 : 1);
    			index %= tabbable.length;
    			tabbable[index].focus();
    			event.preventDefault();
    		}
    	};

    	const handleOuterMousedown = event => {
    		if (state.closeOnOuterClick && (event.target === background || event.target === wrap)) outerClickTarget = event.target;
    	};

    	const handleOuterMouseup = event => {
    		if (state.closeOnOuterClick && event.target === outerClickTarget) {
    			event.preventDefault();
    			close();
    		}
    	};

    	const disableScroll = () => {
    		scrollY = window.scrollY;
    		prevBodyPosition = document.body.style.position;
    		prevBodyOverflow = document.body.style.overflow;
    		prevBodyWidth = document.body.style.width;
    		document.body.style.position = 'fixed';
    		document.body.style.top = `-${scrollY}px`;
    		document.body.style.overflow = 'hidden';
    		document.body.style.width = '100%';
    	};

    	const enableScroll = () => {
    		document.body.style.position = prevBodyPosition || '';
    		document.body.style.top = '';
    		document.body.style.overflow = prevBodyOverflow || '';
    		document.body.style.width = prevBodyWidth || '';
    		window.scrollTo(0, scrollY);
    	};

    	setContext$1(key, { open, close });
    	let isMounted = false;

    	onDestroy(() => {
    		if (isMounted) close();
    	});

    	onMount(() => {
    		$$invalidate(46, isMounted = true);
    	});

    	const writable_props = [
    		'isTabbable',
    		'show',
    		'key',
    		'ariaLabel',
    		'ariaLabelledBy',
    		'closeButton',
    		'closeOnEsc',
    		'closeOnOuterClick',
    		'styleBg',
    		'styleWindowWrap',
    		'styleWindow',
    		'styleContent',
    		'styleCloseButton',
    		'classBg',
    		'classWindowWrap',
    		'classWindow',
    		'classContent',
    		'classCloseButton',
    		'unstyled',
    		'setContext',
    		'transitionBg',
    		'transitionBgProps',
    		'transitionWindow',
    		'transitionWindowProps',
    		'disableFocusTrap'
    	];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Modal> was created with unknown prop '${key}'`);
    	});

    	function div1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			modalWindow = $$value;
    			$$invalidate(5, modalWindow);
    		});
    	}

    	function div2_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			wrap = $$value;
    			$$invalidate(4, wrap);
    		});
    	}

    	function div3_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			background = $$value;
    			$$invalidate(3, background);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('isTabbable' in $$props) $$invalidate(22, isTabbable = $$props.isTabbable);
    		if ('show' in $$props) $$invalidate(23, show = $$props.show);
    		if ('key' in $$props) $$invalidate(24, key = $$props.key);
    		if ('ariaLabel' in $$props) $$invalidate(25, ariaLabel = $$props.ariaLabel);
    		if ('ariaLabelledBy' in $$props) $$invalidate(26, ariaLabelledBy = $$props.ariaLabelledBy);
    		if ('closeButton' in $$props) $$invalidate(27, closeButton = $$props.closeButton);
    		if ('closeOnEsc' in $$props) $$invalidate(28, closeOnEsc = $$props.closeOnEsc);
    		if ('closeOnOuterClick' in $$props) $$invalidate(29, closeOnOuterClick = $$props.closeOnOuterClick);
    		if ('styleBg' in $$props) $$invalidate(30, styleBg = $$props.styleBg);
    		if ('styleWindowWrap' in $$props) $$invalidate(31, styleWindowWrap = $$props.styleWindowWrap);
    		if ('styleWindow' in $$props) $$invalidate(32, styleWindow = $$props.styleWindow);
    		if ('styleContent' in $$props) $$invalidate(33, styleContent = $$props.styleContent);
    		if ('styleCloseButton' in $$props) $$invalidate(34, styleCloseButton = $$props.styleCloseButton);
    		if ('classBg' in $$props) $$invalidate(35, classBg = $$props.classBg);
    		if ('classWindowWrap' in $$props) $$invalidate(36, classWindowWrap = $$props.classWindowWrap);
    		if ('classWindow' in $$props) $$invalidate(37, classWindow = $$props.classWindow);
    		if ('classContent' in $$props) $$invalidate(38, classContent = $$props.classContent);
    		if ('classCloseButton' in $$props) $$invalidate(39, classCloseButton = $$props.classCloseButton);
    		if ('unstyled' in $$props) $$invalidate(0, unstyled = $$props.unstyled);
    		if ('setContext' in $$props) $$invalidate(40, setContext$1 = $$props.setContext);
    		if ('transitionBg' in $$props) $$invalidate(41, transitionBg = $$props.transitionBg);
    		if ('transitionBgProps' in $$props) $$invalidate(42, transitionBgProps = $$props.transitionBgProps);
    		if ('transitionWindow' in $$props) $$invalidate(43, transitionWindow = $$props.transitionWindow);
    		if ('transitionWindowProps' in $$props) $$invalidate(44, transitionWindowProps = $$props.transitionWindowProps);
    		if ('disableFocusTrap' in $$props) $$invalidate(45, disableFocusTrap = $$props.disableFocusTrap);
    		if ('$$scope' in $$props) $$invalidate(47, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		bind,
    		svelte,
    		fade,
    		createEventDispatcher,
    		dispatch,
    		baseSetContext,
    		baseIsTabbable,
    		isTabbable,
    		show,
    		key,
    		ariaLabel,
    		ariaLabelledBy,
    		closeButton,
    		closeOnEsc,
    		closeOnOuterClick,
    		styleBg,
    		styleWindowWrap,
    		styleWindow,
    		styleContent,
    		styleCloseButton,
    		classBg,
    		classWindowWrap,
    		classWindow,
    		classContent,
    		classCloseButton,
    		unstyled,
    		setContext: setContext$1,
    		transitionBg,
    		transitionBgProps,
    		transitionWindow,
    		transitionWindowProps,
    		disableFocusTrap,
    		defaultState,
    		state,
    		Component,
    		background,
    		wrap,
    		modalWindow,
    		scrollY,
    		cssBg,
    		cssWindowWrap,
    		cssWindow,
    		cssContent,
    		cssCloseButton,
    		currentTransitionBg,
    		currentTransitionWindow,
    		prevBodyPosition,
    		prevBodyOverflow,
    		prevBodyWidth,
    		outerClickTarget,
    		camelCaseToDash,
    		toCssString,
    		isFunction,
    		updateStyleTransition,
    		toVoid,
    		onOpen,
    		onClose,
    		onOpened,
    		onClosed,
    		open,
    		close,
    		handleKeydown,
    		handleOuterMousedown,
    		handleOuterMouseup,
    		disableScroll,
    		enableScroll,
    		isMounted
    	});

    	$$self.$inject_state = $$props => {
    		if ('isTabbable' in $$props) $$invalidate(22, isTabbable = $$props.isTabbable);
    		if ('show' in $$props) $$invalidate(23, show = $$props.show);
    		if ('key' in $$props) $$invalidate(24, key = $$props.key);
    		if ('ariaLabel' in $$props) $$invalidate(25, ariaLabel = $$props.ariaLabel);
    		if ('ariaLabelledBy' in $$props) $$invalidate(26, ariaLabelledBy = $$props.ariaLabelledBy);
    		if ('closeButton' in $$props) $$invalidate(27, closeButton = $$props.closeButton);
    		if ('closeOnEsc' in $$props) $$invalidate(28, closeOnEsc = $$props.closeOnEsc);
    		if ('closeOnOuterClick' in $$props) $$invalidate(29, closeOnOuterClick = $$props.closeOnOuterClick);
    		if ('styleBg' in $$props) $$invalidate(30, styleBg = $$props.styleBg);
    		if ('styleWindowWrap' in $$props) $$invalidate(31, styleWindowWrap = $$props.styleWindowWrap);
    		if ('styleWindow' in $$props) $$invalidate(32, styleWindow = $$props.styleWindow);
    		if ('styleContent' in $$props) $$invalidate(33, styleContent = $$props.styleContent);
    		if ('styleCloseButton' in $$props) $$invalidate(34, styleCloseButton = $$props.styleCloseButton);
    		if ('classBg' in $$props) $$invalidate(35, classBg = $$props.classBg);
    		if ('classWindowWrap' in $$props) $$invalidate(36, classWindowWrap = $$props.classWindowWrap);
    		if ('classWindow' in $$props) $$invalidate(37, classWindow = $$props.classWindow);
    		if ('classContent' in $$props) $$invalidate(38, classContent = $$props.classContent);
    		if ('classCloseButton' in $$props) $$invalidate(39, classCloseButton = $$props.classCloseButton);
    		if ('unstyled' in $$props) $$invalidate(0, unstyled = $$props.unstyled);
    		if ('setContext' in $$props) $$invalidate(40, setContext$1 = $$props.setContext);
    		if ('transitionBg' in $$props) $$invalidate(41, transitionBg = $$props.transitionBg);
    		if ('transitionBgProps' in $$props) $$invalidate(42, transitionBgProps = $$props.transitionBgProps);
    		if ('transitionWindow' in $$props) $$invalidate(43, transitionWindow = $$props.transitionWindow);
    		if ('transitionWindowProps' in $$props) $$invalidate(44, transitionWindowProps = $$props.transitionWindowProps);
    		if ('disableFocusTrap' in $$props) $$invalidate(45, disableFocusTrap = $$props.disableFocusTrap);
    		if ('state' in $$props) $$invalidate(1, state = $$props.state);
    		if ('Component' in $$props) $$invalidate(2, Component = $$props.Component);
    		if ('background' in $$props) $$invalidate(3, background = $$props.background);
    		if ('wrap' in $$props) $$invalidate(4, wrap = $$props.wrap);
    		if ('modalWindow' in $$props) $$invalidate(5, modalWindow = $$props.modalWindow);
    		if ('scrollY' in $$props) scrollY = $$props.scrollY;
    		if ('cssBg' in $$props) $$invalidate(6, cssBg = $$props.cssBg);
    		if ('cssWindowWrap' in $$props) $$invalidate(7, cssWindowWrap = $$props.cssWindowWrap);
    		if ('cssWindow' in $$props) $$invalidate(8, cssWindow = $$props.cssWindow);
    		if ('cssContent' in $$props) $$invalidate(9, cssContent = $$props.cssContent);
    		if ('cssCloseButton' in $$props) $$invalidate(10, cssCloseButton = $$props.cssCloseButton);
    		if ('currentTransitionBg' in $$props) $$invalidate(11, currentTransitionBg = $$props.currentTransitionBg);
    		if ('currentTransitionWindow' in $$props) $$invalidate(12, currentTransitionWindow = $$props.currentTransitionWindow);
    		if ('prevBodyPosition' in $$props) prevBodyPosition = $$props.prevBodyPosition;
    		if ('prevBodyOverflow' in $$props) prevBodyOverflow = $$props.prevBodyOverflow;
    		if ('prevBodyWidth' in $$props) prevBodyWidth = $$props.prevBodyWidth;
    		if ('outerClickTarget' in $$props) outerClickTarget = $$props.outerClickTarget;
    		if ('onOpen' in $$props) $$invalidate(13, onOpen = $$props.onOpen);
    		if ('onClose' in $$props) $$invalidate(14, onClose = $$props.onClose);
    		if ('onOpened' in $$props) $$invalidate(15, onOpened = $$props.onOpened);
    		if ('onClosed' in $$props) $$invalidate(16, onClosed = $$props.onClosed);
    		if ('isMounted' in $$props) $$invalidate(46, isMounted = $$props.isMounted);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*show*/ 8388608 | $$self.$$.dirty[1] & /*isMounted*/ 32768) {
    			{
    				if (isMounted) {
    					if (isFunction(show)) {
    						open(show);
    					} else {
    						close();
    					}
    				}
    			}
    		}
    	};

    	return [
    		unstyled,
    		state,
    		Component,
    		background,
    		wrap,
    		modalWindow,
    		cssBg,
    		cssWindowWrap,
    		cssWindow,
    		cssContent,
    		cssCloseButton,
    		currentTransitionBg,
    		currentTransitionWindow,
    		onOpen,
    		onClose,
    		onOpened,
    		onClosed,
    		isFunction,
    		close,
    		handleKeydown,
    		handleOuterMousedown,
    		handleOuterMouseup,
    		isTabbable,
    		show,
    		key,
    		ariaLabel,
    		ariaLabelledBy,
    		closeButton,
    		closeOnEsc,
    		closeOnOuterClick,
    		styleBg,
    		styleWindowWrap,
    		styleWindow,
    		styleContent,
    		styleCloseButton,
    		classBg,
    		classWindowWrap,
    		classWindow,
    		classContent,
    		classCloseButton,
    		setContext$1,
    		transitionBg,
    		transitionBgProps,
    		transitionWindow,
    		transitionWindowProps,
    		disableFocusTrap,
    		isMounted,
    		$$scope,
    		slots,
    		div1_binding,
    		div2_binding,
    		div3_binding
    	];
    }

    class Modal extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(
    			this,
    			options,
    			instance$1,
    			create_fragment$1,
    			safe_not_equal,
    			{
    				isTabbable: 22,
    				show: 23,
    				key: 24,
    				ariaLabel: 25,
    				ariaLabelledBy: 26,
    				closeButton: 27,
    				closeOnEsc: 28,
    				closeOnOuterClick: 29,
    				styleBg: 30,
    				styleWindowWrap: 31,
    				styleWindow: 32,
    				styleContent: 33,
    				styleCloseButton: 34,
    				classBg: 35,
    				classWindowWrap: 36,
    				classWindow: 37,
    				classContent: 38,
    				classCloseButton: 39,
    				unstyled: 0,
    				setContext: 40,
    				transitionBg: 41,
    				transitionBgProps: 42,
    				transitionWindow: 43,
    				transitionWindowProps: 44,
    				disableFocusTrap: 45
    			},
    			null,
    			[-1, -1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Modal",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get isTabbable() {
    		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isTabbable(value) {
    		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get show() {
    		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set show(value) {
    		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get key() {
    		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set key(value) {
    		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ariaLabel() {
    		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ariaLabel(value) {
    		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ariaLabelledBy() {
    		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ariaLabelledBy(value) {
    		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get closeButton() {
    		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set closeButton(value) {
    		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get closeOnEsc() {
    		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set closeOnEsc(value) {
    		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get closeOnOuterClick() {
    		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set closeOnOuterClick(value) {
    		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get styleBg() {
    		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set styleBg(value) {
    		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get styleWindowWrap() {
    		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set styleWindowWrap(value) {
    		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get styleWindow() {
    		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set styleWindow(value) {
    		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get styleContent() {
    		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set styleContent(value) {
    		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get styleCloseButton() {
    		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set styleCloseButton(value) {
    		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get classBg() {
    		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set classBg(value) {
    		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get classWindowWrap() {
    		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set classWindowWrap(value) {
    		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get classWindow() {
    		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set classWindow(value) {
    		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get classContent() {
    		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set classContent(value) {
    		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get classCloseButton() {
    		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set classCloseButton(value) {
    		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get unstyled() {
    		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set unstyled(value) {
    		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get setContext() {
    		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set setContext(value) {
    		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get transitionBg() {
    		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set transitionBg(value) {
    		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get transitionBgProps() {
    		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set transitionBgProps(value) {
    		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get transitionWindow() {
    		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set transitionWindow(value) {
    		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get transitionWindowProps() {
    		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set transitionWindowProps(value) {
    		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disableFocusTrap() {
    		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disableFocusTrap(value) {
    		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    //----------------------------------------------------------------------------//
    //                            Svelte Viewport Info                            //
    //----------------------------------------------------------------------------//
    var MediaMatcher = (window.matchMedia ||
        // @ts-ignore
        window['webkitMatchmedia'] || window['mozMatchmedia'] || window['oMatchmedia']);
    function MediaQuery(query) {
        return (MediaMatcher != null) && MediaMatcher(query).matches;
    }
    function DocumentIsReady() {
        return ((document.readyState === 'interactive') ||
            (document.readyState === 'complete'));
    }
    /**** determineViewportSize ****/
    // Internet Explorer and MS/Edge are NOT supported
    var ViewportWidth = 0; // given in px, explicit initialization...
    var ViewportHeight = 0; // ...is needed to satisfy the compiler
    function determineViewportSize() {
        ViewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        ViewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    }
    // see https://stackoverflow.com/questions/1248081/get-the-browser-viewport-dimensions-with-javascript
    determineViewportSize();
    var ScreenOrientation = undefined;
    var detailledScreenOrientation = undefined;
    // explicit initialization is needed to satisfy compiler
    function determineScreenOrientation() {
        var Orientation;
        if ('orientation' in window.Screen) {
            Orientation = window.screen.orientation.type;
        }
        switch (Orientation) {
            case 'portrait-primary':
            case 'portrait-secondary':
                ScreenOrientation = 'portrait';
                detailledScreenOrientation = Orientation;
                break;
            case 'landscape-primary':
            case 'landscape-secondary':
                ScreenOrientation = 'landscape';
                detailledScreenOrientation = Orientation;
                break;
            default:
                switch (true) {
                    case MediaQuery('(orientation:portrait)'):
                        ScreenOrientation = 'portrait';
                        break;
                    case MediaQuery('(orientation:landscape)'):
                    case ViewportWidth > ViewportHeight:
                        ScreenOrientation = 'landscape';
                        break;
                    default: ScreenOrientation = 'portrait';
                }
                detailledScreenOrientation = undefined;
        }
        if (DocumentIsReady()) {
            document.body.classList.remove('Portrait', 'Landscape', 'Portrait-primary', 'Portrait-secondary', 'Landscape-primary', 'Landscape-secondary');
            switch (ScreenOrientation) {
                case 'portrait':
                    document.body.classList.add('Portrait');
                    break;
                case 'landscape':
                    document.body.classList.add('Landscape');
                    break;
            }
            if (detailledScreenOrientation != null) {
                var capitalized = function (Name) { return Name[0].toUpperCase() + Name.slice(1); };
                document.body.classList.add(capitalized(detailledScreenOrientation));
            }
        }
    }
    determineScreenOrientation();
    if (!DocumentIsReady()) {
        window.addEventListener('DOMContentLoaded', determineScreenOrientation);
    } // after document is loaded, classes will be applied as foreseen
    /**** handle problem that "orientationchange" is fired too soon ****/
    var oldViewportWidth = ViewportWidth;
    var oldViewportHeight = ViewportHeight;
    var oldScreenOrientation = ScreenOrientation;
    var oldDetailledScreenOrientation = detailledScreenOrientation;
    function rememberSettings() {
        oldViewportWidth = ViewportWidth;
        oldViewportHeight = ViewportHeight;
        oldScreenOrientation = ScreenOrientation;
        oldDetailledScreenOrientation = detailledScreenOrientation;
    }
    function submitEvents() {
        if (!DocumentIsReady()) {
            return;
        }
        if ((oldViewportWidth !== ViewportWidth) || (oldViewportHeight !== ViewportHeight)) {
            document.body.dispatchEvent(new Event('viewportchanged', { bubbles: true, cancelable: true }));
        }
        if ((oldScreenOrientation !== ScreenOrientation) ||
            (oldDetailledScreenOrientation !== detailledScreenOrientation)) {
            document.body.dispatchEvent(new Event('orientationchangeend', { bubbles: true, cancelable: true }));
        }
    }
    var Poller; // right now, it's difficult to determine the proper type
    var PollCounter = 0;
    var PollCounterLimit = 10; // i.e., stop polling after 1000ms
    function stopPolling() {
        clearInterval(Poller);
        Poller = undefined;
        PollCounter = 0;
    }
    function pollForViewportAfterOrientationChange() {
        Poller = setInterval(function () {
            determineViewportSize();
            if ( // no update of screen size yet? => continue polling
            (oldViewportWidth === ViewportWidth) &&
                (oldViewportHeight === ViewportHeight)) {
                PollCounter += 1;
                if (PollCounter <= PollCounterLimit) {
                    return;
                }
            } // nota bene: sometimes viewport does not change (e.g., in iframe)
            stopPolling();
            determineScreenOrientation(); // uses ViewportWidth/Height as fallback
            submitEvents();
            rememberSettings();
        }, 100);
    }
    /**** handler for "orientationchange" event ****/
    function determineViewportSizeAndScreenOrientation() {
        determineViewportSize();
        determineScreenOrientation(); // uses screen_width/height as final fallback
        if (Poller != null) { // we are still polling because of former event
            stopPolling();
            submitEvents();
            rememberSettings();
        }
        if ((oldViewportWidth === ViewportWidth) &&
            (oldViewportHeight === ViewportHeight)) { // screen size did not (yet) change => start polling for change
            pollForViewportAfterOrientationChange();
        }
        else { // viewport size changed in time => do not poll
            submitEvents();
            rememberSettings();
        }
    }
    // see https://github.com/gajus/orientationchangeend
    /**** update on changes ****/
    window.addEventListener('orientationchange', function () {
        setTimeout(determineViewportSizeAndScreenOrientation, 10);
    }); // seen on iOS 12: "orientationchange" fired before orientation is updated
    window.addEventListener('resize', determineViewportSizeAndScreenOrientation);
    if ('orientation' in screen) {
        screen.orientation.addEventListener('change', function () {
            setTimeout(determineViewportSizeAndScreenOrientation, 10);
        });
    }
    var svelteViewportInfo = {
        get Width() { return ViewportWidth; },
        get Height() { return ViewportHeight; },
        get Orientation() { return ScreenOrientation; },
        get detailledOrientation() { return detailledScreenOrientation; },
    };

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function createCommonjsModule(fn) {
      var module = { exports: {} };
    	return fn(module, module.exports), module.exports;
    }

    var page = createCommonjsModule(function (module, exports) {
    (function (global, factory) {
    	module.exports = factory() ;
    }(commonjsGlobal, (function () {
    var isarray = Array.isArray || function (arr) {
      return Object.prototype.toString.call(arr) == '[object Array]';
    };

    /**
     * Expose `pathToRegexp`.
     */
    var pathToRegexp_1 = pathToRegexp;
    var parse_1 = parse;
    var compile_1 = compile;
    var tokensToFunction_1 = tokensToFunction;
    var tokensToRegExp_1 = tokensToRegExp;

    /**
     * The main path matching regexp utility.
     *
     * @type {RegExp}
     */
    var PATH_REGEXP = new RegExp([
      // Match escaped characters that would otherwise appear in future matches.
      // This allows the user to escape special characters that won't transform.
      '(\\\\.)',
      // Match Express-style parameters and un-named parameters with a prefix
      // and optional suffixes. Matches appear as:
      //
      // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
      // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
      // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
      '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))'
    ].join('|'), 'g');

    /**
     * Parse a string for the raw tokens.
     *
     * @param  {String} str
     * @return {Array}
     */
    function parse (str) {
      var tokens = [];
      var key = 0;
      var index = 0;
      var path = '';
      var res;

      while ((res = PATH_REGEXP.exec(str)) != null) {
        var m = res[0];
        var escaped = res[1];
        var offset = res.index;
        path += str.slice(index, offset);
        index = offset + m.length;

        // Ignore already escaped sequences.
        if (escaped) {
          path += escaped[1];
          continue
        }

        // Push the current path onto the tokens.
        if (path) {
          tokens.push(path);
          path = '';
        }

        var prefix = res[2];
        var name = res[3];
        var capture = res[4];
        var group = res[5];
        var suffix = res[6];
        var asterisk = res[7];

        var repeat = suffix === '+' || suffix === '*';
        var optional = suffix === '?' || suffix === '*';
        var delimiter = prefix || '/';
        var pattern = capture || group || (asterisk ? '.*' : '[^' + delimiter + ']+?');

        tokens.push({
          name: name || key++,
          prefix: prefix || '',
          delimiter: delimiter,
          optional: optional,
          repeat: repeat,
          pattern: escapeGroup(pattern)
        });
      }

      // Match any characters still remaining.
      if (index < str.length) {
        path += str.substr(index);
      }

      // If the path exists, push it onto the end.
      if (path) {
        tokens.push(path);
      }

      return tokens
    }

    /**
     * Compile a string to a template function for the path.
     *
     * @param  {String}   str
     * @return {Function}
     */
    function compile (str) {
      return tokensToFunction(parse(str))
    }

    /**
     * Expose a method for transforming tokens into the path function.
     */
    function tokensToFunction (tokens) {
      // Compile all the tokens into regexps.
      var matches = new Array(tokens.length);

      // Compile all the patterns before compilation.
      for (var i = 0; i < tokens.length; i++) {
        if (typeof tokens[i] === 'object') {
          matches[i] = new RegExp('^' + tokens[i].pattern + '$');
        }
      }

      return function (obj) {
        var path = '';
        var data = obj || {};

        for (var i = 0; i < tokens.length; i++) {
          var token = tokens[i];

          if (typeof token === 'string') {
            path += token;

            continue
          }

          var value = data[token.name];
          var segment;

          if (value == null) {
            if (token.optional) {
              continue
            } else {
              throw new TypeError('Expected "' + token.name + '" to be defined')
            }
          }

          if (isarray(value)) {
            if (!token.repeat) {
              throw new TypeError('Expected "' + token.name + '" to not repeat, but received "' + value + '"')
            }

            if (value.length === 0) {
              if (token.optional) {
                continue
              } else {
                throw new TypeError('Expected "' + token.name + '" to not be empty')
              }
            }

            for (var j = 0; j < value.length; j++) {
              segment = encodeURIComponent(value[j]);

              if (!matches[i].test(segment)) {
                throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
              }

              path += (j === 0 ? token.prefix : token.delimiter) + segment;
            }

            continue
          }

          segment = encodeURIComponent(value);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
          }

          path += token.prefix + segment;
        }

        return path
      }
    }

    /**
     * Escape a regular expression string.
     *
     * @param  {String} str
     * @return {String}
     */
    function escapeString (str) {
      return str.replace(/([.+*?=^!:${}()[\]|\/])/g, '\\$1')
    }

    /**
     * Escape the capturing group by escaping special characters and meaning.
     *
     * @param  {String} group
     * @return {String}
     */
    function escapeGroup (group) {
      return group.replace(/([=!:$\/()])/g, '\\$1')
    }

    /**
     * Attach the keys as a property of the regexp.
     *
     * @param  {RegExp} re
     * @param  {Array}  keys
     * @return {RegExp}
     */
    function attachKeys (re, keys) {
      re.keys = keys;
      return re
    }

    /**
     * Get the flags for a regexp from the options.
     *
     * @param  {Object} options
     * @return {String}
     */
    function flags (options) {
      return options.sensitive ? '' : 'i'
    }

    /**
     * Pull out keys from a regexp.
     *
     * @param  {RegExp} path
     * @param  {Array}  keys
     * @return {RegExp}
     */
    function regexpToRegexp (path, keys) {
      // Use a negative lookahead to match only capturing groups.
      var groups = path.source.match(/\((?!\?)/g);

      if (groups) {
        for (var i = 0; i < groups.length; i++) {
          keys.push({
            name: i,
            prefix: null,
            delimiter: null,
            optional: false,
            repeat: false,
            pattern: null
          });
        }
      }

      return attachKeys(path, keys)
    }

    /**
     * Transform an array into a regexp.
     *
     * @param  {Array}  path
     * @param  {Array}  keys
     * @param  {Object} options
     * @return {RegExp}
     */
    function arrayToRegexp (path, keys, options) {
      var parts = [];

      for (var i = 0; i < path.length; i++) {
        parts.push(pathToRegexp(path[i], keys, options).source);
      }

      var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

      return attachKeys(regexp, keys)
    }

    /**
     * Create a path regexp from string input.
     *
     * @param  {String} path
     * @param  {Array}  keys
     * @param  {Object} options
     * @return {RegExp}
     */
    function stringToRegexp (path, keys, options) {
      var tokens = parse(path);
      var re = tokensToRegExp(tokens, options);

      // Attach keys back to the regexp.
      for (var i = 0; i < tokens.length; i++) {
        if (typeof tokens[i] !== 'string') {
          keys.push(tokens[i]);
        }
      }

      return attachKeys(re, keys)
    }

    /**
     * Expose a function for taking tokens and returning a RegExp.
     *
     * @param  {Array}  tokens
     * @param  {Array}  keys
     * @param  {Object} options
     * @return {RegExp}
     */
    function tokensToRegExp (tokens, options) {
      options = options || {};

      var strict = options.strict;
      var end = options.end !== false;
      var route = '';
      var lastToken = tokens[tokens.length - 1];
      var endsWithSlash = typeof lastToken === 'string' && /\/$/.test(lastToken);

      // Iterate over the tokens and create our regexp string.
      for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];

        if (typeof token === 'string') {
          route += escapeString(token);
        } else {
          var prefix = escapeString(token.prefix);
          var capture = token.pattern;

          if (token.repeat) {
            capture += '(?:' + prefix + capture + ')*';
          }

          if (token.optional) {
            if (prefix) {
              capture = '(?:' + prefix + '(' + capture + '))?';
            } else {
              capture = '(' + capture + ')?';
            }
          } else {
            capture = prefix + '(' + capture + ')';
          }

          route += capture;
        }
      }

      // In non-strict mode we allow a slash at the end of match. If the path to
      // match already ends with a slash, we remove it for consistency. The slash
      // is valid at the end of a path match, not in the middle. This is important
      // in non-ending mode, where "/test/" shouldn't match "/test//route".
      if (!strict) {
        route = (endsWithSlash ? route.slice(0, -2) : route) + '(?:\\/(?=$))?';
      }

      if (end) {
        route += '$';
      } else {
        // In non-ending mode, we need the capturing groups to match as much as
        // possible by using a positive lookahead to the end or next path segment.
        route += strict && endsWithSlash ? '' : '(?=\\/|$)';
      }

      return new RegExp('^' + route, flags(options))
    }

    /**
     * Normalize the given path string, returning a regular expression.
     *
     * An empty array can be passed in for the keys, which will hold the
     * placeholder key descriptions. For example, using `/user/:id`, `keys` will
     * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
     *
     * @param  {(String|RegExp|Array)} path
     * @param  {Array}                 [keys]
     * @param  {Object}                [options]
     * @return {RegExp}
     */
    function pathToRegexp (path, keys, options) {
      keys = keys || [];

      if (!isarray(keys)) {
        options = keys;
        keys = [];
      } else if (!options) {
        options = {};
      }

      if (path instanceof RegExp) {
        return regexpToRegexp(path, keys)
      }

      if (isarray(path)) {
        return arrayToRegexp(path, keys, options)
      }

      return stringToRegexp(path, keys, options)
    }

    pathToRegexp_1.parse = parse_1;
    pathToRegexp_1.compile = compile_1;
    pathToRegexp_1.tokensToFunction = tokensToFunction_1;
    pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;

    /**
       * Module dependencies.
       */

      

      /**
       * Short-cuts for global-object checks
       */

      var hasDocument = ('undefined' !== typeof document);
      var hasWindow = ('undefined' !== typeof window);
      var hasHistory = ('undefined' !== typeof history);
      var hasProcess = typeof process !== 'undefined';

      /**
       * Detect click event
       */
      var clickEvent = hasDocument && document.ontouchstart ? 'touchstart' : 'click';

      /**
       * To work properly with the URL
       * history.location generated polyfill in https://github.com/devote/HTML5-History-API
       */

      var isLocation = hasWindow && !!(window.history.location || window.location);

      /**
       * The page instance
       * @api private
       */
      function Page() {
        // public things
        this.callbacks = [];
        this.exits = [];
        this.current = '';
        this.len = 0;

        // private things
        this._decodeURLComponents = true;
        this._base = '';
        this._strict = false;
        this._running = false;
        this._hashbang = false;

        // bound functions
        this.clickHandler = this.clickHandler.bind(this);
        this._onpopstate = this._onpopstate.bind(this);
      }

      /**
       * Configure the instance of page. This can be called multiple times.
       *
       * @param {Object} options
       * @api public
       */

      Page.prototype.configure = function(options) {
        var opts = options || {};

        this._window = opts.window || (hasWindow && window);
        this._decodeURLComponents = opts.decodeURLComponents !== false;
        this._popstate = opts.popstate !== false && hasWindow;
        this._click = opts.click !== false && hasDocument;
        this._hashbang = !!opts.hashbang;

        var _window = this._window;
        if(this._popstate) {
          _window.addEventListener('popstate', this._onpopstate, false);
        } else if(hasWindow) {
          _window.removeEventListener('popstate', this._onpopstate, false);
        }

        if (this._click) {
          _window.document.addEventListener(clickEvent, this.clickHandler, false);
        } else if(hasDocument) {
          _window.document.removeEventListener(clickEvent, this.clickHandler, false);
        }

        if(this._hashbang && hasWindow && !hasHistory) {
          _window.addEventListener('hashchange', this._onpopstate, false);
        } else if(hasWindow) {
          _window.removeEventListener('hashchange', this._onpopstate, false);
        }
      };

      /**
       * Get or set basepath to `path`.
       *
       * @param {string} path
       * @api public
       */

      Page.prototype.base = function(path) {
        if (0 === arguments.length) return this._base;
        this._base = path;
      };

      /**
       * Gets the `base`, which depends on whether we are using History or
       * hashbang routing.

       * @api private
       */
      Page.prototype._getBase = function() {
        var base = this._base;
        if(!!base) return base;
        var loc = hasWindow && this._window && this._window.location;

        if(hasWindow && this._hashbang && loc && loc.protocol === 'file:') {
          base = loc.pathname;
        }

        return base;
      };

      /**
       * Get or set strict path matching to `enable`
       *
       * @param {boolean} enable
       * @api public
       */

      Page.prototype.strict = function(enable) {
        if (0 === arguments.length) return this._strict;
        this._strict = enable;
      };


      /**
       * Bind with the given `options`.
       *
       * Options:
       *
       *    - `click` bind to click events [true]
       *    - `popstate` bind to popstate [true]
       *    - `dispatch` perform initial dispatch [true]
       *
       * @param {Object} options
       * @api public
       */

      Page.prototype.start = function(options) {
        var opts = options || {};
        this.configure(opts);

        if (false === opts.dispatch) return;
        this._running = true;

        var url;
        if(isLocation) {
          var window = this._window;
          var loc = window.location;

          if(this._hashbang && ~loc.hash.indexOf('#!')) {
            url = loc.hash.substr(2) + loc.search;
          } else if (this._hashbang) {
            url = loc.search + loc.hash;
          } else {
            url = loc.pathname + loc.search + loc.hash;
          }
        }

        this.replace(url, null, true, opts.dispatch);
      };

      /**
       * Unbind click and popstate event handlers.
       *
       * @api public
       */

      Page.prototype.stop = function() {
        if (!this._running) return;
        this.current = '';
        this.len = 0;
        this._running = false;

        var window = this._window;
        this._click && window.document.removeEventListener(clickEvent, this.clickHandler, false);
        hasWindow && window.removeEventListener('popstate', this._onpopstate, false);
        hasWindow && window.removeEventListener('hashchange', this._onpopstate, false);
      };

      /**
       * Show `path` with optional `state` object.
       *
       * @param {string} path
       * @param {Object=} state
       * @param {boolean=} dispatch
       * @param {boolean=} push
       * @return {!Context}
       * @api public
       */

      Page.prototype.show = function(path, state, dispatch, push) {
        var ctx = new Context(path, state, this),
          prev = this.prevContext;
        this.prevContext = ctx;
        this.current = ctx.path;
        if (false !== dispatch) this.dispatch(ctx, prev);
        if (false !== ctx.handled && false !== push) ctx.pushState();
        return ctx;
      };

      /**
       * Goes back in the history
       * Back should always let the current route push state and then go back.
       *
       * @param {string} path - fallback path to go back if no more history exists, if undefined defaults to page.base
       * @param {Object=} state
       * @api public
       */

      Page.prototype.back = function(path, state) {
        var page = this;
        if (this.len > 0) {
          var window = this._window;
          // this may need more testing to see if all browsers
          // wait for the next tick to go back in history
          hasHistory && window.history.back();
          this.len--;
        } else if (path) {
          setTimeout(function() {
            page.show(path, state);
          });
        } else {
          setTimeout(function() {
            page.show(page._getBase(), state);
          });
        }
      };

      /**
       * Register route to redirect from one path to other
       * or just redirect to another route
       *
       * @param {string} from - if param 'to' is undefined redirects to 'from'
       * @param {string=} to
       * @api public
       */
      Page.prototype.redirect = function(from, to) {
        var inst = this;

        // Define route from a path to another
        if ('string' === typeof from && 'string' === typeof to) {
          page.call(this, from, function(e) {
            setTimeout(function() {
              inst.replace(/** @type {!string} */ (to));
            }, 0);
          });
        }

        // Wait for the push state and replace it with another
        if ('string' === typeof from && 'undefined' === typeof to) {
          setTimeout(function() {
            inst.replace(from);
          }, 0);
        }
      };

      /**
       * Replace `path` with optional `state` object.
       *
       * @param {string} path
       * @param {Object=} state
       * @param {boolean=} init
       * @param {boolean=} dispatch
       * @return {!Context}
       * @api public
       */


      Page.prototype.replace = function(path, state, init, dispatch) {
        var ctx = new Context(path, state, this),
          prev = this.prevContext;
        this.prevContext = ctx;
        this.current = ctx.path;
        ctx.init = init;
        ctx.save(); // save before dispatching, which may redirect
        if (false !== dispatch) this.dispatch(ctx, prev);
        return ctx;
      };

      /**
       * Dispatch the given `ctx`.
       *
       * @param {Context} ctx
       * @api private
       */

      Page.prototype.dispatch = function(ctx, prev) {
        var i = 0, j = 0, page = this;

        function nextExit() {
          var fn = page.exits[j++];
          if (!fn) return nextEnter();
          fn(prev, nextExit);
        }

        function nextEnter() {
          var fn = page.callbacks[i++];

          if (ctx.path !== page.current) {
            ctx.handled = false;
            return;
          }
          if (!fn) return unhandled.call(page, ctx);
          fn(ctx, nextEnter);
        }

        if (prev) {
          nextExit();
        } else {
          nextEnter();
        }
      };

      /**
       * Register an exit route on `path` with
       * callback `fn()`, which will be called
       * on the previous context when a new
       * page is visited.
       */
      Page.prototype.exit = function(path, fn) {
        if (typeof path === 'function') {
          return this.exit('*', path);
        }

        var route = new Route(path, null, this);
        for (var i = 1; i < arguments.length; ++i) {
          this.exits.push(route.middleware(arguments[i]));
        }
      };

      /**
       * Handle "click" events.
       */

      /* jshint +W054 */
      Page.prototype.clickHandler = function(e) {
        if (1 !== this._which(e)) return;

        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        if (e.defaultPrevented) return;

        // ensure link
        // use shadow dom when available if not, fall back to composedPath()
        // for browsers that only have shady
        var el = e.target;
        var eventPath = e.path || (e.composedPath ? e.composedPath() : null);

        if(eventPath) {
          for (var i = 0; i < eventPath.length; i++) {
            if (!eventPath[i].nodeName) continue;
            if (eventPath[i].nodeName.toUpperCase() !== 'A') continue;
            if (!eventPath[i].href) continue;

            el = eventPath[i];
            break;
          }
        }

        // continue ensure link
        // el.nodeName for svg links are 'a' instead of 'A'
        while (el && 'A' !== el.nodeName.toUpperCase()) el = el.parentNode;
        if (!el || 'A' !== el.nodeName.toUpperCase()) return;

        // check if link is inside an svg
        // in this case, both href and target are always inside an object
        var svg = (typeof el.href === 'object') && el.href.constructor.name === 'SVGAnimatedString';

        // Ignore if tag has
        // 1. "download" attribute
        // 2. rel="external" attribute
        if (el.hasAttribute('download') || el.getAttribute('rel') === 'external') return;

        // ensure non-hash for the same path
        var link = el.getAttribute('href');
        if(!this._hashbang && this._samePath(el) && (el.hash || '#' === link)) return;

        // Check for mailto: in the href
        if (link && link.indexOf('mailto:') > -1) return;

        // check target
        // svg target is an object and its desired value is in .baseVal property
        if (svg ? el.target.baseVal : el.target) return;

        // x-origin
        // note: svg links that are not relative don't call click events (and skip page.js)
        // consequently, all svg links tested inside page.js are relative and in the same origin
        if (!svg && !this.sameOrigin(el.href)) return;

        // rebuild path
        // There aren't .pathname and .search properties in svg links, so we use href
        // Also, svg href is an object and its desired value is in .baseVal property
        var path = svg ? el.href.baseVal : (el.pathname + el.search + (el.hash || ''));

        path = path[0] !== '/' ? '/' + path : path;

        // strip leading "/[drive letter]:" on NW.js on Windows
        if (hasProcess && path.match(/^\/[a-zA-Z]:\//)) {
          path = path.replace(/^\/[a-zA-Z]:\//, '/');
        }

        // same page
        var orig = path;
        var pageBase = this._getBase();

        if (path.indexOf(pageBase) === 0) {
          path = path.substr(pageBase.length);
        }

        if (this._hashbang) path = path.replace('#!', '');

        if (pageBase && orig === path && (!isLocation || this._window.location.protocol !== 'file:')) {
          return;
        }

        e.preventDefault();
        this.show(orig);
      };

      /**
       * Handle "populate" events.
       * @api private
       */

      Page.prototype._onpopstate = (function () {
        var loaded = false;
        if ( ! hasWindow ) {
          return function () {};
        }
        if (hasDocument && document.readyState === 'complete') {
          loaded = true;
        } else {
          window.addEventListener('load', function() {
            setTimeout(function() {
              loaded = true;
            }, 0);
          });
        }
        return function onpopstate(e) {
          if (!loaded) return;
          var page = this;
          if (e.state) {
            var path = e.state.path;
            page.replace(path, e.state);
          } else if (isLocation) {
            var loc = page._window.location;
            page.show(loc.pathname + loc.search + loc.hash, undefined, undefined, false);
          }
        };
      })();

      /**
       * Event button.
       */
      Page.prototype._which = function(e) {
        e = e || (hasWindow && this._window.event);
        return null == e.which ? e.button : e.which;
      };

      /**
       * Convert to a URL object
       * @api private
       */
      Page.prototype._toURL = function(href) {
        var window = this._window;
        if(typeof URL === 'function' && isLocation) {
          return new URL(href, window.location.toString());
        } else if (hasDocument) {
          var anc = window.document.createElement('a');
          anc.href = href;
          return anc;
        }
      };

      /**
       * Check if `href` is the same origin.
       * @param {string} href
       * @api public
       */
      Page.prototype.sameOrigin = function(href) {
        if(!href || !isLocation) return false;

        var url = this._toURL(href);
        var window = this._window;

        var loc = window.location;

        /*
           When the port is the default http port 80 for http, or 443 for
           https, internet explorer 11 returns an empty string for loc.port,
           so we need to compare loc.port with an empty string if url.port
           is the default port 80 or 443.
           Also the comparition with `port` is changed from `===` to `==` because
           `port` can be a string sometimes. This only applies to ie11.
        */
        return loc.protocol === url.protocol &&
          loc.hostname === url.hostname &&
          (loc.port === url.port || loc.port === '' && (url.port == 80 || url.port == 443)); // jshint ignore:line
      };

      /**
       * @api private
       */
      Page.prototype._samePath = function(url) {
        if(!isLocation) return false;
        var window = this._window;
        var loc = window.location;
        return url.pathname === loc.pathname &&
          url.search === loc.search;
      };

      /**
       * Remove URL encoding from the given `str`.
       * Accommodates whitespace in both x-www-form-urlencoded
       * and regular percent-encoded form.
       *
       * @param {string} val - URL component to decode
       * @api private
       */
      Page.prototype._decodeURLEncodedURIComponent = function(val) {
        if (typeof val !== 'string') { return val; }
        return this._decodeURLComponents ? decodeURIComponent(val.replace(/\+/g, ' ')) : val;
      };

      /**
       * Create a new `page` instance and function
       */
      function createPage() {
        var pageInstance = new Page();

        function pageFn(/* args */) {
          return page.apply(pageInstance, arguments);
        }

        // Copy all of the things over. In 2.0 maybe we use setPrototypeOf
        pageFn.callbacks = pageInstance.callbacks;
        pageFn.exits = pageInstance.exits;
        pageFn.base = pageInstance.base.bind(pageInstance);
        pageFn.strict = pageInstance.strict.bind(pageInstance);
        pageFn.start = pageInstance.start.bind(pageInstance);
        pageFn.stop = pageInstance.stop.bind(pageInstance);
        pageFn.show = pageInstance.show.bind(pageInstance);
        pageFn.back = pageInstance.back.bind(pageInstance);
        pageFn.redirect = pageInstance.redirect.bind(pageInstance);
        pageFn.replace = pageInstance.replace.bind(pageInstance);
        pageFn.dispatch = pageInstance.dispatch.bind(pageInstance);
        pageFn.exit = pageInstance.exit.bind(pageInstance);
        pageFn.configure = pageInstance.configure.bind(pageInstance);
        pageFn.sameOrigin = pageInstance.sameOrigin.bind(pageInstance);
        pageFn.clickHandler = pageInstance.clickHandler.bind(pageInstance);

        pageFn.create = createPage;

        Object.defineProperty(pageFn, 'len', {
          get: function(){
            return pageInstance.len;
          },
          set: function(val) {
            pageInstance.len = val;
          }
        });

        Object.defineProperty(pageFn, 'current', {
          get: function(){
            return pageInstance.current;
          },
          set: function(val) {
            pageInstance.current = val;
          }
        });

        // In 2.0 these can be named exports
        pageFn.Context = Context;
        pageFn.Route = Route;

        return pageFn;
      }

      /**
       * Register `path` with callback `fn()`,
       * or route `path`, or redirection,
       * or `page.start()`.
       *
       *   page(fn);
       *   page('*', fn);
       *   page('/user/:id', load, user);
       *   page('/user/' + user.id, { some: 'thing' });
       *   page('/user/' + user.id);
       *   page('/from', '/to')
       *   page();
       *
       * @param {string|!Function|!Object} path
       * @param {Function=} fn
       * @api public
       */

      function page(path, fn) {
        // <callback>
        if ('function' === typeof path) {
          return page.call(this, '*', path);
        }

        // route <path> to <callback ...>
        if ('function' === typeof fn) {
          var route = new Route(/** @type {string} */ (path), null, this);
          for (var i = 1; i < arguments.length; ++i) {
            this.callbacks.push(route.middleware(arguments[i]));
          }
          // show <path> with [state]
        } else if ('string' === typeof path) {
          this['string' === typeof fn ? 'redirect' : 'show'](path, fn);
          // start [options]
        } else {
          this.start(path);
        }
      }

      /**
       * Unhandled `ctx`. When it's not the initial
       * popstate then redirect. If you wish to handle
       * 404s on your own use `page('*', callback)`.
       *
       * @param {Context} ctx
       * @api private
       */
      function unhandled(ctx) {
        if (ctx.handled) return;
        var current;
        var page = this;
        var window = page._window;

        if (page._hashbang) {
          current = isLocation && this._getBase() + window.location.hash.replace('#!', '');
        } else {
          current = isLocation && window.location.pathname + window.location.search;
        }

        if (current === ctx.canonicalPath) return;
        page.stop();
        ctx.handled = false;
        isLocation && (window.location.href = ctx.canonicalPath);
      }

      /**
       * Escapes RegExp characters in the given string.
       *
       * @param {string} s
       * @api private
       */
      function escapeRegExp(s) {
        return s.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1');
      }

      /**
       * Initialize a new "request" `Context`
       * with the given `path` and optional initial `state`.
       *
       * @constructor
       * @param {string} path
       * @param {Object=} state
       * @api public
       */

      function Context(path, state, pageInstance) {
        var _page = this.page = pageInstance || page;
        var window = _page._window;
        var hashbang = _page._hashbang;

        var pageBase = _page._getBase();
        if ('/' === path[0] && 0 !== path.indexOf(pageBase)) path = pageBase + (hashbang ? '#!' : '') + path;
        var i = path.indexOf('?');

        this.canonicalPath = path;
        var re = new RegExp('^' + escapeRegExp(pageBase));
        this.path = path.replace(re, '') || '/';
        if (hashbang) this.path = this.path.replace('#!', '') || '/';

        this.title = (hasDocument && window.document.title);
        this.state = state || {};
        this.state.path = path;
        this.querystring = ~i ? _page._decodeURLEncodedURIComponent(path.slice(i + 1)) : '';
        this.pathname = _page._decodeURLEncodedURIComponent(~i ? path.slice(0, i) : path);
        this.params = {};

        // fragment
        this.hash = '';
        if (!hashbang) {
          if (!~this.path.indexOf('#')) return;
          var parts = this.path.split('#');
          this.path = this.pathname = parts[0];
          this.hash = _page._decodeURLEncodedURIComponent(parts[1]) || '';
          this.querystring = this.querystring.split('#')[0];
        }
      }

      /**
       * Push state.
       *
       * @api private
       */

      Context.prototype.pushState = function() {
        var page = this.page;
        var window = page._window;
        var hashbang = page._hashbang;

        page.len++;
        if (hasHistory) {
            window.history.pushState(this.state, this.title,
              hashbang && this.path !== '/' ? '#!' + this.path : this.canonicalPath);
        }
      };

      /**
       * Save the context state.
       *
       * @api public
       */

      Context.prototype.save = function() {
        var page = this.page;
        if (hasHistory) {
            page._window.history.replaceState(this.state, this.title,
              page._hashbang && this.path !== '/' ? '#!' + this.path : this.canonicalPath);
        }
      };

      /**
       * Initialize `Route` with the given HTTP `path`,
       * and an array of `callbacks` and `options`.
       *
       * Options:
       *
       *   - `sensitive`    enable case-sensitive routes
       *   - `strict`       enable strict matching for trailing slashes
       *
       * @constructor
       * @param {string} path
       * @param {Object=} options
       * @api private
       */

      function Route(path, options, page) {
        var _page = this.page = page || globalPage;
        var opts = options || {};
        opts.strict = opts.strict || _page._strict;
        this.path = (path === '*') ? '(.*)' : path;
        this.method = 'GET';
        this.regexp = pathToRegexp_1(this.path, this.keys = [], opts);
      }

      /**
       * Return route middleware with
       * the given callback `fn()`.
       *
       * @param {Function} fn
       * @return {Function}
       * @api public
       */

      Route.prototype.middleware = function(fn) {
        var self = this;
        return function(ctx, next) {
          if (self.match(ctx.path, ctx.params)) {
            ctx.routePath = self.path;
            return fn(ctx, next);
          }
          next();
        };
      };

      /**
       * Check if this route matches `path`, if so
       * populate `params`.
       *
       * @param {string} path
       * @param {Object} params
       * @return {boolean}
       * @api private
       */

      Route.prototype.match = function(path, params) {
        var keys = this.keys,
          qsIndex = path.indexOf('?'),
          pathname = ~qsIndex ? path.slice(0, qsIndex) : path,
          m = this.regexp.exec(decodeURIComponent(pathname));

        if (!m) return false;

        delete params[0];

        for (var i = 1, len = m.length; i < len; ++i) {
          var key = keys[i - 1];
          var val = this.page._decodeURLEncodedURIComponent(m[i]);
          if (val !== undefined || !(hasOwnProperty.call(params, key.name))) {
            params[key.name] = val;
          }
        }

        return true;
      };


      /**
       * Module exports.
       */

      var globalPage = createPage();
      var page_js = globalPage;
      var default_1 = globalPage;

    page_js.default = default_1;

    return page_js;

    })));
    });

    /* src\App.svelte generated by Svelte v3.47.0 */

    const { console: console_1, document: document_1 } = globals;

    const file = "src\\App.svelte";

    // (120:37) 
    function create_if_block_2(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_3, create_else_block];
    	const if_blocks = [];

    	function select_block_type_1(ctx, dirty) {
    		if (/*gameProps*/ ctx[0] == null) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type_1(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type_1(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(120:37) ",
    		ctx
    	});

    	return block;
    }

    // (118:30) 
    function create_if_block_1(ctx) {
    	let games_1;
    	let current;
    	games_1 = new Games({ props: { games }, $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(games_1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(games_1, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(games_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(games_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(games_1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(118:30) ",
    		ctx
    	});

    	return block;
    }

    // (116:3) {#if page === "home"}
    function create_if_block(ctx) {
    	let web;
    	let current;
    	web = new Web({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(web.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(web, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(web.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(web.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(web, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(116:3) {#if page === \\\"home\\\"}",
    		ctx
    	});

    	return block;
    }

    // (124:4) {:else}
    function create_else_block(ctx) {
    	let section;
    	let t;
    	let sectionbreak;
    	let current;

    	section = new Section({
    			props: {
    				top: false,
    				bottom: true,
    				bg: theme.bgColors.primary,
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	sectionbreak = new SectionBreak({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(section.$$.fragment);
    			t = space();
    			create_component(sectionbreak.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(section, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(sectionbreak, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const section_changes = {};

    			if (dirty & /*$$scope, gameProps*/ 129) {
    				section_changes.$$scope = { dirty, ctx };
    			}

    			section.$set(section_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(section.$$.fragment, local);
    			transition_in(sectionbreak.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(section.$$.fragment, local);
    			transition_out(sectionbreak.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(section, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(sectionbreak, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(124:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (122:4) {#if gameProps == null}
    function create_if_block_3(ctx) {
    	let t_value = window.location.replace(`${url}/games`) + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(122:4) {#if gameProps == null}",
    		ctx
    	});

    	return block;
    }

    // (125:5) <Section        top={false}        bottom={true}        bg={theme.bgColors.primary}       >
    function create_default_slot_1(ctx) {
    	let gameshowcase;
    	let current;
    	const gameshowcase_spread_levels = [/*gameProps*/ ctx[0], { fullPage: true }];
    	let gameshowcase_props = {};

    	for (let i = 0; i < gameshowcase_spread_levels.length; i += 1) {
    		gameshowcase_props = assign(gameshowcase_props, gameshowcase_spread_levels[i]);
    	}

    	gameshowcase = new GameShowcase({
    			props: gameshowcase_props,
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(gameshowcase.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(gameshowcase, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const gameshowcase_changes = (dirty & /*gameProps*/ 1)
    			? get_spread_update(gameshowcase_spread_levels, [get_spread_object(/*gameProps*/ ctx[0]), gameshowcase_spread_levels[1]])
    			: {};

    			gameshowcase.$set(gameshowcase_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(gameshowcase.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(gameshowcase.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(gameshowcase, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(125:5) <Section        top={false}        bottom={true}        bg={theme.bgColors.primary}       >",
    		ctx
    	});

    	return block;
    }

    // (99:1) <Modal    styleWindow={{     boxShadow: "0 2px 5px 0 rgba(0, 0, 0, 0.15)",     width: "1200px",     background: theme.bgColors.primary,     color: "white",    }}    styleCloseButton={{     cursor: "pointer",     margin: "10px",    }}   >
    function create_default_slot(ctx) {
    	let splash;
    	let t;
    	let main;
    	let current_block_type_index;
    	let if_block;
    	let current;
    	splash = new Splash({ $$inline: true });
    	const if_block_creators = [create_if_block, create_if_block_1, create_if_block_2];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*page*/ ctx[1] === "home") return 0;
    		if (/*page*/ ctx[1] === "games") return 1;
    		if (/*page*/ ctx[1] === "gameShowcase") return 2;
    		return -1;
    	}

    	if (~(current_block_type_index = select_block_type(ctx))) {
    		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	}

    	const block = {
    		c: function create() {
    			create_component(splash.$$.fragment);
    			t = space();
    			main = element("main");
    			if (if_block) if_block.c();
    			add_location(main, file, 114, 2, 2864);
    		},
    		m: function mount(target, anchor) {
    			mount_component(splash, target, anchor);
    			insert_dev(target, t, anchor);
    			insert_dev(target, main, anchor);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].m(main, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if (~current_block_type_index) {
    					if_blocks[current_block_type_index].p(ctx, dirty);
    				}
    			} else {
    				if (if_block) {
    					group_outros();

    					transition_out(if_blocks[previous_block_index], 1, 1, () => {
    						if_blocks[previous_block_index] = null;
    					});

    					check_outros();
    				}

    				if (~current_block_type_index) {
    					if_block = if_blocks[current_block_type_index];

    					if (!if_block) {
    						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    						if_block.c();
    					} else {
    						if_block.p(ctx, dirty);
    					}

    					transition_in(if_block, 1);
    					if_block.m(main, null);
    				} else {
    					if_block = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(splash.$$.fragment, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(splash.$$.fragment, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(splash, detaching);
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(main);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].d();
    			}
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(99:1) <Modal    styleWindow={{     boxShadow: \\\"0 2px 5px 0 rgba(0, 0, 0, 0.15)\\\",     width: \\\"1200px\\\",     background: theme.bgColors.primary,     color: \\\"white\\\",    }}    styleCloseButton={{     cursor: \\\"pointer\\\",     margin: \\\"10px\\\",    }}   >",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let t;
    	let div;
    	let modal;
    	let current;
    	let mounted;
    	let dispose;

    	modal = new Modal({
    			props: {
    				styleWindow: {
    					boxShadow: "0 2px 5px 0 rgba(0, 0, 0, 0.15)",
    					width: "1200px",
    					background: theme.bgColors.primary,
    					color: "white"
    				},
    				styleCloseButton: { cursor: "pointer", margin: "10px" },
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			t = space();
    			div = element("div");
    			create_component(modal.$$.fragment);
    			attr_dev(div, "class", "wrapper background svelte-1c9mxrs");
    			add_location(div, file, 97, 0, 2529);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    			insert_dev(target, div, anchor);
    			mount_component(modal, div, null);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(document_1.body, "viewportchanged", /*updateIconSize*/ ctx[2], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			const modal_changes = {};

    			if (dirty & /*$$scope, page, gameProps*/ 131) {
    				modal_changes.$$scope = { dirty, ctx };
    			}

    			modal.$set(modal_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(modal.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(modal.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(div);
    			destroy_component(modal);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let gameTitle = {};
    	let gameProps = null;

    	function updateIconSize() {
    		if (svelteViewportInfo.Width < 576) {
    			iconSize.update(() => 48);
    		} else {
    			iconSize.update(() => 64);
    		}
    	}

    	updateIconSize();

    	onMount(() => {
    		documentLoaded = true;
    	});

    	let firstLoad = true;
    	let documentLoaded = false;

    	function scrollToTop() {
    		const main = document.querySelector("main");
    		const navbar = document.querySelector(".navbar");

    		if (documentLoaded && navbar && main && !firstLoad) {
    			// elem.scrollIntoView({ behavior: "smooth" });
    			const yOffset = -navbar.offsetHeight;

    			const y = main.getBoundingClientRect().top + window.pageYOffset + yOffset;
    			window.scrollTo({ top: y, behavior: "smooth" });
    		} else {
    			firstLoad = false;
    		}
    	}

    	let page$1 = "";

    	// Routes
    	page("/", () => {
    		$$invalidate(1, page$1 = "home");
    		setTimeout(scrollToTop, 10);
    	});

    	page("/games", () => {
    		$$invalidate(1, page$1 = "games");
    		setTimeout(scrollToTop, 10);
    	});

    	// Game showcase
    	page(
    		"/games/:game",
    		(ctx, next) => {
    			// If game parameter matches object in store list, load props
    			gameTitle = ctx.params.game;

    			$$invalidate(0, gameProps = games.find(gameObj => {
    				let cleanTitle = gameObj.title.split(" ").join("").toLowerCase();
    				return cleanTitle === gameTitle;
    			}));

    			console.log("props", gameProps);
    			next();
    		},
    		() => $$invalidate(1, page$1 = "gameShowcase")
    	);

    	// 404 redirect
    	page("/*", () => {
    		$$invalidate(1, page$1 = "home");
    		scrollToTop();
    	});

    	page.start();
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Splash,
    		Web,
    		Games,
    		GameShowcase,
    		Section,
    		Modal,
    		SectionBreak,
    		games,
    		url,
    		theme,
    		gameTitle,
    		gameProps,
    		Viewport: svelteViewportInfo,
    		iconSize,
    		updateIconSize,
    		onMount,
    		firstLoad,
    		documentLoaded,
    		scrollToTop,
    		router: page,
    		page: page$1
    	});

    	$$self.$inject_state = $$props => {
    		if ('gameTitle' in $$props) gameTitle = $$props.gameTitle;
    		if ('gameProps' in $$props) $$invalidate(0, gameProps = $$props.gameProps);
    		if ('firstLoad' in $$props) firstLoad = $$props.firstLoad;
    		if ('documentLoaded' in $$props) documentLoaded = $$props.documentLoaded;
    		if ('page' in $$props) $$invalidate(1, page$1 = $$props.page);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [gameProps, page$1, updateIconSize];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    // import App from './TestPage.svelte';


    const app = new App({
    	target: document.body,
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map

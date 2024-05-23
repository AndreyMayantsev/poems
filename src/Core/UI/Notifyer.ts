import { Notify } from 'quasar'

export enum NotifyTypes {
    ERROR,
    WARNING,
    INFO,
    QUESTION
}

export function show_informer(message_text: string) {
    Notify.create({
        icon: 'done',
        type: 'positive',
        message: message_text
    })
}

export function show_warning(message_text: string) {
    Notify.create({
        icon: 'warning',
        type:'warning',
        message: message_text
    })
}

export function show_error(message_text: string) {
    Notify.create({
        icon: 'error',
        type:'negative',
        message: message_text
    })
}

function structNotify(messages: any) {
    try {
        let _messages = JSON.parse(messages);
        let _message: string = "";
        if(typeof _messages === "string") {
            return _messages
        }
        for(let message in _messages) {
            _message = _message + " " + _messages[message]; 
        }
        return _message;
    } catch {
        return messages + " ";
    }
}

export function showNotifyToast(NotifyType: NotifyTypes, message: any) {
    switch(NotifyType) {
        case NotifyTypes.ERROR: {
            show_error(structNotify(message));
            break;
        }
        case NotifyTypes.WARNING: {
            show_warning(structNotify(message));
            break;
        }
        case NotifyTypes.INFO: {
            show_informer(structNotify(message));
            break;
        }
        case NotifyTypes.QUESTION: {
            break;
        }
    }
}
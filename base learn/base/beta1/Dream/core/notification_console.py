from tkinter import *
from tkinter import Listbox

import time
import threading
import json
import sys


class NotificationManager:
    def __init__(self, file_path):
        self.file_path = file_path
        self.notification_container = {}
        self.run_notification_window = True
        self.focus_out = False
        self.list_box_count = 1
        self.message_count = 1

        self.notification_window = Tk()
        self.notification_window.title("Notification Window.")
        self.notification_window.geometry('900x600')
        self.notification_window.bind('<FocusOut>', self.focusout_event_handle)
        self.notification_window.bind('<FocusIn>', self.focusin_event_handle)
        self.notification_window.protocol("WM_DELETE_WINDOW", self.on_closing)

        self.list_box_height = 15
        self.list_box_width = 160
        self.list_box = Listbox(self.notification_window, bg='black', fg='white', width=self.list_box_width,
                                height=self.list_box_height, yscrollcommand=True, selectmode=SINGLE)
        self.list_box.bind('<<ListboxSelect>>', self.select_event_handle)

        self.message_height = 26
        self.message_width = 114
        self.message = Text(self.notification_window, bg='black', fg='white', width=self.message_width,
                            height=self.message_height, yscrollcommand=True)

    def on_closing(self):
        self.run_notification_window = False

    def focusout_event_handle(self, evt):
        self.focus_out = True

    def focusin_event_handle(self, evt):
        self.focus_out = False

    def insert_listbox(self, text):
        self.list_box.insert(self.list_box_count, text)
        self.list_box_count += 1

    def insert_message(self, text):
        self.message.insert(INSERT, text + "\n")

    def select_event_handle(self, evt):
        value = self.list_box.get(self.list_box.curselection())
        object_notification = self.headerize('Content', self.message_width)

        self.message.delete('1.0', END)
        self.insert_message(object_notification)
        if "[Email-Notification]" in value:
            self.insert_message(self.notification_container[value])

    def convert_email_object(self, email_object):
        final_result = []
        for email in email_object:
            result = ""
            result += "date: " + email['header']['date'] + ' - ' + "from: " + email['header'][
                    'from'] + ' - ' + "subject: " + email['header']['subject']
            final_result.append([result, email['content']])

        return final_result

    def count_timeout(self):
        start_point = 0
        while self.run_notification_window:
            start_point = time.time()
            while self.focus_out:
                current_point = time.time()
                if current_point - start_point > 10:
                    self.run_notification_window = False
                    break

    def insert_notification(self):
        with open(self.file_path, "r") as f:
            background_notifications = json.loads(f.read())
            f.close()

        for object_notification, values in background_notifications.items():
            if object_notification == 'email':
                values = self.convert_email_object(values)
            object_notification = self.headerize(object_notification, self.list_box_width)
            self.insert_listbox(object_notification)
            for value in values:
                value_notification = str(self.list_box_count) + '. [Email-Notification] ' + value[0]
                self.notification_container[value_notification] = value[1]
                self.insert_listbox(value_notification)

    def open_notification_window(self):
        self.list_box.pack()
        self.message.pack()
        while self.run_notification_window:
            try:
                self.list_box.update_idletasks()
                self.list_box.update()
            except:
                break

        self.notification_window.destroy()

    def close_notification_window(self):
        self.run_notification_window = False

    def headerize(self, text, console_length, dash='-'):
        if text:
            text_length = len(text)
            remaining_places = int(console_length) - text_length
            if remaining_places > 0:
                return dash * (remaining_places // 2 - 1) + ' ' + text + ' ' + dash * (remaining_places // 2 - 1)
        else:
            return dash * int(console_length)

def run():
    notification_manager_console = NotificationManager(sys.argv[1])
    notification_manager_console.insert_notification()
    thread = threading.Thread(target=notification_manager_console.count_timeout)
    thread.daemon = True
    thread.start()
    notification_manager_console.open_notification_window()


if __name__ == '__main__':
    run()
from tkinter import *
from tkinter import Listbox
import threading
import time
import json
import os


class SubConsoleManager:
    def __init__(self):
        self.notification_container = {}
        self.sub_window = Tk()
        self.sub_window.title("AutoRun Messages.")
        self.sub_window.geometry('750x400')

        self.list_box_height = 25
        self.list_box_width = 124
        self.list_box = Listbox(self.sub_window, bg='black', fg='white', width=self.list_box_width,
                                height=self.list_box_height, yscrollcommand=True, selectmode=EXTENDED)
        self.list_box.bind('<<ListboxSelect>>', self.event_handle)
        self.list_box_count = 0

    def event_handle(self, evt):
        print(evt)
        values = [(idx, self.list_box.get(idx)) for idx in self.list_box.curselection()]
        for value in values:
            print(value)

    def insert_notification(self):
        utils_dir = os.path.dirname(__file__)
        with open(utils_dir + "\\background_notifications.txt", "r") as f:
            background_notifications = json.loads(f.read())

        for object_notification, values in background_notifications.items():
            object_notification = self.headerize(object_notification)
            self.list_box.insert(self.list_box_count, object_notification)
            for value in values:
                value_notification = str(self.list_box_count) + '. ' + value
                self.list_box.insert(self.list_box_count, value_notification)
                self.list_box_count += 1
            self.list_box_count += 1

    def open_sub_window(self):
        self.list_box.pack()
        self.run_sub_window = True
        while self.run_sub_window:
            self.list_box.update_idletasks()
            self.list_box.update()

        sw.sub_window.destroy()

    def headerize(self, text, dash='-'):
        if text:
            text_length = len(text)
            remaining_places = int(self.list_box_width) - text_length
            if remaining_places > 0:
                return dash * (remaining_places // 2 - 1) + ' ' + text + ' ' + dash * (remaining_places // 2 - 1)
        else:
            return dash * int(terminal_length)


sw = SubConsoleManager()
sw.insert_notification()
sw.open_sub_window()
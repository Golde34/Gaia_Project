import hashlib
import os

from core.domain.constants import Constants


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in Constants.FileExtensions.ALLOWED_EXTENSIONS

def compute_file_hash(file):
    # Đặt lại vị trí của stream file về đầu
    file.stream.seek(0)
    hasher = hashlib.sha256()
    for chunk in iter(lambda: file.stream.read(4096), b""):
        hasher.update(chunk)
    file.stream.seek(0)
    return hasher.hexdigest()

def get_file_size(file):
    # Đặt lại vị trí của stream file về đầu
    file.stream.seek(0, os.SEEK_END)
    size = file.stream.tell()
    file.stream.seek(0)
    return size
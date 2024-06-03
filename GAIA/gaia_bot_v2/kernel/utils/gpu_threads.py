import torch
import threading

# Hàm kiểm tra dung lượng bộ nhớ GPU
def check_gpu_memory(threshold=0.9):
    total_memory = torch.cuda.get_device_properties(0).total_memory
    reserved_memory = torch.cuda.memory_reserved(0)
    allocated_memory = torch.cuda.memory_allocated(0)
    free_memory = reserved_memory - allocated_memory

    if free_memory / total_memory < (1 - threshold):
        return False
    return True

# Hàm giải phóng bộ nhớ GPU
def clear_gpu_memory():
    torch.cuda.empty_cache()

# Hàm inference model
def inference(model, input_data):
    if not check_gpu_memory():
        print("GPU memory is not enough, holding the next model")
        return
    try:
        response = model(input_data)
        print(response)  # Chỉ in ra phản hồi từ mô hình
    except RuntimeError as e:
        print(f"RuntimeError: {e}")
        clear_gpu_memory()
        raise

# Ví dụ sử dụng threading để chạy nhiều model
def run_models_in_parallel(models, input_data):
    threads = []
    for model in models:
        thread = threading.Thread(target=inference, args=(model, input_data))
        threads.append(thread)
        thread.start()

    for thread in threads:
        thread.join()

# Giả sử bạn đã load các mô hình của mình vào danh sách models
models = [model1, model2, model3]  # Thay bằng các mô hình thực tế của bạn
input_data = ...  # Dữ liệu đầu vào

run_models_in_parallel(models, input_data)

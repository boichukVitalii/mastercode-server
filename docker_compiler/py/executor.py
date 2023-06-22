import json
import os
from time import perf_counter_ns

RESULT_FILE_PATH = os.path.join('result', 'result.txt')
solver = __import__('solution').solver

with open('testcasesInputs.json', 'r') as f:
    inputs = json.load(f)

with open('testcasesOutputs.json', 'r') as f:
    outputs = json.load(f)


def validate(inputs, outputs):
    inval = list(inputs.values())
    outval = list(outputs.values())
    for i in range(len(inval)):
        start_time = perf_counter_ns()
        result = solver(inval[i])
        end_time = perf_counter_ns()
        time_in_ms = (end_time - start_time) / 1000000.0
        if str([result]) != str(outval[i]):  # true != [true]
            print(str(result))
            print(str(outval[i]))
            data = f"Wrong answer - Input: {inval[i]} | Expected output: {outval[i]}\n{time_in_ms}"
            with open(RESULT_FILE_PATH, 'w') as f:
                f.write(data)
            return
    with open(RESULT_FILE_PATH, 'w') as f:
        f.write(f"Accepted\n{time_in_ms}")
    return


validate(inputs, outputs)

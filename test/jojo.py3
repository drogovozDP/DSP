import math

def f(x):
    return 1 / (math.exp(x) * x)

def stop(x):
    if f(x) < 0.000000001: 
        return False
    else: return True

counting = 1
x = 1
F = 0
dx = 0.0001
result = 0
end = 0

while stop(x):
    end += 1
    x += dx

for i in range(0, end):
    F = (f(i * dx + 1) + f(i * dx + 1 + dx)) / 2 
    result += F * dx
    
print(result)

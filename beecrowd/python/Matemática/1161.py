def fatorial(n):
    x=1
    for i in range(1,n+1):

        x*=i
    return  x

while True:
    try:
        a,b=map(int,input().split())


        print(fatorial(a)+fatorial(b))
        
    except EOFError:
        break
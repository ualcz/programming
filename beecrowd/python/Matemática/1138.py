while True:
    lista=[0,0,0,0,0,0,0,0,0,0]
    a ,b = map(int, input().split())
    if a==0 and b==0:
        break

    for i in range(a, b+1):
        if '0' in str(i):
            lista[1] += str(i).count('1')
        if '1' in  str(i):
            lista[1]+=1
        if '2' in str(i):
            lista[2]+=1
        if '3' in str(i):
            lista[3]+=1
        if '4' in str(i):
            lista[4]+=1
        if '5' in str(i):
            lista[5]+=1
        if '6' in str(i):
            lista[6]+=1
        if '7' in str(i):
            lista[7]+=1
        if '8' in str(i):
            lista[8]+=1
        if '9' in str(i):
            lista[9]+=1
    for i in range(10):
        print(f'{lista[i]} ', end='')
    print('')





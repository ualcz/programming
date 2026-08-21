while True:
    n=int(input())
    lista=[]
    discarded = ''
    inicio = 0  
    if n==0:
        break

    for i in range(1,n+1):
        lista.append(i)

    while len(lista) - inicio > 1:

        discarded += ' '+str(lista[inicio])+','
        inicio += 1

        lista.append(lista[inicio])
        inicio += 1

    sobrevivente = lista[inicio]

    print('Discarded cards:'+discarded[:-1])
    print('Remaining card:',sobrevivente)

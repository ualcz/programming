def mege_sort(lista, ordem=None):
    if len(lista)<=1:
        return lista
    meio=len(lista)//2

    esquerda=mege_sort(lista[:meio],ordem)
    direita=mege_sort(lista[meio:],ordem)
    if ordem=='crescente':
        return merge_c(esquerda,direita)
    
    return merge_d(esquerda,direita)

def merge_d(esquerda,direita):
    resultado=[]
    i=j=0
    while i<len(esquerda) and j<len(direita):
        if esquerda[i]>direita[j]:
            resultado.append(esquerda[i])
            i+=1

        else:
            resultado.append(direita[j])
            j+=1

    resultado+=esquerda[i:]
    resultado+=direita[j:]

    return resultado

def merge_c(esquerda,direita):
    resultado=[]
    i=j=0
    while i<len(esquerda) and j<len(direita):
        if esquerda[i]<direita[j]:
            resultado.append(esquerda[i])
            i+=1

        else:
            resultado.append(direita[j])
            j+=1

    resultado+=esquerda[i:]
    resultado+=direita[j:]

    return resultado

listaPares=[]
listaImpares=[]
casos=int(input())
for i in range(casos):
    n=int(input())
    if n%2==0:
        listaPares.append(n)
    else:
        listaImpares.append(n)

lista=mege_sort(listaPares,ordem='crescente')+mege_sort(listaImpares,ordem='decrescente')

for i in lista:
    print(i)


n=int(input())
valores = list(map(int, input().split()))
minimo = min(valores)
posicao = valores.index(minimo)
print(f'Menor valor: {minimo}')
print(f'Posicao: {posicao}')


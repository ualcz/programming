# Lê a quantidade de casos de teste
n = int(input())

for _ in range(n):
    num = int(input())
    
    # Casos base tratados direto para evitar processamento
    if num == 0:
        print("fib(0) = 0 calls = 0")
    elif num == 1:
        print("fib(1) = 0 calls = 1")
    else:
        # Criamos tabelas para guardar os resultados de 0 até o 'num'
        fib = [0] * (num + 1)
        calls = [0] * (num + 1)
        
        # Configura os valores iniciais conhecidos
        fib[0], fib[1] = 0, 1
        calls[0], calls[1] = 0, 0
        
        # Preenche a tabela passo a passo até chegar no número desejado
        for i in range(2, num + 1):
            fib[i] = fib[i - 1] + fib[i - 2]
            calls[i] = calls[i - 1] + calls[i - 2] + 2
            
        print(f"fib({num}) = {calls[num]} calls = {fib[num]}")

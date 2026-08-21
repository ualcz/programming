casos = int(input())

for _ in range(casos):
    X = input()
    minas_abertas = 0
    diamantes = 0
    
    for caractere in X:
        if caractere == '<':
        
            minas_abertas += 1
        elif caractere == '>' and minas_abertas > 0:
           
            diamantes += 1
            minas_abertas -= 1
            
    print(diamantes)

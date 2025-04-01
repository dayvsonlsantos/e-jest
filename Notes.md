- Testes unitários devem sem 100% offline, sem depender de conexões externas;

- Mocks -> Simular um teste, mockando o resultando que esperamos;

- Stubs -> Usados para simular cenários de conexões externas, simulando os possíveis estados da API;

- Spies -> Usados para inspecionar quantas vezes uma função foi chamada e conferir se os parâmetros estão corretos nessas chamadas.

- Faketimers -> Podemos simular como o tempo está passando na máquina, sem aguardar esse tempo

- Code coverage -> Metrica que usamos para definir numa execução de projeto, qual código realmente está sendo usado, ideal para saber qual linha ainda falta ser testada. Mas cuidado, pois não mostra os possíveis erros ou validações pendentes em sua aplicação.

- End to End -> Testes de ponta a ponta, validam a aplicação do ponto de vista do usuário

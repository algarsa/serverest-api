/// <reference types="cypress" />

describe('Products api', () => {
    context('GET /produtos?nome=caneca', () => {
        it('Deve retornar produto Caneca QA', () => {
            cy.request({
                method: 'GET',
                url: 'https://serverest.dev/produtos?nome=caneca'
            })
                .then((response) => {
                    cy.log(JSON.stringify(response.body));
                    expect(response.status).to.be.equal(200);
                    expect(response.body.produtos[0]).is.not.empty;
                    expect(response.body.produtos[0]).to.have.all.keys(
                        'nome', 'preco', 'descricao', 'quantidade', '_id'
                    );
                    expect(response.body.produtos[0].nome).to.eq("Caneca QA");
                    expect(response.body.produtos[0].preco).to.eq(200);
                    expect(response.body.produtos[0].descricao).to.eq("Caneca preta G");
                    expect(response.body.produtos[0].quantidade).to.eq(200);
                    expect(response.body.produtos[0]._id).to.eq("GQ1k9yiHEQsJjaDk");
                })
        });

        it('Deve retornar lista de produtos', () => {
            cy.request({
                method: 'GET',
                url: 'https://serverest.dev/produtos'
            })
                .then((response) => {
                    cy.log(JSON.stringify(response.body));
                    expect(response.status).to.be.equal(200);
                    expect(response.body.produtos[0]).is.not.empty;
                    expect(response.body.produtos[0]).length.to.be.greaterThan(1)
                })
        });

        it('Não Deve retornar nenhum produto', () => {
            cy.request({
                method: 'GET',
                url: 'https://serverest.dev/produtos?nome=notebook'
            })
                .then((response) => {
                    cy.log(JSON.stringify(response.body));
                    expect(response.status).to.be.equal(200);
                    expect(response.body.produtos[0]).length.to.be.empty
                })
        });

    });
});
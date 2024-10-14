describe('Pruebas de la tienda de eCommerce', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false; // Ignorar excepciones no capturadas
    });
  
    beforeEach(() => {
      cy.visit('https://mitiendagt.netlify.app/');
    });
  
    it('Verificar que los enlaces del menú principal están visibles', () => {
      cy.get('nav.main-navigation a')
        .should('have.length', 5)
        .and('be.visible')
        .each(link => {
          cy.wrap(link).should('have.attr', 'href').and('not.be.empty'); // Verifica que cada enlace tenga un href
        });
    });
  
    it('Ir al botón de Productos y verificar que los productos están visibles', () => {
      cy.get('nav.main-navigation a').contains('Productos').click();
  
      cy.get('#productos').within(() => {
        cy.get('#zapatos').should('exist').and('be.visible'); 
        cy.get('#camisas').should('exist').and('be.visible');
        cy.get('#pantalones').should('exist').and('be.visible');
      });
    });
  
    it('Ir a la sección de Ofertas y verificar que los productos están visibles', () => {
      // Hacer clic en el enlace de Ofertas
      cy.get('nav.main-navigation a').contains('Ofertas').click();
  
      // Esperar que la sección de ofertas esté visible
      cy.get('#ofertas').should('be.visible');
  
     
      cy.wait(2000); // Espera 2 segundos
  
      // Verifica que las secciones de productos están visibles
      cy.get('#ofertas').within(() => {
        // Verifica que los productos en oferta sean visibles
        cy.get('.product') // Asegúrate de que este selector sea el correcto
          .should('have.length.greaterThan', 0) // Debe haber al menos un producto
          .each(product => {
            cy.wrap(product).should('be.visible'); // Verificar que cada producto sea visible
          });
      });
    });
  
    it('Verificar la información de contacto y métodos de pago', () => {
      cy.contains('Teléfono').should('exist');
      cy.contains('+123 456 789').should('exist');
      cy.contains('Email').should('exist'); // Verifica que el email esté presente
      cy.contains('contacto@mitienda.com').should('exist'); // Verifica que el email esté correcto
  
      cy.get('.payment-info i').should('have.length.greaterThan', 0);
    });
  
    it('Verificar la presencia del mapa de ubicación', () => {
      cy.get('iframe').should('have.attr', 'src').and('include', 'google.com/maps');
    });
  
    it('Verificar que el botón "Realizar Compra" en el carrito está presente', () => {
      cy.get('nav.main-navigation a').contains('Carrito').click();
      cy.get('.cart-container').should('exist'); // Verifica que la página del carrito esté cargada
  
      cy.contains('Realizar Compra').should('be.visible');
    });
  
    it('Verificar el formulario de inicio de sesión', () => {
      cy.get('nav.main-navigation a').contains('Mi Cuenta').click();
  
      cy.get('form').should('be.visible');
      cy.get('input#username').should('exist').and('be.visible'); // Verifica que el campo de usuario esté visible
      cy.get('input#password').should('exist').and('be.visible'); // Verifica que el campo de contraseña esté visible
    });
  });
  
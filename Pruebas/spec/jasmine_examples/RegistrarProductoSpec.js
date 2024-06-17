// Especificaciones para la función de registro de productos
describe("Registrar productos disponibles", function() {
  beforeEach(function() {
    // Crear mock para el sistema de inventario
    const newLocal = this.inventory = new InventoryMock();
  });

  it("registra un producto con éxito", function() {
    // Datos de prueba
    const producto = {
      nombre: "Producto 1",
      descripcion: "Descripción del producto 1",
      cantidad: 10
    };

    // Invocar la función de registro de productos
    registerProduct(producto);

    // Verificar que el producto se haya registrado correctamente
    expect(this.inventory.getProducts()).toContain(producto);
  });

  it("registra varios productos con éxito", function() {
    // Datos de prueba
    const productos = [
      {
        nombre: "Producto 1",
        descripcion: "Descripción del producto 1",
        cantidad: 10
      },
      {
        nombre: "Producto 2",
        descripcion: "Descripción del producto 2",
        cantidad: 5
      }
    ];

    // Invocar la función de registro de productos para cada producto
    productos.forEach(producto => registerProduct(producto));

    // Verificar que todos los productos se hayan registrado correctamente
    const productosRegistrados = this.inventory.getProducts();
    expect(productosRegistrados.length).toBe(productos.length);
    productosRegistrados.forEach(productoRegistrado => {
      expect(productos).toContain(productoRegistrado);
    });
  });

  it("lanza un error si el producto no tiene nombre", function() {
    // Datos de prueba
    const producto = {
      descripcion: "Descripción del producto 1",
      cantidad: 10
    };

    // Invocar la función de registro de productos
    expect(() => registerProduct(producto)).toThrowError(new Error("Producto invalido"));
  });

  it("error el producto no tiene precio", function() {
    // Datos de prueba
    const producto = {
      nombre: "Producto 1",
      cantidad: 10
    };

    // Invocar la función de registro de productos
    expect(() => registerProduct(producto)).toThrowError(new Error("Producto invalido"));
  });
});

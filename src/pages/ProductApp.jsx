import { useState } from "react";
import { Button, Input, Label, Switch, Card, CardContent } from "../components/ui";


export default function ProductApp() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [product, setProduct] = useState({ name: "", description: "", price: "", available: false });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({ ...product, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      const updatedProducts = [...products];
      updatedProducts[editIndex] = { ...product, price: parseFloat(product.price) };
      setProducts(updatedProducts.sort((a, b) => a.price - b.price));
      setIsEditing(false);
    } else {
      setProducts([...products, { ...product, price: parseFloat(product.price) }].sort((a, b) => a.price - b.price));
    }

    setProduct({ name: "", description: "", price: "", available: false });
    setShowForm(false);
  };

  const handleEdit = (index) => {
    setProduct(products[index]);
    setIsEditing(true);
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      {showForm ? (
        <Card>
          <CardContent>
            <h2 className="text-xl font-bold mb-4">{isEditing ? "Editar Produto" : "Cadastrar Produto"}</h2>
            <form onSubmit={handleSubmit}>
              <Label>Nome do Produto</Label>
              <Input name="name" value={product.name} onChange={handleChange} required />

              <Label>Descrição</Label>
              <Input name="description" value={product.description} onChange={handleChange} required />

              <Label>Valor</Label>
              <Input name="price" type="number" value={product.price} onChange={handleChange} required />

              <Label>Disponível para venda</Label>
              <Switch name="available" checked={product.available} onChange={handleChange} />

              <Button type="submit" className="mt-4 w-full">
                Salvar
              </Button>
              <Button onClick={() => setShowForm(false)} className="mt-2 w-full" variant="outline">
                Cancelar
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Lista de Produtos</h2>
              <Button onClick={() => setShowForm(true)}>+ Novo Produto</Button>
            </div>
            <ul>
              {products.map((prod, index) => (
                <li key={index} className="border-b py-2 flex justify-between items-center">
                  <div>
                    <span className="font-bold">{prod.name}</span> - R$ {prod.price.toFixed(2)}
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => handleEdit(index)} variant="outline">
                      Editar
                    </Button>
                    <Button onClick={() => handleDelete(index)} variant="outline">
                      Excluir
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

import { Button, Input, Select, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Flex } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useDispatch , useSelector} from 'react-redux';
import { addProduct, displayProduct } from '../Redux/action';
import Dropzone from 'react-dropzone';

function MainDashboard() {
  const dispatch=  useDispatch()

  let state = useSelector((state)=>state.products);
  console.log("state",state)

  const [image , setImage] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [productData, setProductData] = useState({
    image:'',
    productName: '',
    productDescription: '',
    gender: '',
    category: '',
    price: '',
  });

  const handleInputChange = (e) => {
    const { name, value  } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddProduct = async () => {
    try {
      const response = await fetch('https://mock2json.onrender.com/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
     
      }) .then(response => response.json())
      .then(data => {
        console.log('Data created:', data);
        dispatch(addProduct(data));
        getProducts();
        
      })

    } catch (error) {
      console.error('Error adding product:', error);
      
    }
  };



  const [products, setProducts] = useState([]);

  const getProducts =  () => {
    fetch('https://mock2json.onrender.com/products')
      .then(response => response.json())
      .then(data => { 
        setProducts(data)
        dispatch(displayProduct(data))
    })
      .catch(error => console.error('Error fetching products:', error));
  }
  
//   useEffect(() => {
//     getProducts();
//   }, []);



  const [currentPage, setCurrentPage] = useState(1);
  const [genderFilter, setGenderFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortBy, setSortBy] = useState('asc'); // Default to ascending

  const productsPerPage = 10;
  const startIndex = (currentPage - 1) * productsPerPage;

//   const fetchProducts = () => {
//     const queryParams = new URLSearchParams({
//       _start: startIndex,
//       _limit: productsPerPage,
//       _sort: sortBy === 'asc' ? 'price' : 'price&_order=desc',
//       gender: genderFilter,
//       category: categoryFilter,
//       q: searchTerm,
//     });


//     console.log("queryparams",queryParams)
//     fetch(`http://localhost:5000/products?${queryParams}`)
//       .then(response => response.json())
//       .then(data => {
//         setProducts(data);
//         dispatch(displayProduct(data));
//       })
//       .catch(error => console.error('Error fetching products:', error));
//   };

  useEffect(() => {
    // fetchProducts();
    getProducts();
    
  }, []);

//   const totalPages = Math.ceil(products.length / productsPerPage);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };


  const handleDeleteProduct = async (productId) => {
    try {
      await fetch(`https://mock2json.onrender.com/products/${productId}`, {
        method: 'DELETE',
      });
      
      // Update the product list in the state after deleting
      const updatedProducts = products.filter((product) => product.id !== productId);
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };


  const filterhandleInputChange = (e) => {
    const { value } = e.target;
    if (value === 'Male' || value === 'Female') {
      fetch(`https://mock2json.onrender.com/products?gender=${value}`)
        .then((response) => response.json())
        .then((data) => {
          setProducts(data);
        })
        .catch((error) => console.error('Error fetching filtered products:', error));
    } else {
        setProducts(state);
    }
  };

  const handlesorting = (e) => {
    const { value } = e.target;
    console.log("order", value)
    fetch(`https://mock2json.onrender.com/products?_sort=price&_order=${value}`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error('Error fetching sorted products:', error));
  };


  const filterCategoryhandleInputChange = (e) => {
    const { value } = e.target;
    if (value === 'Shirts' || value === 'Jeans' || value === 'Trousers' || value === 'Suits') {
      fetch(`https://mock2json.onrender.com/products?category=${value}`)
        .then((response) => response.json())
        .then((data) => {
          setProducts(data);
        })
        .catch((error) => console.error('Error fetching filtered products:', error));
    } else {
      // Reset the category filter and fetch all products
      setCategoryFilter('');
      fetchProducts();
    }
  };
  
  
  const totalPages = Math.ceil(products.length / productsPerPage);

  const [page, setPage] = useState(1);
  const handleNextPage = () => {
    if (page < totalPages) {
        setPage((page)=> page + 1);
    }
  };
  
  const handlePrevPage = () => {
    if (page < totalPages) {
        setPage((page)=> page -1);
    }
  };
  
 

  const fetchProducts = (page) => {
  
    fetch(`https://mock2json.onrender.com/products?_limit=10?_page=${page}`)
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        dispatch(displayProduct(data));
      })
      .catch(error => console.error('Error fetching products:', error));
  };

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts(page)
    searchProduct();
  }, [currentPage, genderFilter, categoryFilter, sortBy, searchTerm, page]);
  



  const searchProduct = () => {
  
    console.log("search term", searchTerm)

      fetch(`https://mock2json.onrender.com/products?q=${searchTerm}`)
        .then((response) => response.json())
        .then((data) => {
            console.log("searchdata", data);
          setProducts(data);
          setCurrentPage(1); 
        })
        .catch((error) => console.error('Error fetching filtered products:', error));
    
  }

  const handleImageDrop = (acceptedFiles) => {
    console.log(acceptedFiles[0].name)
    setImage(acceptedFiles[0].name)
    console.log(image)

    setProductData((prevData) => ({
        ...prevData,
        image: image, // Add the image file to the product data
      }));
  }
  

  return (

    <>
    <div>
        <Flex>
      <Input placeholder='Search for Product' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} />
      <Select  onChange={filterhandleInputChange} name="gender" value={productData.gender}>
        <option value="">Filter by Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </Select>
      <Select placeholder='Filter by Category' onChange={filterCategoryhandleInputChange} name="category" value={productData.category}>
        <option value="Shirts">Shirts</option>
        <option value="Jeans">Jeans</option>
        <option value="Trousers">Trousers</option>
        <option value="Suits">Suits</option>
      
      </Select>
      <Select placeholder='Sort by Price' onChange={(e) => handlesorting(e)}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </Select>
      </Flex>




      <Button onClick={onOpen}>Add Product</Button>



      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              name="productName"
              placeholder="Product Name"
              value={productData.productName}
              onChange={handleInputChange}
            />
            <Input
              name="productDescription"
              placeholder="Product Description"
              value={productData.productDescription}
              onChange={handleInputChange}
            />
            <Select placeholder="Gender" name="gender" value={productData.gender} onChange={handleInputChange}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Select>
            <Select
                placeholder="Category"
                name="category"
                value={productData.category}
                onChange={handleInputChange}
                >
                {productData.gender === "Male" ? (
                    <>
                    <option value="Shirts">Shirts</option>
                    <option value="Jeans">Jeans</option>
                    <option value="Trousers">Trousers</option>
                    <option value="Suits">Suits</option>
                    </>
                ) : productData.gender === "Female" ? (
                    <>
                    <option value="Saree">Saree</option>
                    <option value="Kurti">Kurti</option>
                    <option value="Lehenga">Lehenga</option>
                    <option value="Jackets">Jackets</option>
                    </>
                ) : (
                    <option value="">Select Gender first</option>
                )}
                </Select>

            <Input
              name="price"
              type="number"
              placeholder="Price"
              value={productData.price}
              onChange={handleInputChange}
            />

<Dropzone onDrop={handleImageDrop} accept="image/*" multiple={false}>
    {({ getRootProps, getInputProps }) => (
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag 'n' drop an image here, or click to select one</p>
      </div>
    )}
  </Dropzone>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddProduct}>
              Add Product
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>

    {/* render Products */}

    <div>
      
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Product Description</th>
            <th>Gender</th>
            <th>Category</th>
            <th>Price</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td><img src={product.image}  /></td>
              <td>{product.productName}</td>
              <td>{product.productDescription}</td>
              <td>{product.gender}</td>
              <td>{product.category}</td>
              <td>${product.price}</td>
              <td><Button >Edit</Button></td>
              <td><Button onClick={() => handleDeleteProduct(product.id)}>Delete</Button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
          <Button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </Button>
        </div>
    </div>
    </>
  );
}

export default MainDashboard;

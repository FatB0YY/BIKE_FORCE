
import ListProducts from "../components/listProducts/ListProducts"
import Menu from "../components/modalAddProduct/ModalAddProduct";
const MainPage = ({setModalS}) => {
    return (
        <ListProducts setModalS={setModalS} />
    )
}

export default MainPage;
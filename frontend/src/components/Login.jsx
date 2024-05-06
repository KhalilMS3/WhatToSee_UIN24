
import { Link } from "react-router-dom"
import { FaUser } from "react-icons/fa";


export default function Login({setLoggedIn, user, setUser}) {


    const handlLogIn = () => {
        setLoggedIn(true)
        
    }
    console.log(user)
    return (
        <>
            <h2>Hei, hvem ser på?</h2>
            <section className="users">
                {user?.map((item, idx) => {
                    return (
                        <Link key={idx} onClick={handlLogIn}>
                            <FaUser /> {item.username}
                        </Link>
                    );
                })}
            </section>
        </>
    );
}


import { useState } from "react"
import { useRouter } from 'next/navigation'
import { useUserData } from "@/context/UserDataContext";
import "./style.css"
function Login() {
    const [userDetail, setUserDetail] = useState({ email: "", password: "" });
    const { setUserData } = useUserData()
    const router = useRouter()
    const handleChange = (e) => {
        const field = e.target.name;
        const val = e.target.value;
        setUserDetail((preState) => {
            return { ...preState, [field]: val }
        })
    }

    const handleSumbit = () => {
        fetch('https://interview.samajsaathi.com/api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDetail)
        }).then((res) => res.json())
            .then((data) => {
                localStorage.setItem('token', data.token);
                fetch('https://interview.samajsaathi.com/api/cart', {
                    headers: { Authorization: `Bearer ${data.token}` }
                }).then(resp => resp.json())
                    .then(json => 
                        {
                            json && setUserData({ type: "updateCart", payload: json })
                            router.push('/product')
                        }
                    )
                
            })
            .catch((err) => console.log("error is", err))
    }

    return (
        <div className="loginContainer">
            <div className="label">Email</div>
            <input onChange={handleChange} name="email" value={userDetail.email} />
            <div className="label">Password</div>
            <input onChange={handleChange} name="password" value={userDetail.password} />

            <button onClick={handleSumbit}>Submit</button>
        </div>
    )
}

export default Login
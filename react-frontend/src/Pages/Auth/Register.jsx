import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function Register() {
  const {setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [FormData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({});

  async function handleRegister(e) {
    e.preventDefault();
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(FormData),
    });

    const data = await res.json();

    if (data.errors) {
      setErrors(data.errors);
    } else {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      navigate("/");
    }
  }

  return (
    <>
      <h1 className="title">Register a new account</h1>

      <form onSubmit={handleRegister} className="w-1/2 mx-auto space-y-6">
        <div>
          <input
            type="text"
            name=""
            placeholder="Name"
            value={FormData.name}
            onChange={(e) => setFormData({ ...FormData, name: e.target.value })}
          />
          {errors.name && <p className="error">{errors.name[0]}</p>}
        </div>

        <div>
          <input
            type="text"
            name=""
            placeholder="Email"
            value={FormData.email}
            onChange={(e) =>
              setFormData({ ...FormData, email: e.target.value })
            }
          />
          {errors.email && <p className="error">{errors.email[0]}</p>}
        </div>

        <div>
          <input
            type="password"
            name=""
            placeholder="Password"
            value={FormData.password}
            onChange={(e) =>
              setFormData({ ...FormData, password: e.target.value })
            }
          />
          {errors.password && <p className="error">{errors.password[0]}</p>}
        </div>

        <div>
          <input
            type="password"
            name=""
            placeholder="Password Confirmation"
            value={FormData.password_confirmation}
            onChange={(e) =>
              setFormData({
                ...FormData,
                password_confirmation: e.target.value,
              })
            }
          />
        </div>

        <button type="submit" className="primary-btn">
          Register
        </button>
      </form>
    </>
  );
}

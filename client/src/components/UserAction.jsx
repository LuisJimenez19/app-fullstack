import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Swal from "sweetalert2";
import {
  avatarUserRequest,
  deleteUserRequest,
  updateUserRequest,
} from "../api/users";
import { getHash } from "../helpers/getHash";
import logo from "../media/img/corazon-roto.png";
import { toast } from "react-hot-toast";

function UserAction() {
  const navigate = useNavigate();
  const { user, setIsAuthenticated, setUser } = useAuth();
  const [optionAvatar, setOptionAvatar] = useState([]);

  const [avatarPreview, setAvatarPreview] = useState([0, ""]);
  useEffect(() => {
    avatarUserRequest().then((res) => {
      setOptionAvatar(res.data);
    });
  }, []);

  function handleDelete(id) {
    Swal.fire({
      title: "Advertencia",
      text: "¿Seguro que desea eliminar su cuenta?",
      icon: "warning",
      showDenyButton: true,
      denyButtonText: "Cancelar",
      denyButtonColor: "#ff234f",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#287834",
    }).then(async (res) => {
      if (res.isConfirmed) {
        try {
          const res = await deleteUserRequest(id);

          if (res.status === 200) {
            Swal.fire({
              text: "Cuenta eliminada correctamente",
              imageUrl: logo,
              imageWidth: 200,
              imageHeight: 200,
              imageAlt: "Custom image",
            });
            setIsAuthenticated(false);
            setUser({});
            return navigate("/register");
          }
        } catch (error) {
          Swal.fire({
            text: "Hubo un error",
            imageUrl: logo,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: "Custom image",
          });
        }
      }
    });
  }

  function handleAvatarPreview(e) {
    const selectedIndex = e.target.selectedIndex;
    const selectedOption = e.target.options[selectedIndex];

    const newAvatar = [selectedOption.id, e.target.value];

    setAvatarPreview(newAvatar);
  }

  async function handleUpdateAvatar() {
    const data = {
      default_url_id: avatarPreview[0],
    };

    const res = await updateUserRequest(user.id, data);
    /* Actualizo el estado global para que se vea reflejado los cambios */
    if (res.status === 200) {
      const newDataUser = {
        ...user,
        default_url: avatarPreview[1],
      };

      setUser(newDataUser);
      return toast.success("Avatar actualizado correctamente.");
    }
    toast.error("Ha ocurrido un error.");
  }

  return (
    <div className="profile-top">
      <h1 className="dashboard-title">
        Perfil de <b>{user.name}</b>{" "}
      </h1>
      <div className="profile-content-user">
        <header className="profile-header">
          <div className="profile-group">
            {avatarPreview[1] === "" ? (
              <img
                src={`https://www.gravatar.com/avatar/${getHash(
                  user.email
                )}?d=${user.default_url}`}
                alt="avatar"
                className="profile-avatar"
              />
            ) : (
              <img
                src={`https://www.gravatar.com/avatar/${getHash(
                  user.email
                )}?d=${avatarPreview[1]}`}
                alt="avatar"
                className="profile-avatar"
              />
            )}
            <div className="profile-group-data">
              <p className="user-name">{user.name}</p>
              <p className="user-email">{user.email}</p>
            </div>
          </div>
          <button
            onClick={() => handleDelete(user.id)}
            className="btn btn-delete-user"
            role="button"
            aria-label="Eliminar cuenta"
            aria-labelledby="Eliminar usuario"
          >
            Eliminar cuenta
          </button>
        </header>
        <div className="profile-select-container">
          {optionAvatar.length === 0 ? (
            "..."
          ) : (
            <div className="profile-select-avatar">
              <h3>Elige tu avatar.</h3>
              <div className="select-group">
                <select
                  //   value={user.default_url}
                  className="select"
                  onChange={handleAvatarPreview}
                >
                  {optionAvatar.map((option) => {
                    return (
                      <option
                        id={option.id}
                        className="option-avatar"
                        selected={option.default_url == user.default_url}
                        value={option.default_url}
                        key={option.id}
                        title={option.description}
                      >
                        {option.default_url}
                      </option>
                    );
                  })}
                </select>
              </div>
              {avatarPreview[1] === "" ||
              avatarPreview[1] == user.default_url ? (
                ""
              ) : (
                <button
                  role="button"
                  aria-label="Actualizar avatar"
                  aria-labelledby="Actualizar avatar"
                  onClick={handleUpdateAvatar}
                  className="btn btn-save-avatar"
                >
                  guardar
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export { UserAction };

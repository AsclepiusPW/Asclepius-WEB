//Importações
import { findProfileImage } from "../Services/UserServices";
import { portApi } from "../connection/axios"; 

//Imagem default para perfil
import profile from "../assets/UserDefault.jpg"

export const findUserProfileImage = async (profileImage: string) => {
    try {
        if (profileImage === "Image not registered") {
            return profile;
        };

        if (profileImage) {
            const response = await findProfileImage(profileImage);

            if (response?.status === 200) {
                return `${portApi}${profileImage}`;
            } else {
                return profile;
            }
        }
    } catch (error) {
        console.error("Error ao buscar a imagem do usuário: ", error);
    }
};
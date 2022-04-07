import image from "../../images/image-loading.gif";
import { ContainerLoading } from "./Loading.styles";

export default function Loading() {
  return (
    <ContainerLoading>
      <img src={image} alt="loading" />
    </ContainerLoading>
  );
}

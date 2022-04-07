import image from '../../images/image-notfound.gif'
import { ContainerNotFound } from './NotFound.styles'

function NotFound() {
  return (
    <ContainerNotFound>
      <h3>I think you confused Simon. Return to home page</h3>
      <img src={image} alt='Simon the cat' />
    </ContainerNotFound>
  )
}

export default NotFound
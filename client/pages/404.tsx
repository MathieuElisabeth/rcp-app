import { NextPage } from "next"
import Link from "next/link"
import { ActionButton, AuthContainer, AuthPage, NotFound, NotFound404 } from "../styles/GlobalStyles"


const Page404: NextPage = () => {
  return (
    <AuthPage>
      <NotFound>
        <NotFound404>
          <h1>
            4
            <span></span>
            4
          </h1>
        </NotFound404>
        <h2>Oops! Page introuvable</h2>
        <p>{"Désolé mais la page que vous recherchez n'existe pas, elle a été supprimée. le nom a changé ou est temporairement indisponible"}</p>
        <ActionButton>
          <Link href="/">
            {"Revenir à l'acceuil"}
          </Link>
        </ActionButton>
      </NotFound>
    </AuthPage>
  )
}

export default Page404
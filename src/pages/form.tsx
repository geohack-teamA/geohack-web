import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const Form: NextPage = () => {
  const FormPage = dynamic(() => import("@geohack/components/pages/Form"), {ssr: false})
  return(
    <FormPage/>
  )
}

export default Form
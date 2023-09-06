import "./Heading.css"

interface Iprops {
  type: string,
  text: string
}

const Heading: React.FC<Iprops> = (props) => {
  const { type, text } = props;
  return (
   <p className={`heading-${type}`}>
    {text}
   </p>
  )
}

export default Heading
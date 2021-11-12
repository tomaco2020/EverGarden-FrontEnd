import CardProduct from './CardProduct'

const CardList = (props) => {
  return (
    <div className='cardList'>
      {props.data.map(profile => <CardProduct profile={profile} key={profile.name}/>)}
    </div>
  )
}

export default CardList
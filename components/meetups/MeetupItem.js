import Link from "next/link";
import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";
import { useRouter } from "next/router";

function MeetupItem(props) {
  
  //programmatically Navigation by creating fun and passing through props on <button/>
  const router = useRouter();
  const ShowDetailsHandler = () => {
    router.push('/' + props.id); //id meetup list se as props aa raha hai 
  };
 
 
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
          <span>{props.eventdate}</span>
        </div>
        <div className={classes.actions}>
          {/* <Link href='/id'>
          <button>Show Details</button>
          </Link>  */}

          <button onClick={ShowDetailsHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;

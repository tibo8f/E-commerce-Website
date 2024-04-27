type NProp = {
  title: String;
  content: String;
  price: number;
  user: String;
  image: string;
};

export function CardArticle2(props: NProp) {
  return (
    <>
      <div className="border rounded-md shadow-lg max-w-sm overflow-hidden">
        <img
          src={props.image} // "images/avavav_boots.jpeg"
          alt="card-image"
          className="w-full"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{props.title}</div>
          <div className="text-gray-700 text-base">{props.content}</div>
          <p className="text-gray-900 leading-none">{props.user}</p>
          <div>${props.price}</div>
          <div className="pt-0">
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              //   onClick={submit}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* <Card className="w-96" placeholder={undefined}>
        <CardBody placeholder={undefined}>
          <div className="mb-2 flex items-center justify-between">
            <Typography
              color="blue-gray"
              className="font-medium"
              placeholder={undefined}
            ></Typography>
            <Typography
              color="blue-gray"
              className="font-medium"
              placeholder={undefined}
            ></Typography>
          </div>
          <Typography
            variant="small"
            color="gray"
            className="font-normal opacity-75"
            placeholder={undefined}
          ></Typography>
        </CardBody>
        <CardFooter className="pt-0" placeholder={undefined}>
          <Button
            ripple={false}
            fullWidth={true}
            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
            placeholder={undefined}
          >
            Add to Cart
          </Button>
        </CardFooter>
      </Card> */}
    </>
  );
}

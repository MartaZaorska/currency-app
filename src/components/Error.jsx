function Error({error}) {
  //console.log(error);
  return (
    <div className="error center">
      <div className="error__content">
        <p>Coś poszło nie tak...</p>
        <p>Spróbuj ponownie później</p>
      </div>
    </div>
  );
}

export default Error
function OfferInfo(props) {
  const { data } = props;
  return (
    <ul>
      {data.map((detail) => {
        const key = Object.keys(detail)[0];

        return (
          <li key={key}>
            <span>{key}</span>
            <span>{detail[key]}</span>
          </li>
        );
      })}
    </ul>
  );
}

export default OfferInfo;

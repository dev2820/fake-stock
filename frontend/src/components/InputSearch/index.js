import "../../components/InputSearch/InputSearch.css";

const InputSearch = (props) => {
  return (
    <div /*className="inputSearchDiv"*/>
      <input
        className="inputSearch"
        type="text"
        value={props.value}
        onChange={props.onChange}
        onKeyPress={props.onKeyPress}
        onKeyUp={props.onKeyUp}
        placeholder={props.placeholder}
        maxLength="20"
      />
    </div>
  );
};

export default InputSearch;

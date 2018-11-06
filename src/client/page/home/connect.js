import { connect } from "react-redux"
import { getNewsList } from "./store"

const mapStateToProps = (state) => {
  return {
    newsList:state.home.newsList
  }
}
const mapDispatchToProps = {
  getNewsList
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
/*
  steps:
  1. break into component hirachy
  2. build the static
  3. find the minimal but complete representation of UI state
  4. determine where state should live
  5. inverse data flow
*/

import CommentForm from "./components/commentForm/CommentForm";
import CommentList from "./components/commentList/CommentList";
import DialogBox from "./components/dialog/DialogBox";

// context
import { CommentsProvider } from "./contexts/CommentsContext";
import DialogProvider from "./contexts/DialogContext";

function App() {
  return (
    <main className="container">
      <h1 className="sr-only">comments</h1>
      <CommentsProvider>
        <DialogProvider>
          <CommentList />
          <CommentForm />
          <DialogBox />
        </DialogProvider>
      </CommentsProvider>
    </main>
  );
}

export default App;

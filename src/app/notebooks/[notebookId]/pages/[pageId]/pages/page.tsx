interface IPage {
  id?: number;
  title: string;
}

const notes = [
]

export default function Notebooks() {
  return (
    <div style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: 48}}>
      Pages of Page
    </div>
  );
}

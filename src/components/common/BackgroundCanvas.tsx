/* eslint-disable */
export const BackgroundCanvas = ({ children }: { children?: any }) => {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to right, #e8cbc0, #636fa4)',
        padding: '30px',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          padding: '30px',
        }}
      >
        {children}
      </div>
    </div>
  )
}

/* eslint-disable */
import bigLogo from '../../../public/logos/KopyShop_BIG.svg'

export const ProfileContent = ({ image, title, author }: any) => {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        height: '100%',
        width: '100%',
        maxWidth: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', marginTop: '5px', marginBottom: '5px' }}>
        {image && (
          <img
            style={{ objectFit: 'contain' }}
            alt="Vercel"
            height={550}
            src={image}
            width={450}
          />
        )}

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '48px',
          }}
        >
          {title && (
            <span
              style={{
                fontSize: '56px',
                color: 'white',
                paddingTop: '45px',
                fontFamily: "'Noto Sans', sans-serif",
                fontWeight: 700,
                maxWidth: 620,
              }}
            >
              {title}
            </span>
          )}
          {author && (
            <span
              style={{
                fontSize: '36px',
                color: 'white',
                fontFamily: "'Noto Sans', sans-serif",
                fontWeight: 500,
                marginTop: '50px',
              }}
            >
              {author}
            </span>
          )}
        </div>
      </div>
      <img
        src="https://i.imgur.com/2EwaxLX.png"
        style={{
          objectFit: 'contain',
          position: 'absolute',
          bottom: '-50px',
          right: '-40px',
        }}
        height={150}
        width={150}
      />
    </div>
  )
}

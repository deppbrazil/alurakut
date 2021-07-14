import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(properties) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${properties.githubUser}.png`} style={{ borderRadius: '8px' }} />      
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${properties.githubUser}`} >
          @{properties.githubUser}
        </a>
      </p>      
      <hr />
      
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home() {
  const myUser = 'deppbrazil';
  
  const [comunities, setComunities] = React.useState([{
    id: '1fdaua77afa',
    title: 'MINI Club',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);

  const favoritePerson = [
    'felipefialho',
    'omariosouto',
    'raphaelfabeni',
    'sibelius',
    'marcobrunodev',
    'thiagokpelo',
    'filipedeschamps',
  ]

  return (
    <>
      <AlurakutMenu />

      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={myUser} />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a) 
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCreateComunity(e) {
                e.preventDefault();              
                
                const dataContentForm = new FormData(e.target);

                // console.log('Input:', dataContentForm.get('title'));
                // console.log('Input:', dataContentForm.get('image'));

                const comunity = {
                  id: new Date().toISOString(),
                  title: dataContentForm.get('title'),
                  image: dataContentForm.get('image'),
                }

                const currentComunities = [...comunities, comunity];
                setComunities(currentComunities);
              }}
            >
              <div>
                <input
                  name="title"
                  type="text"
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                />
              </div>

              <div>
                <input
                  name="image"
                  placeholder="Coloque uma URL para usarmos de capa"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button>Criar Comunidade</button>
            </form>
          </Box>
        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({favoritePerson.length})
            </h2>

            <ul>
              {favoritePerson.map((currentItem) => {
                return (
                  <li key={currentItem}>
                    <a href={`/users/${currentItem}`}>
                      <img src={`https://github.com/${currentItem}.png`} />
                      <span>{currentItem}</span>
                    </a>
                  </li>
                )
              })}
            </ul>          
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunities.length})
            </h2>

            <ul>
              {comunities.map((currentItem) => {
                return (
                  <li  key={currentItem.id}>
                    <a href={`/users/${currentItem.title}`}>
                      <img src={currentItem.image} />
                      <span>{currentItem.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>          
          </ProfileRelationsBoxWrapper>
        </div>

      </MainGrid>
    </>
  )
}

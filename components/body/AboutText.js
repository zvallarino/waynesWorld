import Image from 'next/image'
import React from 'react'

function AboutText() {

    const studiedwith = [	
"Marshall Arisman (SVA), 1984",
"Max Ginsburg (SVA), 1980-1985",
"Irwin Greenberg (A&D), 1980-1983",
"Irvin Docktor (A&D), 1980-1983",	
,"Steve Assel (SVA), 1985"
    ]

    const education = [
"BFA, School of Visual Arts, New York, N.Y. 1987",
"The Art Students League of New York, N.Y. 1983"
    ]

    const exhibits = [
    "Kenny Gallery",
"Society of Illustrators",
"School of Visual Arts","Graphic Artist Gallery",
"Bread and Roses Gallery",
"Greenhouse Gallery of Fine Art"
    ]

    const awards = [
	"National Foundation For the Advancement in the Arts award for excellence",
	"New York Lung Association award for poster design",
	"Four year scholarship award, School of Visual Arts",
	"Graphic Art Society award for achievement"
    ]

     const renderList = (title, list) => (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <div className="flex flex-col gap-1">
        {list.map((item, idx) => (
          <div key={idx} className="pl-4">• {item}</div>
        ))}
      </div>
    </div>
  )


  return (
   <div className='flex flex-col w-full'>

        <div className='flex bg-amber-500 w-full h-1/3'>
            
            <div className='flex w-4/5 bg-red-400'>
           <div className='flex flex-col'>
           <div className='text-4xl my-4'>Wayne Bowen is an artist who, since the eighties, has studied to capture life in the form of realism. </div>
          <div className='text-2xl my-4'>Much of his work contrasts the stylistic and conceptual art forms of the eighties. His form of realism exemplifies itself in oils, watercolors, pen and ink, and pastels. While the artist appears to employ a basic academic approach, upon closer observation the colors and detail captivate and tell a story of their own. His colors are seductively light and soft, demanding attention and opinion. His meticulous approach to detail cannot be overlooked. It creates the backdrop for his life-like expressions.</div>
          <div className='text-2xl my-4'>Mr. Bowen's work is backed by organizations such as The National Foundation for the Advancement in the Arts and the School of Visual Arts Alumni Society. Many investors consider his work uniquely collectible.</div>
              </div>
           </div>
     <div className='flex w-1/5 bg-blue-400 relative'>
  <Image 
    src={`/images/categories/sketches2.jpg`}
    alt={`picture one`}
    fill
    className="object-fit"
  />
</div>
        </div>
     
    
         {renderList("Studied With", studiedwith)}
        {renderList("Education", education)}
        {renderList("Exhibits", exhibits)}
        {renderList("Awards", awards)}


        <h2 className="text-2xl font-bold mt-10 mb-2">Currently</h2>
      <p>The artist works out of his studio located in Westchester, New York. He currently freelances and attributes most of his recent notoriety to private collectors.</p>
   </div>
  )
}

export default AboutText
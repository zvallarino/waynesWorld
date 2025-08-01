import Image from 'next/image'
import React from 'react'

function AboutText() {

    const studiedwith = [
        "Marshall Arisman (SVA), 1984",
        "Max Ginsburg (SVA), 1980-1985",
        "Irwin Greenberg (A&D), 1980-1983",
        "Irvin Docktor (A&D), 1980-1983",
        "Steve Assel (SVA), 1985"
    ];

    const education = [
        "BFA, School of Visual Arts, New York, N.Y. 1987",
        "The Art Students League of New York, N.Y. 1983"
    ];

    const exhibits = [
        "Kenny Gallery",
        "Society of Illustrators",
        "School of Visual Arts",
        "Graphic Artist Gallery",
        "Bread and Roses Gallery",
        "Greenhouse Gallery of Fine Art"
    ];

    const awards = [
        "National Foundation For the Advancement in the Arts award for excellence",
        "New York Lung Association award for poster design",
        "Four year scholarship award, School of Visual Arts",
        "Graphic Art Society award for achievement"
    ];

    const renderList = (title, list) => (
        <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-3 pb-2 border-b border-gray-300">
                {title}
            </h3>
            <ul className="space-y-2 text-gray-700">
                {list.map((item, idx) => (
                    <li key={idx} className="pl-4">
                        <span className="mr-2">&bull;</span>{item}
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <div className='flex flex-col w-full max-w-7xl mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8'>

            {/* --- Top Section: Bio + Image --- */}
            {/* MODIFIED: Reduced gap on mobile for tighter stacking */}
            <div className='flex flex-col md:flex-row w-full gap-8 md:gap-12 items-center'>
                
                {/* Text Container */}
                <div className='w-full md:w-2/3'>
                    <div className='flex flex-col gap-6 text-left'>
                        {/* MODIFIED: Made the large text responsive to prevent cramping on mobile */}
                        {/* <p className='text-3xl md:text-4xl font-serif text-gray-900'>Wayne Bowen is an artist who, since the eighties, has studied to capture life in the form of realism.</p>
                        <p className='text-lg text-gray-600 leading-relaxed'>Much of his work contrasts the stylistic and conceptual art forms of the eighties. His form of realism exemplifies itself in oils, watercolors, pen and ink, and pastels. While the artist appears to employ a basic academic approach, upon closer observation the colors and detail captivate and tell a story of their own. His colors are seductively light and soft, demanding attention and opinion. His meticulous approach to detail cannot be overlooked. It creates the backdrop for his life-like expressions.</p>
                       <p className='text-lg text-gray-600 leading-relaxed'>Mr. Bowen&apos;s work is backed by organizations such as The National Foundation for the Advancement in the Arts and the School of Visual Arts Alumni Society. Many investors consider his work uniquely collectible.</p>
                         */}
                    
                        <p className='text-3xl md:text-4xl font-serif text-gray-900'>Wayne Bowen is an artist whose work is best described as contemporary realism in exhibiting compositions that execute inspiration drawn from the old masters. </p>
                        <p className='text-lg text-gray-600 leading-relaxed'>Bowen&apos;s figurative composition series, which focuses on urban conditions, compels the viewers to engage with the subjects and the reality that has been purposely exposed. He works in a variety of mediums ranging from oils, acrylics, and watercolors, to pastels, charcoal, pen and ink. The artist&apos;s palate is earthly, seductively light and soft, which is visible in his still life paintings- commanding attention and opinions.</p>
                       <p className='text-lg text-gray-600 leading-relaxed'>Backed by The National Foundation for Advancement in the Arts and the School of Visual Arts Alumni Society, Wayne Bowen has exhibited nationally, and his work is considered by many to be uniquely collectible.</p>
                        
                    </div>
                </div>

                {/* Image Container */}
                <div className='flex-shrink-0 w-full md:w-1/3 mt-8 md:mt-0'>
                    <div className='relative aspect-[4/5] shadow-xl'>
                        <Image
                            src={`/images/categories/stills.jpg`}
                            alt={`Wayne Bowen Artwork`}
                            fill
                            className="object-cover rounded-md"
                        />
                    </div>
                </div>
            </div>
            
            {/* --- Bottom Section: Lists --- */}
            {/* MODIFIED: Reduced vertical padding on mobile */}
            <div className='flex flex-col md:flex-row w-full text-black py-12 md:py-20 gap-8 md:gap-16'>
                <div className='w-full md:w-1/2 text-lg'>
                    {renderList("Studied With", studiedwith)}  
                    {renderList("Education", education)}
                </div>
                <div className='w-full md:w-1/2 text-lg'>
                    {renderList("Exhibits", exhibits)}
                    {renderList("Awards", awards)}
                </div>
            </div>
            
            {/* --- Currently Section --- */}
            <div className="w-full text-left">
                <h2 className="text-2xl font-bold mb-2 text-black">Currently</h2>
                <p className="text-lg text-gray-600">The artist works out of his studio located in Westchester, New York. He currently freelances and attributes most of his recent notoriety to private collectors.</p>
            </div>
        </div>
    )
}

export default AboutText;
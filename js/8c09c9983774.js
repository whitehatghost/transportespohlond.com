
// Spanish / English switch. The page is written in Spanish; EN maps each Spanish string to its English version.
// Static text nodes and attributes are swapped in place; the chat scripts call T() for their own strings.
(function () {
  var EN = {
    'Transportes Pohlond · Transporte y cargas especiales en el GAM': 'Transportes Pohlond · Transport and special cargo in Costa Rica’s GAM',
    'Demo preparado por': 'Demo prepared by',
    'Servicios': 'Services', 'Cómo trabajamos': 'How we work', 'Por qué Pohlond': 'Why Pohlond', 'Trabaje con nosotros': 'Work with us', 'Contacto': 'Contact',
    'Montacargas a bordo': 'Forklift on board',
    'Transporte y': 'Transport &', 'Cargas': 'Special', 'especiales': 'cargo', 'en el GAM': 'in the GAM',
    'Camiones con montacargas a bordo: cargamos, transportamos y descargamos': 'Trucks with a forklift on board: we load, haul and unload',
    'su mercadería': 'your goods', 'en Santa Ana y toda la Gran Área Metropolitana': 'in Santa Ana and the entire Greater Metropolitan Area',
    'Cotizar ahora': 'Get a quote', 'Empresa costarricense': 'Costa Rican company', 'Todo el GAM': 'The whole GAM', 'Se solicitan choferes': 'We’re hiring drivers',
    'Transporte de carga': 'Freight transport', 'Cargas especiales': 'Special cargo', 'Camión con montacargas': 'Truck with forklift', 'Entregas en el GAM': 'Deliveries in the GAM',
    'Maquinaria': 'Machinery', 'Materiales': 'Materials', 'Carga y descarga': 'Loading and unloading',
    'Lo que': 'What we', 'movemos': 'move', 'por usted': 'for you',
    'Desde mercadería y materiales hasta maquinaria y cargas delicadas, con el equipo adecuado para cada traslado en Santa Ana y todo el GAM.': 'From goods and materials to machinery and delicate loads, with the right equipment for every move in Santa Ana and across the GAM.',
    'Traslado de mercadería, materiales y equipo en camiones de plataforma, con la carga bien amarrada y protegida.': 'Goods, materials and equipment moved on flatbed trucks, with the load properly strapped and protected.',
    'Maquinaria, estructuras y cargas pesadas o delicadas que requieren planificación, camión con grúa y maniobras cuidadosas.': 'Machinery, structures and heavy or delicate loads that call for planning, a crane truck and careful handling.',
    'El montacargas viaja con el camión: cargamos, transportamos y descargamos en su sitio, sin esperar equipo de terceros.': 'The forklift rides with the truck: we load, haul and unload at your site, with no waiting for third-party equipment.',
    'Entregas dentro del GAM': 'Deliveries across the GAM',
    'Entregas en Santa Ana, San José y el resto de la Gran Área Metropolitana, coordinadas con usted de principio a fin.': 'Deliveries in Santa Ana, San José and the rest of the Greater Metropolitan Area, coordinated with you from start to finish.',
    'Llegamos con el montacargas a bordo, así su carga no espera equipo ni personal extra en ningún punto del recorrido.': 'We arrive with the forklift on board, so your load never waits for extra equipment or crew at any point of the trip.',
    'Cargamos': 'We load', 'Transportamos': 'We haul', 'Descargamos': 'We unload', 'Cotizar mi traslado': 'Quote my move',
    'Con el montacargas propio subimos la carga al camión, sin depender de equipo en el sitio de origen.': 'With our own forklift we put the load on the truck, without relying on equipment at the pickup site.',
    'La carga viaja amarrada y protegida, en la plataforma adecuada para su tamaño y peso, a cualquier punto del GAM.': 'The load travels strapped and protected, on the right flatbed for its size and weight, to any point in the GAM.',
    'Bajamos la carga donde usted la necesita, con montacargas o grúa. Menos tiempo y menos riesgo para su personal.': 'We set the load down where you need it, by forklift or crane. Less time and less risk for your staff.',
    'Día y noche': 'Day and night', 'Seguridad en': 'Safety in', 'cada movimiento': 'every move',
    'Cada traslado se planifica para que su carga llegue completa, a tiempo y sin riesgos innecesarios.': 'Every move is planned so your load arrives complete, on time and without unnecessary risk.',
    '¡Contáctenos!': 'Contact us!',
    // Immersive layer: film captions, kinetic type, word-by-word night headline, scroll story hint
    'Camión con grúa': 'Crane truck', 'Seguridad': 'Safety', 'en': 'in', 'cada': 'every', 'movimiento': 'move',
    'Desplácese para ver el recorrido': 'Scroll to follow the route',
    'Cargas delicadas': 'Delicate cargo', 'desde maquinaria hasta esculturas': 'anything from machinery to sculptures',
    'Frágil': 'Fragile', 'Esculturas': 'Sculptures', 'Vidrio': 'Glass', 'Contenedores': 'Containers',
    'Maquinaria, estructuras, esculturas y vidrio: cargas pesadas o delicadas que se mueven con planificación, camión con grúa y maniobras cuidadosas.': 'Machinery, structures, sculptures and glass: heavy or delicate loads moved with a plan, a crane truck and careful handling.',
    // "Lo que transportamos"
    'Lo que transportamos': 'What we move', 'Cada pieza llega': 'Every piece arrives', 'como salió': 'the way it left',
    'Cuando la carga es frágil, cada detalle cuenta: el embalaje, el amarre, la maniobra y la descarga.': 'When the load is fragile, every detail counts: the packing, the strapping, the lift and the drop-off.',
    'Esculturas y obras de arte': 'Sculptures and artwork',
    'Izadas con grúa y eslingas, con cada maniobra planificada para que lleguen intactas.': 'Lifted by crane on soft slings, every move planned so they arrive intact.',
    'Vidrio y piezas frágiles': 'Glass and fragile pieces',
    'Embalaje, amarre y manejo cuidadoso de principio a fin. Lo frágil viaja protegido.': 'Packed, strapped and handled with care from pickup to drop-off. Fragile travels protected.',
    'Maquinaria y equipo': 'Machinery and equipment', 'Montacargas a bordo. Grúa cuando la carga lo pide.': 'Forklift on board. A crane when the load calls for one.',
    'Mercadería y materiales': 'Goods and materials', 'Tarimas, cajas y materiales de obra, cargados y descargados en su sitio.': 'Pallets, crates and building materials, loaded and unloaded right on site.',
    'Estructuras y contenedores': 'Structures and containers',
    'Oficinas contenedor y estructuras de acero, colocadas con grúa donde usted las necesita.': 'Container offices and steel structures, set down by crane exactly where you need them.',
    'Escultura izada con grúa y eslingas': 'Sculpture lifted by crane on slings',
    'Montacargas Manitou asegurado sobre la plataforma del camión, de noche': 'Manitou forklift secured on the truck bed at night',
    'Su carga, en manos de': 'Your cargo, in the hands of', 'quien tiene el equipo': 'those with the right equipment',
    'Mover carga pesada sin el equipo correcto cuesta tiempo y pone en riesgo a su gente. Nosotros llegamos preparados.': 'Moving heavy loads without the right equipment costs time and puts your people at risk. We come prepared.',
    'Seguridad en la carga': 'Cargo safety',
    'Cada maniobra se planifica: amarre, protección de la mercadería y el equipo correcto para subirla y bajarla.': 'Every maneuver is planned: strapping, protecting the goods and the right equipment to load and unload them.',
    'Montacargas propio': 'Our own forklift',
    'El montacargas va en el camión. No depende de que haya equipo en el sitio de carga o de entrega.': 'The forklift travels on the truck. You don’t depend on equipment at the pickup or delivery site.',
    'Cobertura en el GAM': 'Coverage across the GAM', 'Trabajamos desde Santa Ana en toda la Gran Área Metropolitana.': 'From Santa Ana, we work throughout the Greater Metropolitan Area.',
    'Equipo': 'Equipment',
    'Síganos en': 'Follow us on', 'Ahí publicamos nuestros trabajos, consejos para mover su carga y las vacantes para choferes.': 'We post our jobs, tips for moving your cargo and driver openings there.',
    'Transporte y cargas especiales · Santa Ana': 'Transport and special cargo · Santa Ana', 'Seguir en Facebook': 'Follow on Facebook',
    'Cotizar': 'Quote', 'Cuéntenos qué': 'Tell us what you', 'necesita mover': 'need to move',
    'Llene estos datos y se abre WhatsApp con el mensaje listo. Le respondemos con la cotización.': 'Fill in these details and WhatsApp opens with the message ready. We’ll reply with your quote.',
    'Sin registros ni formularios largos.': 'No sign-ups or long forms.', 'Puede adjuntar fotos de la carga en el mismo chat.': 'You can attach photos of the load in the same chat.',
    'Si prefiere, escríbanos directo al 8983 8585.': 'Or message us directly at 8983 8585.',
    'Solicitud de cotización': 'Quote request', 'Tipo de carga': 'Type of cargo', 'Mercadería': 'Goods', 'Maquinaria o equipo': 'Machinery or equipment',
    'Materiales de construcción': 'Construction materials', 'Carga especial o delicada': 'Special or delicate cargo', 'Otro': 'Other',
    'Fecha aproximada': 'Approximate date', 'Dónde se recoge': 'Pickup location', 'Dónde se entrega': 'Delivery location', 'Detalles': 'Details',
    'Enviar por WhatsApp': 'Send via WhatsApp', 'Sus datos no se guardan en esta página; solo se pasan al mensaje de WhatsApp.': 'Your details aren’t stored on this page; they only go into the WhatsApp message.',
    'Se solicitan': 'We’re hiring', 'choferes': 'drivers',
    'Si tiene experiencia manejando camión y quiere trabajar dentro del GAM, envíenos sus documentos.': 'If you have truck-driving experience and want to work within the GAM, send us your documents.',
    'Licencias': 'Licenses', 'Licencia B1, B2 o B3 al día': 'Valid B1, B2 or B3 license', 'Currículum completo': 'Complete résumé',
    'Experiencia mínima de 2 a 4 años, según el puesto': 'At least 2 to 4 years of experience, depending on the position',
    'Hoja de delincuencia': 'Criminal record certificate', 'Lista de trabajos anteriores de la CCSS': 'CCSS employment history',
    '3 referencias laborales': '3 work references', 'Disponibilidad para trasladarse dentro del GAM': 'Available to travel within the GAM',
    'Suba aquí su currículum': 'Upload your résumé here', 'PDF, Word o foto. Arrástrelo o toque para elegirlo.': 'PDF, Word or photo. Drag it here or tap to choose.',
    'Enviar mi currículum por WhatsApp': 'Send my résumé via WhatsApp', 'También puede enviarlo a': 'You can also send it to',
    'Asistente de reclutamiento': 'Recruiting assistant', 'En línea': 'Online', 'Agente de IA': 'AI agent',
    'Vista previa del agente · en esta demo no se guarda ni se envía nada': 'Agent preview · nothing is stored or sent in this demo',
    'Cada solicitud le llega a Recursos Humanos ordenada en una ficha.': 'Every application reaches Human Resources organized in a profile card.',
    'Hablemos de su': 'Let’s talk about your', 'próximo traslado': 'next move',
    'Escríbanos por WhatsApp, por correo o en Facebook. Atendemos en toda la Gran Área Metropolitana.': 'Reach us on WhatsApp, by email or on Facebook. We serve the entire Greater Metropolitan Area.',
    'WhatsApp y teléfono': 'WhatsApp and phone', 'Escribir ahora →': 'Message now →', 'Ver página →': 'View page →', 'Correo': 'Email', 'Enviar correo →': 'Send email →',
    'Ubicación': 'Location', 'Trabajamos en todo el GAM': 'We work across the GAM',
    '¿Qué necesita': 'What do you need to', 'mover?': 'move?',
    'Cuéntenos la carga, dónde se recoge y dónde se entrega. Le respondemos con la cotización.': 'Tell us the cargo, where it’s picked up and where it goes. We’ll reply with your quote.',
    'O escríbanos al 8983 8585': 'Or message us at 8983 8585',
    '© 2026 Transportes Pohlond · Santa Ana, San José, Costa Rica': '© 2026 Transportes Pohlond · Santa Ana, San José, Costa Rica',
    'Asistente Pohlond': 'Pohlond Assistant', '¿Le ayudo a cotizar?': 'Need a quote?',
    'Transportes Pohlond, inicio': 'Transportes Pohlond, home', 'Principal': 'Main', 'Facebook de Transportes Pohlond': 'Transportes Pohlond on Facebook',
    'Escribir por WhatsApp al 8983 8585': 'Message us on WhatsApp at 8983 8585',
    'Camión Mack de Transportes Pohlond trasladando un montacargas y una cargadora': 'Transportes Pohlond Mack truck hauling a forklift and a loader',
    'Montacargas descargando una caja grande junto al camión': 'Forklift unloading a large crate next to the truck',
    'Camión de plataforma con carga amarrada y un montacargas a bordo': 'Flatbed truck with strapped cargo and a forklift on board',
    'Camión con grúa cargando estructuras de acero': 'Crane truck loading steel structures',
    'Camión con grúa de Transportes Pohlond entregando una oficina contenedor': 'Transportes Pohlond crane truck delivering a container office',
    'Montacargas cargando una caja grande': 'Forklift loading a large crate', 'Camión Mack trasladando un montacargas rojo': 'Mack truck hauling a red forklift',
    'Grúa articulada descargando en la plataforma del camión': 'Knuckle-boom crane unloading on the truck bed', 'Camión con grúa trabajando en un tajo': 'Crane truck working at a quarry',
    'Camión de Transportes Pohlond con grúa listo para salir': 'Transportes Pohlond crane truck ready to roll',
    'Ver publicación en Facebook': 'View post on Facebook',
    'Publicación: el equipo necesario para la carga y descarga': 'Post: the right equipment for loading and unloading',
    'Publicación: evite riesgos innecesarios al mover su mercancía': 'Post: avoid unnecessary risks when moving your goods',
    'Publicación: la mejor tecnología necesita el mejor talento humano': 'Post: the best technology needs the best people',
    'Ej.: próximo lunes': 'E.g.: next Monday', 'Ej.: Santa Ana': 'E.g.: Santa Ana', 'Ej.: Heredia': 'E.g.: Heredia',
    'Peso o medidas aproximadas, si necesita montacargas o grúa, etc.': 'Approximate weight or size, whether you need a forklift or crane, etc.',
    'Licencias aceptadas': 'Accepted licenses', 'Empezar de nuevo': 'Start over', 'Adjuntar currículum': 'Attach résumé', 'Escriba aquí…': 'Type here…',
    'Mensaje': 'Message', 'Enviar': 'Send', 'Asistente virtual de Transportes Pohlond': 'Transportes Pohlond virtual assistant', 'Cerrar': 'Close',
    'Adjuntar archivo': 'Attach file', 'Cerrar sugerencia': 'Dismiss tip', 'Abrir asistente': 'Open assistant', 'Idioma': 'Language',
    // WhatsApp prefilled messages
    'Hola, quiero cotizar un transporte': 'Hi, I’d like a quote for a transport job',
    'Hola, quiero aplicar como chofer': 'Hi, I’d like to apply as a driver',
    'Hola, quiero hablar con alguien de Transportes Pohlond': 'Hi, I’d like to talk to someone at Transportes Pohlond',
    // Dynamic strings (chat agents, dropzone, quote form)
    'Escribiendo…': 'Typing…', 'Volver al inicio': 'Back to start', 'Recibido: {f}': 'Received: {f}', '{s} · El asistente ya lo tiene.': '{s} · The assistant has it.',
    'Hola, quiero cotizar un transporte.': 'Hi, I’d like a quote for a transport job.', 'Tipo de carga: {v}': 'Type of cargo: {v}', 'Se recoge en: {v}': 'Pickup: {v}',
    'Se entrega en: {v}': 'Delivery: {v}', 'Fecha: {v}': 'Date: {v}', 'Detalles: {v}': 'Details: {v}',
    '¡Hola! Soy el asistente de reclutamiento de <b>Transportes Pohlond</b>.': 'Hi! I’m the recruiting assistant at <b>Transportes Pohlond</b>.',
    'Le hago unas preguntas rápidas y le paso su ficha a Recursos Humanos. Toma unos 2 minutos. ¿Cómo se llama?': 'I’ll ask you a few quick questions and pass your profile to Human Resources. It takes about 2 minutes. What’s your name?',
    'Nombre y apellido': 'First and last name', 'Mucho gusto, {n}. ¿Qué licencia de conducir tiene?': 'Nice to meet you, {n}. What driver’s license do you have?', 'Otra': 'Other',
    'Gracias por su interés. Por ahora buscamos choferes con licencia B1, B2 o B3, así que esta vez no puedo pasar su solicitud.': 'Thanks for your interest. Right now we’re looking for drivers with a B1, B2 or B3 license, so I can’t forward your application this time.',
    'Cuando abramos un puesto para su licencia lo publicaremos en nuestro Facebook. ¡Mucho éxito!': 'When we open a position for your license we’ll post it on our Facebook. Best of luck!',
    '¿Cuántos años de experiencia tiene manejando camión?': 'How many years have you been driving trucks?',
    'Menos de 2 años': 'Less than 2 years', 'De 2 a 4 años': '2 to 4 years', 'Más de 4 años': 'More than 4 years',
    'Le agradezco la sinceridad. Para este puesto pedimos al menos 2 años de experiencia manejando camión.': 'Thanks for being upfront. For this position we ask for at least 2 years of truck-driving experience.',
    'Le invitamos a aplicar de nuevo cuando la tenga. ¡Mucho éxito, {n}!': 'You’re welcome to apply again once you have it. Best of luck, {n}!',
    'Excelente. ¿En qué zona vive?': 'Great. Where do you live?', 'Ej.: Alajuelita': 'E.g.: Alajuelita',
    'Anotado. El trabajo es dentro del GAM. ¿Qué horario puede trabajar?': 'Got it. The job is within the GAM. What shift can you work?',
    'Diurno': 'Day', 'Nocturno': 'Night', 'Mixto': 'Mixed', 'Cualquiera': 'Any',
    '¿Cuál es su aspiración salarial mensual?': 'What monthly salary are you looking for?', 'Ej.: ₡450 000': 'E.g.: ₡450,000',
    '¿Tiene al día la hoja de delincuencia y la lista de trabajos anteriores de la CCSS?': 'Do you have an up-to-date criminal record certificate and your CCSS employment history?',
    'Sí, ambas': 'Yes, both', 'Me falta alguna': 'I’m missing one',
    'Ya tengo el currículum que subió: <b>{f}</b>.': 'I already have the résumé you uploaded: <b>{f}</b>.',
    'Por último, adjunte su currículum con el clip o en el recuadro de al lado. Puede ser PDF, Word o una foto.': 'Finally, attach your résumé with the clip or in the box next to this chat. It can be a PDF, Word file or a photo.',
    'Revisando su currículum…': 'Reviewing your résumé…',
    'Ficha para RH': 'HR profile card', 'Cumple requisitos': 'Meets requirements', 'Revisar documentos': 'Check documents',
    'Candidato': 'Candidate', 'Licencia': 'License', 'Experiencia': 'Experience', 'Zona': 'Area', 'Horario': 'Shift', 'Aspiración': 'Expected salary',
    'Documentos': 'Documents', 'Al día': 'Up to date', 'Pendientes': 'Pending', 'Currículum': 'Résumé',
    '¡Listo, {n}! Su ficha ya está con Recursos Humanos. Si avanza en el proceso, le escribimos por WhatsApp.': 'All set, {n}! Your profile is now with Human Resources. If you move forward in the process, we’ll message you on WhatsApp.',
    ' Mientras tanto, vaya sacando los documentos que le faltan.': ' Meanwhile, start getting the documents you’re missing.',
    '¡Hola! Soy el asistente virtual de <b>Transportes Pohlond</b>. ¿En qué le ayudo?': 'Hi! I’m the virtual assistant at <b>Transportes Pohlond</b>. How can I help?',
    'Cotizar un transporte': 'Get a transport quote', 'Trabajar como chofer': 'Work as a driver', 'Hablar con una persona': 'Talk to a person',
    '¡Qué bien! Le atiende nuestro asistente de reclutamiento: le hace unas preguntas y recibe su currículum.': 'Great! Our recruiting assistant will help you: it asks a few questions and takes your résumé.',
    'Ir a «Trabaje con nosotros»': 'Go to “Work with us”', 'Claro. Le comunico por WhatsApp con nuestro equipo.': 'Sure. I’ll connect you with our team on WhatsApp.',
    'Abrir WhatsApp': 'Open WhatsApp', 'Con gusto. ¿Qué necesita mover?': 'Happy to help. What do you need to move?', 'Carga especial': 'Special cargo',
    '¿Dónde se recoge la carga?': 'Where should we pick up the load?', '¿Y dónde se entrega?': 'And where does it go?', '¿Para cuándo lo necesita?': 'When do you need it?',
    'Hoy o mañana': 'Today or tomorrow', 'Esta semana': 'This week', 'Más adelante': 'Later on',
    '¿Hace falta montacargas o grúa para cargar o descargar?': 'Do you need a forklift or crane to load or unload?',
    'Montacargas': 'Forklift', 'Grúa': 'Crane', 'No sé, que me asesoren': 'Not sure, please advise me', 'No hace falta': 'Not needed',
    'Resumen de cotización': 'Quote summary', 'Listo': 'Ready', 'Carga': 'Cargo', 'Recoger en': 'Pick up at', 'Entregar en': 'Deliver to', 'Para': 'When',
    'Le paso este resumen a nuestro equipo por WhatsApp para que le coticen.': 'I’ll send this summary to our team on WhatsApp so they can quote it.',
    // Redesign (corporate version)
    'Abrir menú': 'Open menu', 'Menú': 'Menu', 'Cerrar menú': 'Close menu', 'Menú móvil': 'Mobile menu',
    'Transporte de carga especial · Costa Rica': 'Special cargo transport · Costa Rica',
    'Cargamos,': 'We load,', 'transportamos': 'haul', 'y descargamos': 'and unload',
    'Camiones con montacargas o grúa a bordo para mover maquinaria, esculturas, vidrio y mercadería en Santa Ana y toda la Gran Área Metropolitana.': 'Trucks with a forklift or crane on board to move machinery, sculptures, glass and goods in Santa Ana and across the Greater Metropolitan Area.',
    'Solicitar cotización': 'Request a quote',
    'Equipo a bordo': 'On-board equipment', 'Montacargas y grúa articulada': 'Forklift and knuckle-boom crane', 'Cobertura': 'Coverage',
    'Gran Área Metropolitana': 'Greater Metropolitan Area', 'Base': 'Home base', 'Cotizaciones': 'Quotes',
    'La empresa': 'The company',
    'Transportes Pohlond es una empresa costarricense de transporte de carga.': 'Transportes Pohlond is a Costa Rican freight transport company.',
    'Llegamos con el equipo para subir y bajar la carga, así que su traslado no depende de montacargas ni de personal en el sitio.': 'We arrive with the equipment to load and unload, so your move never depends on a forklift or crew at the site.',
    'Ver servicios': 'View services', 'Grúa articulada': 'Knuckle-boom crane', 'Carga pesada': 'Heavy cargo',
    'Del punto de carga al de entrega, con el equipo a bordo.': 'From pickup to drop-off, with the equipment on board.',
    'Plataforma': 'Flatbed', 'Desde maquinaria hasta esculturas.': 'From machinery to sculptures.',
    'Grúa · eslingas': 'Crane · slings', 'Embalaje · amarre': 'Packing · strapping', 'Plataforma · grúa': 'Flatbed · crane',
    'Seguridad en cada movimiento.': 'Safety in every move.', 'Cuéntenos qué necesita mover.': 'Tell us what you need to move.',
    'Se solicitan choferes.': 'We’re hiring drivers.', 'Empleo': 'Careers', 'Síganos': 'Follow us', 'Recursos Humanos': 'Human Resources',
    'Transporte de carga y cargas especiales en la Gran Área Metropolitana de Costa Rica.': 'Freight and special cargo transport in Costa Rica’s Greater Metropolitan Area.',
    'Demo preparado por HacksinCodigos': 'Demo prepared by HacksinCodigos',
    'Transportes Pohlond · Transporte y cargas especiales en todo Costa Rica': 'Transportes Pohlond · Transport and special cargo across Costa Rica',
    'Camiones con montacargas o grúa a bordo para mover maquinaria, esculturas, vidrio y mercadería en todo Costa Rica, de Limón a Guanacaste.': 'Trucks with a forklift or crane on board to move machinery, sculptures, glass and goods all over Costa Rica, from Limón to Guanacaste.',
    'Flota': 'Fleet', 'Más de 80 camiones': '80+ trucks', 'Trayectoria': 'Track record', 'Más de 20 años': '20+ years', 'Todo Costa Rica': 'All of Costa Rica',
    'Transportes Pohlond es una empresa costarricense de transporte de carga, con más de 20 años de trayectoria y más de 80 camiones.': 'Transportes Pohlond is a Costa Rican freight transport company with more than 20 years in business and over 80 trucks.',
    'Desde mercadería y materiales hasta maquinaria y cargas delicadas, con el equipo adecuado para cada traslado, en todo Costa Rica.': 'From goods and materials to machinery and delicate loads, with the right equipment for every move, all over Costa Rica.',
    'De Limón a Guanacaste': 'From Limón to Guanacaste', 'Entregas en todo el país': 'Deliveries nationwide',
    'Entregas en todo Costa Rica, de Limón a Guanacaste, coordinadas con usted de principio a fin.': 'Deliveries all over Costa Rica, from Limón to Guanacaste, coordinated with you from start to finish.',
    'La carga viaja amarrada y protegida, en la plataforma adecuada para su tamaño y peso, a cualquier punto del país.': 'The load travels strapped and protected, on the right flatbed for its size and weight, to any point in the country.',
    'Escríbanos por WhatsApp, por correo o en redes. Atendemos en todo Costa Rica.': 'Reach us on WhatsApp, by email or on social media. We serve all of Costa Rica.',
    'Más de 20 años en transporte de carga y cargas especiales en todo Costa Rica.': '20+ years in freight and special cargo transport across Costa Rica.',
    'Servicio en todo Costa Rica': 'Serving all of Costa Rica', '© 2026 Transportes Pohlond · Costa Rica': '© 2026 Transportes Pohlond · Costa Rica',
    'Instagram de Transportes Pohlond': 'Transportes Pohlond on Instagram',
    'Master Move, división de cargas especializadas de Transportes Pohlond': 'Master Move, the specialized cargo division of Transportes Pohlond',
    'Master Move es nuestra división de cargas especializadas, con el equipo más pesado y fuerte de la flota: maquinaria, estructuras, esculturas y vidrio, movidos con planificación, camión con grúa y maniobras cuidadosas.': 'Master Move is our specialized cargo division, with the heaviest and strongest equipment in the fleet: machinery, structures, sculptures and glass, moved with a plan, a crane truck and careful handling.',
    'y descargamos.': 'and unload.', 'Del punto de carga al de entrega,': 'From pickup to drop-off,', 'con el equipo a bordo.': 'with the equipment on board.',
    'Desde maquinaria': 'From machinery', 'hasta esculturas.': 'to sculptures.', 'cada movimiento.': 'every move.', 'necesita mover.': 'need to move.', 'choferes.': 'drivers.',
    'Así movemos': 'This is how we move', 'su carga.': 'your cargo.', 'Ruta de ejemplo': 'Sample route',
    'Cargando': 'Loading', 'En ruta': 'En route', 'Descargando': 'Unloading', 'Entregado': 'Delivered', '{la}° N · {lo}° O': '{la}° N · {lo}° W',
    'Mapa de la Gran Área Metropolitana con una ruta de ejemplo de Santa Ana a Heredia': 'Map of the Greater Metropolitan Area with a sample route from Santa Ana to Heredia',
    'Master Move': 'Master Move', 'Clientes': 'Customers', 'Necesito mover algo': 'I need to move something', 'Cotice en 3 pasos': 'Get a quote in 3 steps',
    'Choferes': 'Drivers', 'Licencias B1, B2 y B3': 'B1, B2 and B3 licenses', 'Quiero manejar con Pohlond': 'I want to drive for Pohlond', 'Vea si califica en 1 minuto': 'See if you qualify in 1 minute',
    'Más de 80 camiones,': 'Over 80 trucks,', 'el equipo correcto para cada carga.': 'the right equipment for every load.',
    'Cada tipo de camión resuelve un trabajo distinto. Le asignamos el que su carga necesita; las capacidades exactas se las confirmamos al cotizar.': 'Each type of truck does a different job. We assign the one your load needs, and confirm exact capacities when we quote.',
    'Hace': 'Does', 'Ideal para': 'Best for', 'Ventaja': 'Advantage', 'Camión plataforma con montacargas': 'Flatbed truck with forklift',
    'Carga, transporta y descarga': 'Loads, hauls and unloads', 'Tarimas, cajas, equipo y materiales': 'Pallets, crates, equipment and materials', 'No depende de montacargas en el sitio': 'No need for a forklift on site',
    'Camión grúa con brazo articulado': 'Knuckle-boom crane truck', 'Iza y coloca la carga': 'Lifts and places the load', 'Estructuras, contenedores y esculturas': 'Structures, containers and sculptures',
    'Levanta sobre obstáculos y deja la pieza en su lugar': 'Lifts over obstacles and sets the piece in place', 'Cabezal con plataforma para equipo pesado': 'Tractor with heavy-equipment trailer',
    'Traslada maquinaria pesada': 'Hauls heavy machinery', 'Montacargas, cargadores y equipo de obra': 'Forklifts, loaders and construction equipment', 'El equipo más pesado y fuerte de la flota': 'The heaviest, strongest equipment in the fleet',
    'Carga general': 'General cargo', 'Camión plataforma': 'Flatbed truck', 'Fletes de mercadería y materiales': 'Freight for goods and materials', 'Materiales de construcción y mercadería': 'Construction materials and goods',
    'Carga amarrada y protegida en todo el país': 'Strapped, protected loads nationwide', '¿Qué camión necesita?': 'Which truck do you need?',
    '¿Es maquinaria pesada o equipo de obra?': 'Is it heavy machinery or construction equipment?', '¿Hay que levantarla sobre un muro o meterla en un patio?': 'Does it need lifting over a wall or into a yard?',
    '¿Es una pieza delicada, como una escultura o vidrio?': 'Is it a delicate piece, like a sculpture or glass?', '¿Hay montacargas donde se carga y donde se entrega?': 'Is there a forklift at pickup and delivery?',
    'Sí': 'Yes', 'No': 'No', 'Nuestra recomendación': 'Our recommendation', 'Responda las preguntas y le decimos qué camión le sirve.': 'Answer the questions and we’ll tell you which truck fits.',
    'Cotizar por WhatsApp': 'Get a quote on WhatsApp', 'Master Move: cabezal con plataforma para equipo pesado': 'Master Move: tractor with heavy-equipment trailer',
    'Hola, creo que necesito un {v}. ¿Me cotizan?': 'Hi, I think I need a {v}. Can you quote it?',
    'División de cargas especializadas': 'Specialized cargo division', 'Lo más pesado,': 'The heaviest loads,', 'con el equipo más fuerte.': 'with the strongest equipment.',
    'Master Move es la división de Transportes Pohlond para cargas especializadas: maquinaria pesada, estructuras y piezas que requieren grúa, planificación y maniobras cuidadosas.': 'Master Move is the Transportes Pohlond division for specialized cargo: heavy machinery, structures and pieces that call for a crane, planning and careful handling.',
    'Cada maniobra se planifica antes de mover la carga.': 'Every maneuver is planned before the load moves.', 'Camión grúa con brazo articulado y plataformas para equipo pesado.': 'Knuckle-boom crane trucks and heavy-equipment trailers.',
    'Servicio en todo Costa Rica.': 'Service across Costa Rica.', 'Solicite un proyecto': 'Request a project', 'Conocer Master Move': 'Discover Master Move',
    'Ilustración de un camión grúa con brazo articulado levantando una caja': 'Illustration of a knuckle-boom crane truck lifting a crate',
    'Todo Costa Rica,': 'All of Costa Rica,', 'de Limón a Guanacaste.': 'from Limón to Guanacaste.',
    'Nuestros camiones recorren las siete provincias. Usted nos dice dónde se recoge y dónde se entrega; nosotros llegamos.': 'Our trucks run through all seven provinces. You tell us where to pick up and where to deliver; we get there.',
    'Cotizar un traslado': 'Quote a move', 'Mapa de Costa Rica con las siete provincias': 'Map of Costa Rica with its seven provinces',
    'Tres pasos y se abre WhatsApp con el mensaje listo y ordenado. Le respondemos con la cotización.': 'Three steps and WhatsApp opens with a ready, organized message. We’ll reply with your quote.',
    'Paso 1 de 3': 'Step 1 of 3', 'Paso {n} de 3': 'Step {n} of 3', '¿Qué necesita mover?': 'What do you need to move?',
    'Mercadería o materiales': 'Goods or materials', 'Contenedor o estructura': 'Container or structure', 'Escultura u obra de arte': 'Sculpture or artwork', 'Vidrio o carga frágil': 'Glass or fragile cargo',
    '¿Cómo es la carga?': 'What is the load like?', 'Peso aproximado': 'Approximate weight', 'No estoy seguro': 'Not sure', 'Menos de 1 tonelada': 'Under 1 ton',
    'De 1 a 5 toneladas': '1 to 5 tons', 'De 5 a 15 toneladas': '5 to 15 tons', 'Más de 15 toneladas': 'Over 15 tons', 'Medidas aproximadas': 'Approximate size',
    'Ej.: 3 × 2 × 2 metros': 'E.g.: 3 × 2 × 2 meters', '¿Hace falta montacargas o grúa?': 'Do you need a forklift or crane?', '¿De dónde a dónde, y cuándo?': 'From where to where, and when?',
    'Acceso, horario, etc.': 'Access, schedule, etc.', 'Atrás': 'Back', 'Siguiente': 'Next',
    'Sus datos no se guardan en esta página; solo se pasan al mensaje de WhatsApp. Ahí mismo puede adjuntar fotos de la carga.': 'Your details aren’t stored on this page; they only go into the WhatsApp message, where you can also attach photos of the load.',
    'Peso aproximado: {v}': 'Approximate weight: {v}', 'Medidas: {v}': 'Size: {v}', 'Les adjunto fotos de la carga.': 'I’m attaching photos of the load.',
    'Marque lo que ya tiene:': 'Tick what you already have:', '{n} de {t}': '{n} of {t}', '¡Cumple todo! Suba su currículum y aplique.': 'You meet everything! Upload your résumé and apply.',
    'Tiene {n} de {t}. Puede aplicar igual y completar lo que falte.': 'You have {n} of {t}. You can still apply and complete the rest.',
    'Sitio desarrollado por': 'Website by', 'Listo': 'Done', 'Soy empleado de Pohlond': 'I work at Pohlond', 'Con gusto. Para proteger sus datos, primero confirmo que es usted.': 'Sure. To protect your information, I’ll first confirm it’s you.', 'Su número de cédula': 'Your ID number (cédula)', 'Soy empleado de Pohlond. Mi cédula es {c}.': 'I work at Pohlond. My ID number is {c}.', 'Continuar': 'Continue', 'Escriba su PIN de 4 números': 'Enter your 4-digit PIN', 'Olvidé mi PIN': 'I forgot my PIN', 'Código de activación (6 números)': 'Activation code (6 digits)', 'Se lo da Recursos Humanos en persona o por llamada.': 'HR gives it to you in person or by phone.', 'Todavía no lo tengo': 'I don’t have it yet', 'Todavía no tengo el código de activación.': 'I don’t have the activation code yet.', 'Cree su PIN de 4 números': 'Create your 4-digit PIN', 'Solo usted lo sabe. No use 1234 ni números repetidos.': 'Only you know it. Don’t use 1234 or repeated digits.', 'Repita su PIN': 'Repeat your PIN', 'Constancia salarial': 'Salary certificate', 'Constancia de trabajo': 'Employment certificate', 'Carta del FCL': 'FCL letter', 'Mi último pago': 'My last pay', 'Mis préstamos': 'My loans', 'Mis vacaciones': 'My vacation days', 'Pedir vacaciones': 'Request vacation', 'Reportar incapacidad': 'Report sick leave', 'Reportar un accidente': 'Report an accident', 'Otra consulta': 'Something else', 'Tengo otra consulta.': 'I have another question.', 'Ver opciones': 'See options', '¿A cuál puesto quiere aplicar?': 'Which job would you like to apply for?', 'Quiero aplicar al puesto: {p}': 'I want to apply for: {p}', 'Tengo: ': 'I have: ', 'Me falta: ': 'Still missing: ', 'Todavía no tengo ninguno.': 'I don’t have any yet.', 'Subir {q}': 'Upload {q}', 'Estamos <em>contratando.</em>': 'We are <em>hiring.</em>', 'Aplique aquí mismo en el chat: el asistente le dice los requisitos de cada puesto, usted marca lo que tiene y le sube sus documentos.': 'Apply right here in the chat: the assistant tells you each job’s requirements, you check what you have and upload your documents.', 'Ayudante de camión': 'Truck helper', 'Currículum, hoja de delincuencia y cartas de recomendación. Con licencia B1, mejor.': 'Résumé, criminal record certificate and recommendation letters. A B1 license is a plus.', 'Chofer B2': 'B2 driver', 'Licencia B2 al día y 4 años de experiencia.': 'Valid B2 license and 4 years of experience.', 'Chofer B4 y D3': 'B4 and D3 driver', 'Operador de grúa de brazo articulado y cabezal, con 3 años de experiencia.': 'Knuckle-boom crane and tractor operator, with 3 years of experience.', 'Antes de seguir, confirme que es una persona:': 'Before we continue, please confirm you are human:', 'No se pudo confirmar. Recargue la página o escríbanos al WhatsApp 8983 8585.': 'We couldn’t confirm it. Reload the page or message us on WhatsApp at 8983 8585.', 'Grabar nota de voz': 'Record a voice note', 'Detener y enviar': 'Stop and send', 'Grabando…': 'Recording…', 'Nota de voz': 'Voice note', 'El navegador no dejó usar el micrófono. Puede escribirme.': 'The browser blocked the microphone. You can type instead.', 'No pude procesar el audio. Intente de nuevo o escríbame.': 'I couldn’t process the audio. Try again or type your message.', 'Asistente con IA. Sus datos se usan solo para el proceso de selección (Ley 8968).': 'AI assistant. Your details are used only for the hiring process (Costa Rica Law 8968).', 'Asistente con IA. Para hablar con una persona: WhatsApp 8983 8585.': 'AI assistant. To talk to a person: WhatsApp 8983 8585.', 'Cuénteme un poco de usted o adjunte su currículum con el clip. Le hago unas preguntas y le dejo su ficha a Recursos Humanos.': 'Tell me a bit about yourself or attach your résumé with the clip. I’ll ask a few questions and pass your profile to HR.', 'Quiero cotizar un transporte.': 'I want a quote for a transport job.', 'No hubo conexión. Intente de nuevo o escríbanos al WhatsApp 8983 8585.': 'No connection. Please try again or message us on WhatsApp at 8983 8585.', 'Asistente virtual': 'Virtual assistant', 'Esta página no guarda sus datos; usted los envía por WhatsApp.': 'This page doesn’t store your details; you send them via WhatsApp.',
    'Preparando su ficha…': 'Preparing your profile…', '¡Listo, {n}! Toque el botón para enviar su ficha a Recursos Humanos por WhatsApp y adjunte ahí su currículum.': 'All set, {n}! Tap the button to send your profile to Human Resources on WhatsApp and attach your résumé there.',
    'Hola, quiero aplicar como chofer.': 'Hi, I’d like to apply as a driver.', 'Nombre: {v}': 'Name: {v}', 'Licencia: {v}': 'License: {v}', 'Experiencia: {v}': 'Experience: {v}', 'Zona: {v}': 'Area: {v}',
    'Horario: {v}': 'Shift: {v}', 'Aspiración salarial: {v}': 'Expected salary: {v}', 'Documentos: {v}': 'Documents: {v}', 'Les adjunto mi currículum.': 'I’m attaching my résumé.', 'Enviar mi ficha por WhatsApp': 'Send my profile on WhatsApp',
    '{s} · Adjúntelo también en WhatsApp al enviar su ficha.': '{s} · Attach it in WhatsApp too when you send your profile.',
    "¿Trabajan en todo Costa Rica?": "Do you work all over Costa Rica?", "Sí. Trabajamos en todo el país, de Limón a Guanacaste, incluida toda la Gran Área Metropolitana.": "Yes. We work nationwide, from Limón to Guanacaste, including the whole Greater Metropolitan Area.",
    "¿Qué es un camión con montacargas a bordo?": "What is a truck with a forklift on board?", "Es un camión que lleva su propio montacargas: cargamos, transportamos y descargamos sin depender de montacargas ni de personal en el sitio.": "It’s a truck that carries its own forklift: we load, haul and unload without relying on a forklift or crew at the site.",
    "¿Tienen camión grúa con brazo articulado?": "Do you have a knuckle-boom crane truck?", "Sí. Lo usamos para izar y colocar estructuras, contenedores, esculturas y maquinaria donde no entra un montacargas.": "Yes. We use it to lift and place structures, containers, sculptures and machinery where a forklift can’t reach.",
    "¿Transportan esculturas, obras de arte y vidrio?": "Do you move sculptures, artwork and glass?", "Sí, con embalaje, amarre, izaje con eslingas y maniobras planificadas para que cada pieza llegue como salió.": "Yes, with packing, strapping, sling lifting and planned maneuvers so every piece arrives the way it left.",
    "¿Qué es Master Move?": "What is Master Move?", "Es la división de cargas especializadas de Transportes Pohlond, con el equipo más pesado y fuerte de la flota.": "It’s the specialized cargo division of Transportes Pohlond, with the heaviest, strongest equipment in the fleet.",
    "¿Cómo pido una cotización?": "How do I get a quote?", "Con el cotizador de esta página o por WhatsApp al 8983 8585. Díganos qué es la carga, el peso o las medidas, dónde se recoge, dónde se entrega y la fecha; si puede, mande fotos.": "Use the quote tool on this page or message us on WhatsApp at 8983 8585. Tell us the cargo, its weight or size, pickup, delivery and date; photos help.",
    "¿Cuál es el horario de atención?": "What are your business hours?", "Todos los días, de 7:00 a. m. a 8:00 p. m.": "Every day, 7:00 a.m. to 8:00 p.m.",
    "¿Están contratando choferes?": "Are you hiring drivers?", "Sí. Buscamos choferes con licencia B1, B2 o B3 y de 2 a 4 años de experiencia según el puesto. Puede aplicar por WhatsApp o en la sección de empleo.": "Yes. We’re looking for drivers with a B1, B2 or B3 license and 2 to 4 years of experience depending on the position. Apply on WhatsApp or in the jobs section.",
    'Transportes Pohlond · Transporte de carga y cargas especiales': 'Transportes Pohlond · Freight and special cargo transport',
    'Transporte de carga y cargas especiales en Costa Rica': 'Freight and special cargo transport in Costa Rica',
    'Ver servicio': 'View service', 'Ver zonas de cobertura': 'See coverage areas', 'Requisitos y cómo aplicar': 'Requirements and how to apply', '· También puede enviarlo a': '· You can also send it to',
    'Preguntas frecuentes': 'FAQ', 'Lo que más': 'What people', 'nos preguntan.': 'ask us most.', 'Transporte de maquinaria': 'Machinery transport', 'Contenedores y estructuras': 'Containers and structures',
    'Carga: {v}': 'Cargo: {v}', 'Recoger en: {v}': 'Pick up at: {v}', 'Entregar en: {v}': 'Deliver to: {v}', 'Para: {v}': 'When: {v}', 'Equipo: {v}': 'Equipment: {v}'
  };
  var TITLE_ES = document.title, DESC_ES = document.querySelector('meta[name=description]').content;
  var DESC_EN = '20+ years in freight and special cargo transport across Costa Rica. 80+ trucks with a forklift or crane on board to load, haul and unload. Get a quote on WhatsApp at 8983 8585.';
  var lang = 'es';
  try { lang = localStorage.getItem('pohlond-lang') || 'es'; } catch (e) {}
  var q = /[?&]lang=(es|en)\b/.exec(location.search); if (q) lang = q[1];
  if (lang !== 'en') lang = 'es';

  // T('texto {n}', {n: 'Ana'}) → translated (when English) with placeholders filled in.
  window.T = function (s, vars) {
    var out = (lang === 'en' && EN[s]) || s;
    if (vars) for (var k in vars) out = out.split('{' + k + '}').join(vars[k]);
    return out;
  };
  window.getLang = function () { return lang; };
  var hooks = [];
  window.onLang = function (fn) { hooks.push(fn); };

  var ATTRS = ['alt', 'aria-label', 'placeholder', 'title'];
  var SKIP = 'script,style,svg,.chat-b,.st,#dropT,#dropS,.hud-s,.hud-c,#pickT,#reqMsg,#wizN';
  function apply() {
    var en = lang === 'en';
    document.documentElement.lang = lang;
    document.title = en ? (EN[TITLE_ES] || TITLE_ES) : TITLE_ES;
    document.querySelector('meta[name=description]').content = en ? DESC_EN : DESC_ES;
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) { return n.parentElement && !n.parentElement.closest(SKIP) && n.nodeValue.trim() ? 1 : 2; }
    });
    for (var n; (n = w.nextNode());) {
      if (n.__es === undefined) n.__es = n.nodeValue;
      var key = n.__es.trim(), tr = EN[key];
      n.nodeValue = en && tr !== undefined ? n.__es.replace(key, tr) : n.__es;
    }
    document.querySelectorAll('[alt],[aria-label],[placeholder],[title]').forEach(function (el) {
      if (el.closest('.chat-b')) return;
      el.__esA = el.__esA || {};
      ATTRS.forEach(function (a) {
        if (!el.hasAttribute(a)) return;
        if (el.__esA[a] === undefined) el.__esA[a] = el.getAttribute(a);
        var v = el.__esA[a];
        el.setAttribute(a, en && EN[v] !== undefined ? EN[v] : v);
      });
    });
    document.querySelectorAll('a[href^="https://wa.me/"]').forEach(function (a) {
      if (a.__esH === undefined) a.__esH = a.getAttribute('href');
      var m = /text=([^&]*)/.exec(a.__esH), txt = m && decodeURIComponent(m[1]);
      a.setAttribute('href', en && txt && EN[txt] ? a.__esH.replace(m[1], encodeURIComponent(EN[txt])) : a.__esH);
    });
    document.querySelectorAll('.lang button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === lang)); });
  }
  window.setLang = function (l) {
    if (l === lang) return;
    lang = l;
    try { localStorage.setItem('pohlond-lang', l); } catch (e) {}
    apply();
    hooks.forEach(function (fn) { fn(l); });
  };
  document.querySelectorAll('.lang button').forEach(function (b) { b.addEventListener('click', function () { setLang(b.dataset.lang); }); });
  apply();
})();

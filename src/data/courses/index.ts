import type { Course } from '../../types';

export const courses: Record<string, Course> = {
  'aws-ccp': {
    id: 'aws-ccp',
    title: 'Cloud Practitioner',
    description: 'Foundation-level cloud certification',
    icon: '☁️',
    color: '#f97316',
    units: [
      {
        title: 'Cloud Concepts',
        lessons: [
          {
            title: 'What is Cloud Computing?',
            intro: {
              title: 'What is Cloud Computing?',
              content: [
                'Cloud computing is the on-demand delivery of IT resources over the internet with pay-as-you-go pricing. Instead of buying, owning, and maintaining physical data centers and servers, you can access technology services—such as computing power, storage, and databases—on an as-needed basis from a cloud provider.',
                'Think of it like electricity: you don\'t own a power plant, you just plug in and pay for what you use. Cloud computing works the same way for IT resources.',
                'Key benefits include: trading capital expense (buying servers) for variable expense (paying for what you use), benefiting from massive economies of scale, stopping guessing about capacity, increasing speed and agility, and going global in minutes.',
                'However, no cloud provider guarantees 100% uptime. Even the best services target 99.99% availability, which still means potential minutes of downtime per year.'
              ]
            },
            exercises: [
              {
                type: 'multiple',
                question: 'What is cloud computing?',
                options: [
                  'Storing files on your local hard drive',
                  'On-demand delivery of IT resources over the internet',
                  'Using a private server in your office',
                  'Sending emails through a mail server'
                ],
                correct: 1,
                explanation: 'Cloud computing is the on-demand delivery of compute, storage, and other IT resources via the internet with pay-as-you-go pricing.'
              },
              {
                type: 'multiple',
                question: 'Which is NOT a benefit of cloud computing?',
                options: [
                  'Trade capital expense for variable expense',
                  'Benefit from massive economies of scale',
                  'Guaranteed 100% uptime',
                  'Increase speed and agility'
                ],
                correct: 2,
                explanation: 'No cloud provider guarantees 100% uptime. Even the best offer 99.99% SLAs.'
              },
              {
                type: 'matching',
                question: 'Match the cloud benefit to its description:',
                pairs: [
                  ['Elasticity', 'Scale resources up or down as needed'],
                  ['Agility', 'Deploy new resources in minutes'],
                  ['Economies of scale', 'Lower costs due to aggregate usage'],
                  ['Global reach', 'Deploy worldwide in minutes']
                ]
              }
            ]
          },
          {
            title: 'Cloud Deployment Models',
            intro: {
              title: 'Cloud Deployment Models',
              content: [
                'There are several ways to deploy cloud resources, each suited to different needs and constraints.',
                'Public cloud means your applications run entirely on a cloud provider\'s infrastructure (like AWS, Azure, or GCP). You share the underlying hardware with other customers, but your data and applications are isolated. This is ideal for startups and companies without existing data centers.',
                'Private cloud is cloud infrastructure dedicated to a single organization. It can be on-premises or hosted by a third party. Government agencies and highly regulated industries often use private clouds.',
                'Hybrid cloud connects your on-premises infrastructure (or private cloud) with public cloud services. This is common for enterprises with legacy systems that can\'t easily move to the cloud, but want to use cloud services for new applications.',
                'Multi-cloud means using services from multiple cloud providers to avoid vendor lock-in or to use best-of-breed services from each provider.'
              ]
            },
            exercises: [
              {
                type: 'multiple',
                question: 'A company runs all workloads in a cloud provider\'s data centers. What deployment model is this?',
                options: ['On-premises', 'Hybrid', 'Public cloud', 'Private cloud'],
                correct: 2,
                explanation: 'Public cloud means running workloads entirely in a cloud provider\'s infrastructure.'
              },
              {
                type: 'fillblank',
                question: 'A ___ cloud deployment connects on-premises infrastructure with cloud resources.',
                answers: ['hybrid', 'Hybrid'],
                explanation: 'Hybrid cloud combines on-premises (or private cloud) with public cloud services.'
              },
              {
                type: 'matching',
                question: 'Match deployment model to use case:',
                pairs: [
                  ['Public cloud', 'Startup with no data center'],
                  ['Hybrid cloud', 'Bank with legacy systems + new apps'],
                  ['On-premises', 'Classified government workloads'],
                  ['Multi-cloud', 'Avoiding vendor lock-in']
                ]
              }
            ]
          }
        ]
      },
      {
        title: 'Core Services',
        lessons: [
          {
            title: 'Compute Services',
            intro: {
              title: 'Compute Services',
              content: [
                'Compute services provide the processing power to run your applications. There are several models to choose from.',
                'Virtual machines (or instances) are the most flexible option. You get a virtualized server where you control the operating system, installed software, and configuration. You can resize them as needed—this is "resizable compute capacity in the cloud."',
                'Containers package your application code with its dependencies into a standardized unit. Services like container orchestration platforms help you run and manage containers at scale.',
                'Serverless computing (or function-as-a-service) lets you run code without provisioning or managing servers. You upload your code, and it runs in response to events like HTTP requests, file uploads, or scheduled times. You only pay for the compute time you consume—there\'s no charge when your code isn\'t running.',
                'The key difference: with VMs you manage the server, with serverless the cloud provider handles everything and you just provide code.'
              ]
            },
            exercises: [
              {
                type: 'multiple',
                question: 'Which service provides resizable virtual servers?',
                options: [
                  'Object storage',
                  'Virtual machines / instances',
                  'Content delivery network',
                  'Managed databases'
                ],
                correct: 1,
                explanation: 'Virtual machines (instances) are resizable compute capacity in the cloud.'
              },
              {
                type: 'multiple',
                question: 'What is "serverless" computing?',
                options: [
                  'Computing without any servers involved',
                  'Running code without managing servers',
                  'Using only physical servers',
                  'A server that runs 24/7'
                ],
                correct: 1,
                explanation: 'Serverless means you run code without provisioning or managing servers. The cloud provider handles infrastructure.'
              },
              {
                type: 'fillblank',
                question: '___ computing lets you run code in response to events without managing servers.',
                answers: ['Serverless', 'serverless', 'Function', 'function'],
                explanation: 'Serverless/Function computing abstracts server management away from developers.'
              }
            ]
          },
          {
            title: 'Storage Services',
            intro: {
              title: 'Storage Services',
              content: [
                'Cloud storage comes in several types, each optimized for different use cases.',
                'Object storage is ideal for unstructured data like images, videos, backups, and static website files. Data is stored as objects with metadata and a unique identifier. It\'s highly scalable and durable—typically designed for 99.999999999% (11 nines) durability.',
                'Block storage provides raw storage volumes that attach to virtual machines, like a virtual hard drive. It\'s ideal for databases and applications that need low-latency access to data. You can take snapshots for backups.',
                'File storage provides a shared file system that multiple servers can access simultaneously, like a network drive. It\'s useful for shared application data, home directories, and content management systems.',
                'Archive/Cold storage is the cheapest option for data you rarely access—like compliance records you must keep for 7 years. The tradeoff is retrieval time: getting your data back can take minutes to hours, and there are retrieval fees.'
              ]
            },
            exercises: [
              {
                type: 'multiple',
                question: 'What type of storage is best for storing images, videos, and backups?',
                options: ['Block storage', 'Object storage', 'File storage', 'Cache storage'],
                correct: 1,
                explanation: 'Object storage is ideal for unstructured data like media files and backups due to its scalability and durability.'
              },
              {
                type: 'matching',
                question: 'Match storage type to use case:',
                pairs: [
                  ['Object storage', 'Storing website images'],
                  ['Block storage', 'Database volumes'],
                  ['File storage', 'Shared file systems'],
                  ['Archive storage', 'Compliance data kept 7 years']
                ]
              },
              {
                type: 'multiple',
                question: 'Which storage class offers the lowest cost for rarely accessed data?',
                options: [
                  'Standard/Hot storage',
                  'Infrequent access',
                  'Archive/Cold storage',
                  'Provisioned IOPS'
                ],
                correct: 2,
                explanation: 'Archive/Cold storage tiers offer the lowest cost but have retrieval delays and fees.'
              }
            ]
          }
        ]
      },
      {
        title: 'Security & Pricing',
        lessons: [
          {
            title: 'Shared Responsibility Model',
            intro: {
              title: 'The Shared Responsibility Model',
              content: [
                'Security in the cloud is a shared responsibility between you (the customer) and the cloud provider. Understanding who is responsible for what is critical for passing your certification exam—and for keeping your workloads secure.',
                'The cloud provider is responsible for security OF the cloud: the physical infrastructure, hardware, networking, and the virtualization layer. They secure the data centers, manage the host operating systems, and ensure the underlying platform is protected.',
                'You (the customer) are responsible for security IN the cloud: your data, your applications, identity and access management, operating system patches on your VMs, network configuration, and encryption settings.',
                'A simple way to remember: if you can configure it or touch it in the console, you\'re probably responsible for securing it. The provider handles everything underneath that you can\'t see or access.',
                'For example: AWS secures the physical servers, but you\'re responsible for setting strong IAM passwords, patching your EC2 instances, and encrypting sensitive data.'
              ]
            },
            exercises: [
              {
                type: 'multiple',
                question: 'In the shared responsibility model, who is responsible for patching the guest operating system?',
                options: [
                  'Cloud provider only',
                  'Customer only',
                  'Both equally',
                  'Neither - it\'s automatic'
                ],
                correct: 1,
                explanation: 'Customers are responsible for patching and securing their guest OS, applications, and data.'
              },
              {
                type: 'matching',
                question: 'Who is responsible for each item?',
                pairs: [
                  ['Physical security', 'Cloud provider'],
                  ['Customer data encryption', 'Customer'],
                  ['Network infrastructure', 'Cloud provider'],
                  ['IAM user permissions', 'Customer']
                ]
              },
              {
                type: 'fillblank',
                question: 'The cloud provider is responsible for security ___ the cloud, while customers secure their workloads ___ the cloud.',
                answers: ['of, in', 'OF, IN'],
                explanation: 'Provider secures the infrastructure (of), customer secures what they put in it (in).'
              }
            ]
          },
          {
            title: 'Cloud Pricing Models',
            intro: {
              title: 'Cloud Pricing Models',
              content: [
                'Understanding pricing models helps you optimize costs—a key topic on certification exams and in real-world cloud architecture.',
                'On-demand pricing means you pay for compute capacity by the hour or second with no long-term commitments. It\'s the most flexible but most expensive option. Use it for unpredictable workloads, short-term projects, or when you\'re testing.',
                'Reserved instances (or committed use discounts) offer significant savings—up to 72% off on-demand prices—in exchange for committing to 1 or 3 years of usage. Best for steady-state, predictable workloads like production databases.',
                'Spot instances (or preemptible VMs) let you bid on unused cloud capacity at steep discounts—up to 90% off. The catch: the provider can reclaim these instances with little notice. Only use them for fault-tolerant workloads like batch processing, video encoding, or stateless web servers behind a load balancer.',
                'Most providers also offer a free tier for new accounts—limited resources to learn and experiment without cost.'
              ]
            },
            exercises: [
              {
                type: 'multiple',
                question: 'Which pricing model offers the biggest discount for predictable workloads?',
                options: [
                  'On-demand',
                  'Reserved/Committed use',
                  'Spot/Preemptible',
                  'Free tier'
                ],
                correct: 1,
                explanation: 'Reserved or committed use pricing offers significant discounts (up to 72%) for 1-3 year commitments.'
              },
              {
                type: 'multiple',
                question: 'Spot/preemptible instances are best for:',
                options: [
                  'Production databases',
                  'Batch processing that can handle interruptions',
                  'Customer-facing web servers',
                  'Domain controllers'
                ],
                correct: 1,
                explanation: 'Spot instances can be interrupted, so they suit fault-tolerant batch jobs, not critical workloads.'
              },
              {
                type: 'matching',
                question: 'Match pricing to workload:',
                pairs: [
                  ['On-demand', 'Unpredictable traffic spikes'],
                  ['Reserved', 'Steady-state production server'],
                  ['Spot', 'Video encoding batch job'],
                  ['Free tier', 'Learning and experimentation']
                ]
              }
            ]
          }
        ]
      }
    ]
  }
};